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
			tintColor="rgba(20,50,87,1)"
			titleTextColor="rgba(20,50,87,1)"
			initialRoute={{
				leftButtonTitle: '>>>',
				title: 'CookBook',
				component: FavouriteView
			}}/>  //new
        );
	}
});

module.exports = Favourite;