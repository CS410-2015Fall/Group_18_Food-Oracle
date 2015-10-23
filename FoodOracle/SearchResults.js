'use strict';

var React = require('react-native');
var RecipeView = require('./RecipeView');

var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Component,
  TouchableOpacity 
} = React;

var styles = StyleSheet.create({
  
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  thumbnail: {
    width: 90,
        height: 90,
        marginRight: 10

  },
  cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    rightContainer: {
      flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
});

class SearchResults extends Component {
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		this.state = {
			dataSource: ds.cloneWithRows(this.props.matches)
		};
	}

renderRow(recipeData) {
  return (
   <TouchableOpacity onPress={() => this.rowPressed(recipeData.id)}>
                <View>
                    <View style={styles.cellContainer}>
                      <Image
                            source={{uri: recipeData.imageUrlsBySize['90']}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                        <Text>{recipeData.recipeName}</Text>
                          <Text>{recipeData.totalTimeInSeconds/60} Minutes</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
  );
}

	render(){
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}/>
		);
	}

	rowPressed(recipeID){
		var recipe = this.props.matches.filter(prop => prop.id === recipeID)[0];

		this.props.navigator.push({
			title: "Recipe",
			component: RecipeView,
			passProps: {recipe: recipe}
		});
	}
}
module.exports = SearchResults;