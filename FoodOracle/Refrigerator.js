'use strict'

var React = require('react-native');
var FridgeView = require('./FridgeView');

var {
	StyleSheet,
	NavigatorIOS,
	Component,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

var Fridge = React.createClass ({
	render: function() {
		return (
			<NavigatorIOS
				style = {styles.container}
				barTintColor="rgba(114,192,253,1)"
			tintColor="rgba(20,50,87,1)"
			titleTextColor="rgba(20,50,87,1)"
				initialRoute = {{
					title: 'Fridge',
					component: FridgeView
				}}
			/>       
		);
	}
}); 

module.exports = Fridge;