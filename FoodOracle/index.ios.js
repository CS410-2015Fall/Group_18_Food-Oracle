/**
 * 
 * https://github.com/facebook/react-native
 */
 'use strict';

var ingredient_dictionary = ["almond", "almonds","apple", "apples", "artichoke", "artichokes", "asparagus","avocado", 
"bacon", "banana", "bananas", "bay", "beef", "bean", "blueberry", "blueberries", "bouillon", "broccoli", "butter", "buttermilk", 
"cabbage", "cabbages", "carrot", "carrots", "cauliflower", "celery", "cheese", "cheddar", "cherry", "chicken", "chives", "bok choy", "cinnamon", "cod", "corn", "cucumber", 
"date", "duck", "dumplings", "durian", 
"edamame", "edamames", "eel", "egg", "eggs", "eggplant", 
"fennel", "flour", "fries",
"garlic", "ginger", "goose", "grape", "grapefruit", "guava", 
"ham", "halibut", "herb", "honey", "horseradish", 
"icecream", 
"jicama",
"kale", "ketchup", "kiwi", 
"lamb", "lavender", "leek", "lemon", "lettuce", "lime", "lobster", 
"macaroni", "mango", "marshmallow", "mayonnaise", "melon", "milk", "mint", "miso", "mozzarella", "mushroom", "mussel", "mustard",
"nori", 
"oatmeal", "octopus", "oil", "olive", "olives", "onion", "onions", "orange", "oranges", 
"panko", "papaya", "paprika", "pepper", "parsley", "pasta", "pea", "peach", "peanut", "pecan", "pickle", "pineapple", "plum", "pomegranate", "ponzu", "pork", "portabella", "potato", "prawn", "pumpkin", 
"radish", "raspberry", "rhubarb", "rice", "rosemary", 
"saffron", "sage", "salmon", "salsa", "salt", "sauerkraut", "sausage", "scallop", "scallops", "sesame", "shrimp", "shitake", "soba", "soymilk", "spinach", "sprouts", "squash", "squid", "steak", "strawberry", "sugar", "syrup"]; 


 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  View,
  Image,
  Text,
  View,
} = React;

var Icon = require('react-native-vector-icons/Ionicons');
var Preference = require('./Preference');
var Favourite = require('./Favourite');
var Home = require('./Home');
var Refrigerator = require('./Refrigerator');
var Drawer = require('react-native-drawer')
var DB = require('./DB.js');


var FoodOracle = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home'
    };
  },
  render: function() {

   /* DB.dictionary.erase_db(function(removed_data){
        console.log(removed_data);
    }); 

    DB.dictionary.get({name: 'isDictionaryInitialized'}, (result) => {
      console.log('----------Im RUNNING--------'+result);
      if (result.length == 0) {
        console.log('----------LENGTH IS ZERO--------'+result);
        DB.dictionary.add({name: 'isDictionaryInitialized'}, (result) => {
                  _recursiveAddIngredients(ingredient_dictionary);
        });
      }
    });

    DB.dictionary.get_all(function(result){
            console.log('----------dictionary GET ALL--------'+result);
        });

    */

    return (
      
    <Drawer
      type="static"
      content={<Refrigerator />}
      openDrawerOffset={50}
      styles={{main: {shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 3}}}
                      tweenHandler={Drawer.tweenPresets.parallax}
      >
      <TabBarIOS 
      selectedTab={this.state.selectedTab ==='home'}
      tintColor="rgba(20,50,87,0.8)"
      translucent='true'>
      <Icon.TabBarItem
      selected={this.state.selectedTab === 'home'}
      title="Home"
      iconName="ios-home"
      selectedIconName="ios-home"
      onPress={() => {
        this.setState({
          selectedTab: 'home'
        });
      }}>
      <Home/>
      </Icon.TabBarItem>      

      <Icon.TabBarItem
      selected={this.state.selectedTab === 'favourite'}
      title="CookBook"
      iconName="ios-list"
      selectedIconName="ios-list"
      onPress={() => {
        this.setState({
          selectedTab: 'favourite'
        });
      }}>
      <Favourite/>
      </Icon.TabBarItem>

      <Icon.TabBarItem
      selected={this.state.selectedTab === 'preference'}
      title="Preference"
      iconName ="person"
      selectedIconName="person"
      onPress={() => {
        this.setState({
          selectedTab: 'preference'
        });
      }}>
      <Preference/>
      </Icon.TabBarItem>

      </TabBarIOS>
    </Drawer>
      );
  },


  _recursiveAddIngredients: function(ingredients) {
    console.log("----------recursive add---------");
    console.log(ingredients + ', ' + args);
    if (ingredients.length != 0) {
      var ingredient = ingredients.splice(0, 1)[0].trim();
      if (ingredient != '') {
        DB.dictionary.get({name: ingredient}, (result) => {
            if (result.length == 0) {
              DB.dictionary.add({name: ingredient}, (result) => {
                  this._recursiveAddIngredients(ingredients);
                }
              );
            } 
          }
        );
      } else {
        this._recursiveAddIngredients(ingredients);
      }
    } else {
      console.log('------func-------');
      console.log(args);
      func.apply(this, args);
    }
  }

  });

AppRegistry.registerComponent('FoodOracle', () => FoodOracle);
