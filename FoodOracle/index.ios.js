/**
 * 
 * https://github.com/facebook/react-native
 */
 'use strict';

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


var FoodOracle = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home'
    };
  },
  render: function() {
    return (
      
      <TabBarIOS selectedTab={this.state.selectedTab ==='home'}>
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
      selected={this.state.selectedTab === 'refrigerator'}
      title="Refrigerator"
      iconName="ios-list"
      selectedIconName="ios-list"
      onPress={() => {
        this.setState({
          selectedTab: 'refrigerator'
        });
      }}>
      <Refrigerator/>
      </Icon.TabBarItem>

      <Icon.TabBarItem
      selected={this.state.selectedTab === 'favourite'}
      title="Favourite"
      iconName="ios-heart"
      selectedIconName="ios-heart"
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
      );
  }
});

AppRegistry.registerComponent('FoodOracle', () => FoodOracle);
