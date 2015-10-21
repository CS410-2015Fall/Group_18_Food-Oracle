'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var SearchBar = require('react-native-search-bar');
var sample = require('./sample.json')
var Fetch = require('./Fetch')

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
} = React;

var styles = StyleSheet.create({
	searchContainer: {
		marginTop: 65,
		
	},
	listView: {
		

	},
	cellContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
});

var resultCache = {
	recipes: sample.matches
} 

var SearchView = React.createClass ({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			dataSource: ds.cloneWithRows(resultCache.recipes),
		};
	},
	_onPress: function(e) { 
		var handler = function(self, responseData) {
			resultCache.recipes = responseData.matches;
			sortByTime(resultCache.recipe);
			self.setState({
				dataSource: self.getDataSource(resultCache.recipes),
			});
		}

		var fetch = new Fetch(this);
		fetch.searchRequest(encodeURIComponent(e), handler);
	},
	render: function() {
		return (
			<View>
				<View style={styles.searchContainer}>
					<SearchBar 
					placeholder="Search Things"
					onSearchButtonPress={this._onPress}
					/>
				</View>
				
				<ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={false}
                contentInset={{bottom:210}}
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
  			<TouchableOpacity /*onPress={() => this.showBookDetail(book)}*/>
                <View>
                    <View style={styles.cellContainer}>
                    	<Text>{recipe.recipeName}</Text>
                    	<Text> </Text>
                        <Text>{recipe.totalTimeInSeconds/60} Minutes</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
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