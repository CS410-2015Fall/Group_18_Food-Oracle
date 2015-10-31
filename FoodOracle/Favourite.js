'use strict'

var React = require('react-native');
var FavouriteView = require("./FavouriteView"); //new
var Icon = require('react-native-vector-icons/Ionicons');

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	//	justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
	}
});

var Favourite = React.createClass({
	render: function() {
		return (
  	    //<View style={styles.container}>
	    //    <Icon name="heart" size={200} color="#4F8EF7" />
	    //</View>  //old
	    	<NavigatorIOS
			style={styles.container}
			barTintColor="rgba(114,192,253,1)"
			tintColor="#FFFFFF"
			titleTextColor="#FFFFFF"
			initialRoute={{
				title: 'Favourite',
				component: FavouriteView
			}}/>  //new
        );
	}
});

module.exports = Favourite;