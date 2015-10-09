'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var SearchBar = require('react-native-search-bar');
var baseURL = "http://api.yummly.com/v1/api/recipes?";
var appID = "a05ca702";
var appKey = "7ce644115e75fa844afb42c6079fc6c8";

"http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup"

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	ListView,
	TouchableHighlight,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 65
	},
	cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
});

var resultCache = {
	recipes: {}
} 

var SearchView = React.createClass ({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2})
		};
	},
	_onPress: function(e) { 
		var subURL = '_app_id=' + appID + '&_app_key=' + appKey;
		subURL = subURL + '&q=' + encodeURIComponent(e);
		this.fetchData(baseURL+subURL);
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
			<ListView
			dataSource={this.state.dataSource}
			renderRow={this.renderList}
			style={styles.listView}
			/>
			</View>
			);
	},
	fetchData: function(URL){
		
		fetch(URL)
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.getDataSource(responseData.matches),
			});
			
		}).done();
	},
	getDataSource: function(recipes: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(recipes);
  	},
  	renderList: function(recipe){
  		return (
  			<TouchableHighlight /*onPress={() => this.showBookDetail(book)}*/>
                <View>
                    <View style={styles.cellContainer}>
                        <Text>{recipe.recipeName}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
  			);
  	},
});

module.exports = SearchView;