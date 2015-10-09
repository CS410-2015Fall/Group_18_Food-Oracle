'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	}
});

var Home = React.createClass({
	render: function() {
		return (
  	    <View style={styles.container}>
	        <Text style={styles.description}>Return Home
	        </Text>
	        <Icon name="earth" size={40} color="#4F8EF7" />
	    </View>
        );
	}
});

module.exports = Home;