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
var Drawer = require('react-native-drawer')


var FoodOracle = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home'
    };
  },
  render: function() {
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
    </Drawer>
      );
  }
});

AppRegistry.registerComponent('FoodOracle', () => FoodOracle);
