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

class Preference extends Component{
	render() {
		return (
			      <NavigatorIOS
			style={styles.container}
			initialRoute={{
				title: 'Food Oracle',
				component: HomeView
			}}/>       
			);
			
	}
}

module.exports = Preference;