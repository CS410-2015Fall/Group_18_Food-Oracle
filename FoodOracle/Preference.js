'use strict'

var React = require('react-native');
var PreferenceView = require('./PreferenceView');

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
				title: 'Preferences',
				component: PreferenceView
			}}/>       
			);
			
	}
}

module.exports = Preference;