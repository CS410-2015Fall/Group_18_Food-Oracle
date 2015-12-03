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
  type="overlay"
  content={<Refrigerator />}
  tapToClose={true}
  openDrawerOffset={.07} // 20% gap on the right side of drawer
  panCloseMask={.2}
  closedDrawerOffset={-3}
  styles={{
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 0}
  }}
  tweenHandler={(ratio) => ({
    main: { opacity:(2-ratio)/2 }
  })}
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
  }
});

AppRegistry.registerComponent('FoodOracle', () => FoodOracle);
