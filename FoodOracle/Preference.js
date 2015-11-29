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
			tintColor="rgba(20,50,87,1)"
			titleTextColor="rgba(20,50,87,1)"
			initialRoute={{
				leftButtonTitle: '>>>',
				title: 'Preference',
				component: PreferenceView
			}}/>       
			);
			
	}
}

module.exports = Preference;