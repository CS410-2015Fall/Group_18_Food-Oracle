'use strict'

var React = require('react-native');

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

class Favourite extends Component {
	render() {
		return (
  	    <View style={styles.container}>
	        <Text style={styles.description}>
        	  
	        </Text>
	    </View>
        );
	}
}

module.exports = Favourite;