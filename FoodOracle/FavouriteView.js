'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var Favouritesamples = require('./favouritesamples.json')
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
	topMargin: {
		marginTop: 65,
		
	},
	cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 50
    },
    rightContainer: {
    	flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
});

var resultCache = {
	recipes: Favouritesamples.favourites
} 

var FavouriteView = React.createClass ({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			dataSource: ds.cloneWithRows(resultCache.recipes),
		};
	},


	render: function() {
		return (
			<View>
				<ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={true}
                
                />
                </View>
			);
	},
    //  if manual, instead of automaticallyAdjustContentInsets: contentInset={{top:65, bottom:-10}}
	//jjjjjj
  	renderList: function(recipe){
  		return (
  			<TouchableOpacity /*onPress={() => this.showBookDetail(book)}*/>
                <View>
                    <View style={styles.cellContainer}>
                        <View style={styles.rightContainer}>
                    		<Text>{recipe.recipeName}</Text>
                        	<Text>{recipe.totalTimeInSeconds/60} Minutes</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
  			);
  	},
  	
  	
});


module.exports = FavouriteView;


