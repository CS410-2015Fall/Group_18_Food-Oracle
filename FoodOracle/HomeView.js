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

var HomeView = React.createClass({
	render: function() {
		return (
  	    <View style={styles.container}>
	        <Icon name="earth" size={200} color="#4F8EF7" />
	    </View>
        );
	}
});

module.exports = HomeView;