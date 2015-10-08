'use strict'

var React = require('react-native');

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

var Favourite = React.createClass({
	render: function() {
		return (
  	    <View style={styles.container}>
	        <Text style={styles.description}>
        	  
	        </Text>
	    </View>
        );
	}
});

module.exports = Favourite;