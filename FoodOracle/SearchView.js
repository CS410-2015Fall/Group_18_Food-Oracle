'use strict'

var React = require('react-native');
var SearchBar = require('react-native-search-bar');

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

class SearchView extends Component {
	render() {
		return (
  	    	<SearchBar
  	    		//out of position now 
  	    		placeholder="Search Something"
  	    	/>
        );
	}
}

module.exports = SearchView;