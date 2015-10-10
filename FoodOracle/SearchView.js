'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var SearchBar = require('react-native-search-bar');
var baseURL = "http://api.yummly.com/v1/api/recipes?";
var appID = "a05ca702";
var appKey = "7ce644115e75fa844afb42c6079fc6c8";
var sample = require('./sample.json')

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
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			dataSource: ds.cloneWithRows(resultCache.recipes),
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
			resultCache.recipes = responseData.matches;
			sortByTime(resultCache.recipe);
			this.setState({
				dataSource: this.getDataSource(resultCache.recipes),
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
                    	<Text> </Text>
                        <Text>{recipe.totalTimeInSeconds/60} Minutes</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
  			);
  	},
  	
  	
});

var sortByTime = function(item){
	item = resultCache.recipes;
  	item.sort(compare);
}

var compare = function(a, b){
  		if (a.totalTimeInSeconds < b.totalTimeInSeconds)
    		return -1;
  		if (a.totalTimeInSeconds > b.totalTimeInSeconds)
    		return 1;
  		return 0;
  	}

module.exports = SearchView;