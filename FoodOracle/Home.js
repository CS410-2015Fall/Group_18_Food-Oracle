'use strict'

var React = require('react-native');
var HomeView = require('./HomeView');

var {
	StyleSheet,
	NavigatorIOS,
	Component,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

var Home = React.createClass({
	render: function() {
		return (
			      <NavigatorIOS
			style={styles.container}
			barTintColor="rgba(114,192,253,1)"
			tintColor="rgba(20,50,87,1)"
			titleTextColor="rgba(20,50,87,1)"
			initialRoute={{
				leftButtonTitle: '>>>',
				title: 'Food Oracle',
				component: HomeView,
			}}/>       
			);
			
	}
});

module.exports = Home;