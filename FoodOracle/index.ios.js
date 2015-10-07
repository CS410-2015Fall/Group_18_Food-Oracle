/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Search = require('./Search');
var Favourite = require('./Favourite');

var {
  AppRegistry,
  TabBarIOS,
} = React;

var FoodOracle = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'search'
    };
  },
  render: function() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    title="Search"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'favourite'}
                    title="Favourite"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'favourite'
                        });
                    }}>
                    <Favourite/>
                </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('FoodOracle', () => FoodOracle);
