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
			barTintColor="rgba(114,192,253,0.7)"
			tintColor="#FFFFFF"
			titleTextColor="#FFFFFF"
			initialRoute={{
				title: 'Food Oracle',
				component: HomeView,
			}}/>       
			);
			
	}
});

module.exports = Home;