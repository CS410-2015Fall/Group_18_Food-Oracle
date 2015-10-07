'use strict'

var React = require('react-native');
var SearchView = require('./SearchView');

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

class Search extends Component {
	render() {
		return (
			<NavigatorIOS
			style={styles.container}
			initialRoute={{
				title: 'Search',
				component: SearchView
			}}/>       
			);
	}
} 

module.exports = Search;