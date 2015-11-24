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
  [query[@"Refrigerator"] tap];
  [query[@"Preference"] tap];
  [query[@"Home"] tap];
  
  XCTAssertTrue([query[@"Favourite"] exists]);
  XCTAssertTrue([query[@"Home"] exists]);
  XCTAssertTrue([query[@"Refrigerator"] exists]);
  XCTAssertTrue([query[@"Preference"] exists]);
  XCTAssertFalse([query[@"Not Button"] exists]);
  
}

- (void)testSearchBar {
  
  XCUIApplication *app = [[XCUIApplication alloc] init];
  XCUIElement *quickFoodSearchTextField = app.textFields[@"Quick food search"];
  [quickFoodSearchTextField tap];

  [quickFoodSearchTextField typeText:@"Chicken"];
  [app.otherElements[@" Search"] tap];
  
  //Pass test if below is executable (UI dependent)
  XCUIElement *table = app.otherElements[@"     Grilled Balsamic Glazed Chicken Rating: 4/5 Time: 25 Minutes      Garlic Chicken Rating: 4/5 Time: 35 Minutes      Chicken Cheesy Parmesan Rating: 4/5 Time: 35 Minutes      Crockpot BBQ Chicken Rating: 4/5 Time: 40 Minutes      BBQ Chicken Taquitos Rating: 4/5 Time: 40 Minutes      Rosemary Lemon Chicken Rating: 3/5 Time: 45 Minutes      One Pan Cajun Chicken Dinner Rating: 4/5 Time: 55 Minutes      Cola Chicken Rating: 4/5 Time: 60 Minutes      Roast Chicken Rating: 3/5 Time: 95 Minutes      The Best, Most Amazingly Moist Roast Chicken Rating: 4/5 Time: 105 Minutes "];
  [table.otherElements[@"    Grilled Balsamic Glazed Chicken Rating: 4/5 Time: 25 Minutes "] tap];
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [table.otherElements[@"    Garlic Chicken Rating: 4/5 Time: 35 Minutes "] tap];
 
  
  
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
  [app.otherElements[@"     Breakfast Frittata Rating: 4/5 Time: 5 Minutes      The Ultimate Breakfast Sandwich Rating: 3/5 Time: 20 Minutes      Sunrise Breakfast Bowls Rating: 3/5 Time: 30 Minutes      Sausage, Egg and Cheese Breakfast Roll-Ups Rating: 3/5 Time: 35 Minutes      Breakfast Sticks Rating: 4/5 Time: 35 Minutes      English Breakfast Frittata Rating: 4/5 Time: 45 Minutes      Breakfast Pizza Rating: 4/5 Time: 45 Minutes      Breakfast Stromboli Rating: 4/5 Time: 45 Minutes      Breakfast Lasagna Rating: 3/5 Time: 50 Minutes      Breakfast Nests Rating: 3/5 Time: 65 Minutes "].otherElements[@"    Breakfast Frittata Rating: 4/5 Time: 5 Minutes "] tap];
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  [app.otherElements[@"  Lunch  \uf3d3"] tap];
  [app.otherElements[@"     Cranberry Cheese and Prosciutto Sandwich Rating: 4/5 Time: 10 Minutes      Easy Lunch Idea for Kids Rating: 4/5 Time: 15 Minutes      5 Minute No Cook Lunch Salad Rating: 3/5 Time: 15 Minutes      Gipsy Lunch Rating: 3/5 Time: 15 Minutes      Smoked Turkey Corn Quesadilla Slider Rating: 3/5 Time: 20 Minutes      Avocado, Spinach and Egg Salad Rating: 4/5 Time: 25 Minutes      5 Minute Caramel Popcorn Rating: 4/5 Time: 25 Minutes      Taco Quesadillas ~ The Make-Ahead Lunch Box Rating: 4/5 Time: 25 Minutes      Lunch Time Tacos II Rating: 4/5 Time: 30 Minutes      Organic School Lunch Pasta Rating: 4/5 Time: 35 Minutes "].otherElements[@"    Cranberry Cheese and Prosciutto Sandwich Rating: 4/5 Time: 10 Minutes "] tap];
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  [app.otherElements[@"  Dinner  \uf3d3"] tap];
  [app.otherElements[@"     Leftover Turkey Dinner Stack Rating: 4/5 Time: 25 Minutes      One-Pan Taco Rice Dinner Rating: 4/5 Time: 30 Minutes      Chicken Cheesy Parmesan Rating: 4/5 Time: 35 Minutes      Crockpot Thanksgiving Dinner Rating: 4/5 Time: 35 Minutes      One Pan Cajun Chicken Dinner Rating: 4/5 Time: 55 Minutes      Quick Dinner Rolls Rating: 4/5 Time: 55 Minutes      Pumpkin Dinner Rolls Rating: 4/5 Time: 60 Minutes      Homemade Dinner Rolls + Tutorial Rating: 3/5 Time: 65 Minutes      30 Minute Dinner Rolls Rating: 4/5 Time: 65 Minutes      Dinner Rolls Rating: 4/5 Time: 105 Minutes "].otherElements[@"    Leftover Turkey Dinner Stack Rating: 4/5 Time: 25 Minutes "] tap];
  [[[[app.navigationBars[@"RCTWrapperView"] childrenMatchingType:XCUIElementTypeButton] matchingIdentifier:@"Back"] elementBoundByIndex:0] tap];
  [app.navigationBars[@"RCTWrapperView"].buttons[@"Food Oracle"] tap];
  
}

@end
