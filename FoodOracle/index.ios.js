/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 var React = require('react-native');
 var Icon = require('react-native-vector-icons/Ionicons');
 var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  View,
  Image,
  Text,
  View,
} = React;

var Search = require('./Search');
var Favourite = require('./Favourite');
var Home = require('./Home');


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
      iconName="ios-home-outline"
      selectedIconName="ios-home-outline"
      onPress={() => {
        this.setState({
          selectedTab: 'home'
        });
      }}>
      <Home/>
      </Icon.TabBarItem>

      <Icon.TabBarItem
      selected={this.state.selectedTab === 'search'}
      title="Search"
      iconName ="ios-search"
      selectedIconName="ios-search"
      onPress={() => {
        this.setState({
          selectedTab: 'search'
        });
      }}>
      <Search/>
      </Icon.TabBarItem>

      <Icon.TabBarItem
      selected={this.state.selectedTab === 'favourite'}
      title="Favourite"
      iconName="ios-star"
      selectedIconName="ios-star"
      onPress={() => {
        this.setState({
          selectedTab: 'favourite'
        });
      }}>
      <Favourite/>
      </Icon.TabBarItem>

      </TabBarIOS>
      );
}
});

AppRegistry.registerComponent('FoodOracle', () => FoodOracle);
