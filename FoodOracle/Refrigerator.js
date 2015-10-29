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
				initialRoute = {{
					title: 'Fridge',
					component: FridgeView
				}}
			/>       
		);
	}
}); 

module.exports = Fridge;