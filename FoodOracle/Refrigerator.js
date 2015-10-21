'use strict'

var React = require('react-native');

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
} = React;

var Icon = require('react-native-vector-icons/Ionicons');

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	}
});

var Refrigerator = React.createClass({
	render: function() {
		return (
  	    <View style={styles.container}>
	        <Text style={styles.description}>Fill Fridge
	        </Text>
	        <Icon name="ios-list-outline" size={40} color="#4F8EF7" />
	    </View>
        );
	}
});

module.exports = Refrigerator;