//
//  FoodOracleUITests.m
//  FoodOracleUITests
//
//  Created by Randy Hsu on 2015-11-23.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface FoodOracleUITests : XCTestCase

@end

@implementation FoodOracleUITests

- (void)setUp {
    [super setUp];
    
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
    // In UI tests it is usually best to stop immediately when a failure occurs.
    self.continueAfterFailure = NO;
    // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
    [[[XCUIApplication alloc] init] launch];
    
    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testTabBar {
    // Use recording to get started writing UI tests.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  XCUIElementQuery *query =  app.tabBars.buttons;
  
  [query[@"Favourite"] tap];
  [query[@"Preference"] tap];
  [query[@"Home"] tap];
  
  XCTAssertTrue([query[@"Favourite"] exists]);
  XCTAssertTrue([query[@"Home"] exists]);
  XCTAssertTrue([query[@"Preference"] exists]);
  XCTAssertFalse([query[@"Not Button"] exists]);
  
}

- (void)testSearchBar {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  XCUIElement *quickFoodSearchTextField = app.textFields[@"Quick food search"];
  [quickFoodSearchTextField tap];

  [quickFoodSearchTextField typeText:@"Chicken"];
  [app.otherElements[@" Search"] tap];
  
  XCUIElementQuery *scrollView = [app scrollViews];

  [scrollView.otherElements[@"    Grilled Balsamic Glazed Chicken Rating: 4/5 Time: 25 Minutes "] tap];
  
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [scrollView.otherElements[@"    Garlic Chicken Rating: 4/5 Time: 35 Minutes "] tap];
  
  
}

- (void)testPreference {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.tabBars.buttons[@"Preference"] tap];
  [app.staticTexts[@"Click here to change choice"] tap];
  [[app.pickerWheels element] adjustToPickerWheelValue:@"american"];
  [app.otherElements[@" Confirm"] tap];
  
  //terminate app and start to check if perference is stored
  [app terminate];
  [app launch];
  [app.tabBars.buttons[@"Preference"] tap];
  
  XCUIElement *americanStaticText = app.staticTexts[@" american "];
  XCTAssert([americanStaticText exists]);
  
  //reset to none
  [app.staticTexts[@"Click here to change choice"] tap];
  [[app.pickerWheels element] adjustToPickerWheelValue:@"none"];
  [app.otherElements[@" Confirm"] tap];
  
  XCUIElement *noneStaticText = app.staticTexts[@" none "];
  XCTAssert([noneStaticText exists]);
}

- (void)testBreakfastLunchDinner {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.otherElements[@"  Breakfast   \uf3d3"] tap];
  XCUIElementQuery *scrollView = [app scrollViews];
  
  
  [scrollView.otherElements[@"    Breakfast Frittata Rating: 4/5 Time: 5 Minutes "] tap];
  
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  [app.otherElements[@"  Lunch  \uf3d3"] tap];
  
  [scrollView.otherElements[@"    5 Minute No Cook Lunch Salad Rating: 3/5 Time: 15 Minutes "] tap];


  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  [app.otherElements[@"  Dinner  \uf3d3"] tap];
  
  [scrollView.otherElements[@"    Quick Granny's Dinner Rating: 4/5 Time: 40 Minutes "] tap];
  
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  
  
}

- (void)testRecipeDetail {
  
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.otherElements[@"  Breakfast   \uf3d3"] tap];
  XCUIElementQuery *scrollView = [app scrollViews];
  [scrollView.otherElements[@"    The Ultimate Breakfast Sandwich Rating: 3/5 Time: 20 Minutes "] tap];
  [app.otherElements[@" Cook"] tap];
  [app.navigationBars[@"Recipe: The Ultimate Breakfast Sandwich"].buttons[@"Done"] tap];
  
  //Check ingreidents are populated
  scrollView = [app scrollViews];
  XCTAssertGreaterThan([[scrollView otherElements] count], 0);
  
  XCTAssert(app.otherElements[@"    The Ultimate Breakfast Sandwich "].exists);
  
}

- (void)testSaveToFavourite {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.otherElements[@"  Breakfast   \uf3d3"] tap];
  XCUIElementQuery *scrollView = [app scrollViews];
  [scrollView.otherElements[@"    The Ultimate Breakfast Sandwich Rating: 3/5 Time: 20 Minutes "] tap];
  [app.otherElements[@" Save"] tap];
  
  
  [app.tabBars.buttons[@"Favourite"] tap];
  
  XCUIElement *i = [[[[app scrollViews] elementBoundByIndex:1] otherElements]  elementBoundByIndex:0];
  XCTAssert(i.exists);
  
  XCUICoordinate *co = [i coordinateWithNormalizedOffset:CGVectorMake(0.80, 0.40)];
  [co tap];
  
  [app.tabBars.buttons[@"Preference"] tap];
  [app.tabBars.buttons[@"Favourite"] tap];
  
  i = [app scrollViews].otherElements[@"    The Ultimate Breakfast Sandwich 20 Minutes  Delete "];
  XCTAssert(!i.exists);
 
  
}

- (void)testFridge {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  
  XCUIElement *dragElement = app.textFields[@"Enter ingredient"];
  XCUICoordinate *s = [dragElement coordinateWithNormalizedOffset:CGVectorMake(0, 0)];
  XCUICoordinate *f = [dragElement coordinateWithNormalizedOffset:CGVectorMake(6, 0)];
  [s pressForDuration:0 thenDragToCoordinate:f];
  
  
  

  
}

@end
