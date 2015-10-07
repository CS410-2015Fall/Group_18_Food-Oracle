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
		flex: 1,
		marginTop: 65
	}
});

class SearchView extends Component {
	render() {
		return (
  	    	<View style={styles.container}>
  	    		<SearchBar
  	    			placeholder="Search Things"
  	    		/>
  	    	</View>
        );
	}
}

module.exports = SearchView;