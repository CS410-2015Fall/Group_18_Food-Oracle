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
  
  [query[@"CookBook"] tap];
  [query[@"Preference"] tap];
  [query[@"Home"] tap];
  
  XCTAssertTrue([query[@"CookBook"] exists]);
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

  [scrollView.otherElements[@"    Slow Cooker Honey-Soy Chicken  Time: 10 Minutes Rating: 4/5 "] tap];
  
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [scrollView.otherElements[@"    Garlic Chicken  Time: 35 Minutes Rating: 4/5 "] tap];
  
  
}

- (void)testBreakfastLunchDinner {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.otherElements[@"  Breakfast   \uf3d3"] tap];
  XCUIElementQuery *scrollView = [app scrollViews];
  
  
  [scrollView.otherElements[@"    Breakfast Frittata  Time: 5 Minutes Rating: 4/5 "] tap];
  
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  [app.otherElements[@"  Lunch  \uf3d3"] tap];
  
  [scrollView.otherElements[@"    5 Minute No Cook Lunch Salad  Time: 15 Minutes Rating: 3/5 "] tap];


  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  [app.otherElements[@"  Dinner  \uf3d3"] tap];
  
  [scrollView.otherElements[@"    Quick Granny's Dinner  Time: 40 Minutes Rating: 4/5 "] tap];
  
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  
  
}

- (void)testRecipeDetail {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.otherElements[@"  Breakfast   \uf3d3"] tap];
  XCUIElementQuery *scrollView = [app scrollViews];
  [scrollView.otherElements[@"    The Ultimate Breakfast Sandwich  Time: 20 Minutes Rating: 3/5 "] tap];
  [app.otherElements[@"  Cook   \uf27a  \uf297  \uf2b4"] tap];
  [app.navigationBars[@"Recipe: The Ultimate Breakfast Sandwich"].buttons[@"Done"] tap];
  
  //Check ingreidents are populated
  scrollView = [app scrollViews];
  XCTAssertGreaterThan([[scrollView otherElements] count], 0);
  
  XCTAssert(app.otherElements[@"    The Ultimate Breakfast Sandwich "].exists);
  
}

- (void)testSaveToFavouriteStory {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.otherElements[@"  Breakfast   \uf3d3"] tap];
  XCUIElementQuery *scrollView = [app scrollViews];
  [scrollView.otherElements[@"    The Ultimate Breakfast Sandwich  Time: 20 Minutes Rating: 3/5 "] tap];
  [app.otherElements[@"  Save   \uf26b"] tap];
  [app.alerts[@"Recipe Saved"].collectionViews.buttons[@"OK"] tap];
  
  
  [app.tabBars.buttons[@"CookBook"] tap];
  
  XCUIElement *i = [[[[app scrollViews] elementBoundByIndex:1] otherElements]  elementBoundByIndex:0];
  XCTAssert(i.exists);
  
  XCUICoordinate *co = [i coordinateWithNormalizedOffset:CGVectorMake(0.90, 0.50)];
  [co tap];
  
  [app.tabBars.buttons[@"Preference"] tap];
  [app.tabBars.buttons[@"CookBook"] tap];
  
  i = [app scrollViews].otherElements[@"    The Ultimate Breakfast Sandwich  Time: 20 Minutes    \uf252 "];
  XCTAssert(!i.exists);
 
  
}

- (void)testPreferenceStory {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app.tabBars.buttons[@"Preference"] tap];
  [app.staticTexts[@"Tap here to change choice"] tap];
  [[app.pickerWheels element] adjustToPickerWheelValue:@"american"];
  [app.otherElements[@" Confirm"] tap];
  
  //terminate app and start to check if perference is stored
  [app terminate];
  [app launch];
  [app.tabBars.buttons[@"Preference"] tap];
  
  XCUIElement *americanStaticText = app.staticTexts[@" american "];
  XCTAssert([americanStaticText exists]);
  
  //reset to none
  [app.staticTexts[@"Tap here to change choice"] tap];
  [[app.pickerWheels element] adjustToPickerWheelValue:@"none"];
  [app.otherElements[@" Confirm"] tap];
  
  XCUIElement *noneStaticText = app.staticTexts[@" none "];
  XCTAssert([noneStaticText exists]);
}


