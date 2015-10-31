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
			barTintColor="rgba(114,192,253,1)"
			tintColor="#FFFFFF"
			titleTextColor="#FFFFFF"
			initialRoute={{
				title: 'Preference',
				component: PreferenceView
			}}/>       
			);
			
	}
}

module.exports = Preference;