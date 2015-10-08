'use strict'

var React = require('react-native');
var SearchBar = require('react-native-search-bar');

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 65
	}
});

var SearchView = React.createClass ({
	_onPress: function(e) { 
		var a = e;
		debugger;
	},
	render: function() {
		return (
  	    	<View style={styles.container}>
  	    		<SearchBar
  	    			placeholder="Search Things"
  	    			onSearchButtonPress={
  	    				this._onPress
  	    			}
  	    		/>
  	    	</View>
        );
	}
});

module.exports = SearchView;