- (void)testFridgeSearchStory {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  
  XCUIElement *dragElement = app.textFields[@"Enter ingredient"];
  XCUICoordinate *s = [dragElement coordinateWithNormalizedOffset:CGVectorMake(0, 0)];
  XCUICoordinate *f = [dragElement coordinateWithNormalizedOffset:CGVectorMake(6, 0)];
  [s pressForDuration:0 thenDragToCoordinate:f];
  
  [app.otherElements[@" Search Selected"] tap];
  XCTAssert([[[app scrollViews] elementBoundByIndex:0] exists] );
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Fridge"] tap];
  
  XCUIElement *enterIngredientTextField = app.textFields[@"Enter ingredient"];
  [enterIngredientTextField tap];
  [app.textFields[@"Enter ingredient"] typeText:@"Apple, Cookie"];
  
  [app typeText:@"\n"];
  
  [app.otherElements[@" \uff0b"] tap];
  
  sleep(2);
  
  XCUIElement *appleElement =[app scrollViews].otherElements[@"    Apple   quantity: high   "];
  XCTAssert(appleElement.exists);
  XCUICoordinate *co = [appleElement coordinateWithNormalizedOffset:CGVectorMake(0.87, 0.5)];
  [co tap];
  
  XCUIElement *cookieElement =[app scrollViews].otherElements[@"    Cookie   quantity: high   "];
  XCTAssert(cookieElement.exists);
  co = [cookieElement coordinateWithNormalizedOffset:CGVectorMake(0.87, 0.5)];
  [co tap];
  
  [app.otherElements[@" Search Selected"] tap];
  
  NSString *lableStirng = [[[[app scrollViews] otherElements] elementBoundByIndex:0] label];
  XCTAssertFalse([lableStirng containsString:@"Apple"] == NSNotFound);
  XCTAssertFalse([lableStirng containsString:@"Cookies"] == NSNotFound);
  
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Fridge"] tap];
  [app.otherElements[@" Unselect All"] tap];
  

  
  [[app scrollViews].otherElements[@"    Apple   quantity: high   "] tap];
  [[app.pickerWheels element] adjustToPickerWheelValue:@"empty"];
  [app.otherElements[@" Confirm"] tap];
  
  [[app scrollViews].otherElements[@"    Cookie   quantity: high   "] tap];
  [[app.pickerWheels element] adjustToPickerWheelValue:@"empty"];
  [app.otherElements[@" Confirm"] tap];
  
  appleElement =[app scrollViews].otherElements[@"    Apple   quantity: high   "];
  XCTAssert(!appleElement.exists);
  
  cookieElement =[app scrollViews].otherElements[@"    Cookie   quantity: high   "];
  XCTAssert(!cookieElement.exists);
  
  
}

- (void)testFridgeCheckBox {
  XCUIApplication *app = [[XCUIApplication alloc] init];
  
  XCUIElement *dragElement = app.textFields[@"Enter ingredient"];
  XCUICoordinate *s = [dragElement coordinateWithNormalizedOffset:CGVectorMake(0, 0)];
  XCUICoordinate *f = [dragElement coordinateWithNormalizedOffset:CGVectorMake(6, 0)];
  [s pressForDuration:0 thenDragToCoordinate:f];
  
  XCUIElement *enterIngredientTextField = app.textFields[@"Enter ingredient"];
  [enterIngredientTextField tap];
  [app.textFields[@"Enter ingredient"] typeText:@"Apple, Cookie"];
  [app typeText:@"\n"];
  [app.otherElements[@" \uff0b"] tap];
  
  XCUIElement *appleElement =[app scrollViews].otherElements[@"    Apple   quantity: high   "];
  XCTAssert(appleElement.exists);
  XCUICoordinate *co = [appleElement coordinateWithNormalizedOffset:CGVectorMake(0.87, 0.5)];
  [co tap];
  
  XCUIElement *cookieElement =[app scrollViews].otherElements[@"    Cookie   quantity: high   "];
  XCTAssert(cookieElement.exists);
  co = [cookieElement coordinateWithNormalizedOffset:CGVectorMake(0.87, 0.5)];
  [co tap];
  
  XCUIElement *appleCheckedElement =[app scrollViews].otherElements[@"    Apple   quantity: high  ✔ "];
  XCTAssert(appleCheckedElement.exists);
  
  XCUIElement *cookieCheckedElement =[app scrollViews].otherElements[@"    Cookie   quantity: high  ✔ "];
  XCTAssert(cookieCheckedElement.exists);
  
  [app.otherElements[@" Unselect All"] tap];
  
  appleElement =[app scrollViews].otherElements[@"    Apple   quantity: high   "];
  XCTAssert(appleElement.exists);
  
  cookieElement =[app scrollViews].otherElements[@"    Cookie   quantity: high   "];
  XCTAssert(cookieElement.exists);
}

@end
