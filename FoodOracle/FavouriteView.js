'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var Favouritesamples = require('./favouritesamples.json');
var Fetch = require('./Fetch');
var RecipeView = require('./RecipeView');
var DB = require('./DB.js');


var {
  Component,
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
  },
	topMargin: {
		marginTop: 65,
		
	},
	cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 30,


    },
    rightContainer: {
    	flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    button: {
      position: 'absolute',
      right: 10,
      width: 90,
      flex: 1,
      flexDirection: 'row',
      borderColor: 'rgba(72,187,236,0.2)',
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(72,187,236,0.2)',
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'Arial',
      color: 'black',
      alignSelf: 'center',
    },
      buttonContainer: {
    flex: 0.125,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    marginTop: 65,
  },
});

var resultCache = {
	recipes: Favouritesamples.favourites
} 

var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

///////// addNewFavourite: --------- CALL THIS IN RECIPE VIEW ---------

  function addNewFavourite(recipeid, name, time, salty, sour, sweet, bitter, meaty, piquant) {     //all the flavor values are floats with range of 0.0 - 1.0
    DB.favourites.get({id: recipeid}, (result) => {
      console.log(result);
      if (result.length == 0) {
        DB.favourites.add({id: recipeid, recipeName: name, totalTimeInSeconds: time, saltyValue: salty, sourValue: sour, sweetValue: sweet, bitterValue: bitter, meatyValue: meaty, piquantValue: piquant}, (result) => {
            console.log(result);
          }
        );
        /*DB.flavors.add({id: recipeid, saltyValue: salty, sourValue: sour, sweetValue: sweet, bitterValue: bitter, meatyValue: meaty, piquantValue: piquant}, (result) => {
            console.log(result);
          }
        ); */
      } else {
        DB.favourites.update_id(result[0]._id, {recipeName: name, totalTimeInSeconds: time, saltyValue: salty, sourValue: sour, sweetValue: sweet, bitterValue: bitter, meatyValue: meaty, piquantValue: piquant}, (result) => {
          console.log(result);
        });
        /*DB.flavors.update_id(result[0]._id, {saltyValue: salty, sourValue: sour, sweetValue: sweet, bitterValue: bitter, meatyValue: meaty, piquantValue: piquant}, (result) => {
          console.log(result);
        }); */

      }
    });
  }

//////////// ----------------------------------


class FavouriteView extends Component {
//var FavouriteView = React.createClass ({
	/*getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			dataSource: ds.cloneWithRows(resultCache.recipes),
		};
	},
  */


    constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      favourites: false,
  
    };
    this._refreshListView();
    //FOR TESTING:
    //this._addSample();
  }

  getInitialState(){
    this._refreshListView();
  }

  render(){ 
		return (
			<View style = {styles.container}>   
				<ListView
                dataSource={ds.cloneWithRows(this.state.favourites)}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={true}
                
                />
                </View>
			);
	}
    //  if manual, instead of automaticallyAdjustContentInsets: contentInset={{top:65, bottom:-10}}
	
      renderList(recipe){  
  		return (
  			<TouchableOpacity onPress={() => this.rowPressed(recipe.id)}>
                <View>
                    <View style={styles.cellContainer}>
                        <View style={styles.rightContainer}>
                    		<Text>{recipe.recipeName}</Text>
                        	<Text>{recipe.totalTimeInSeconds/60} Minutes</Text>
                        </View>
                            <TouchableHighlight 
                                style = {styles.button}
                                underlayColor = '#99d9f4'
                                onPress = {() => this._onDeletePress(recipe.id)}>
                                <Text style = {styles.buttonText}>
                                    Delete
                                </Text>
                             </TouchableHighlight>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
  			);
  	}
  	
  rowPressed(recipeID){
        this._executeQuery(recipeID); 

  }

  _onDeletePress(recipeID){
    DB.favourites.remove({id: recipeID}, (result) => {
      console.log(result);
    });
    /*DB.flavors.remove({id: recipeID}, (result) => {
      console.log(result);
      this._refreshListView();
    }); */

  }

  _executeQuery(query){
    console.log(query)
    var handler = function(self, responseData) {
      self._handleResponse(responseData);
    }
    var errorHandler = function(error) {
      React.AlertIOS.alert(
          'Error',
          'There seems to be an issue connecting to the network.  ' + error
        );
    }
    var fetch = new Fetch(this);
    fetch.getRequest(encodeURIComponent(query), handler, errorHandler);    
  }

  _handleResponse(response){
    console.log(response)
    this.props.navigator.push({
      component: RecipeView,
      passProps: {recipe: response}
    });
  }


    _refreshListView() {
    DB.favourites.get_all((result) => {
      console.log(result);
      this.setState({
        isInitialized: true,
        favourites: result.rows,
      });
    });
  }
//// FOR TESTING:
    _addSample(){
          DB.favourites.add({id: "The-Best-French-Onion-Soup-A-love-story-1319267",
          recipeName: "The Best French Onion Soup – A love story", totalTimeInSeconds: 2400}, (result) => {
            console.log(result);
            this._addSample1();
          });
    }
    _addSample1(){
                DB.favourites.add({id: "Crock-Pot-Japanese-Onion-Soup-1319396",
          recipeName: "Crock Pot Japanese Onion Soup", totalTimeInSeconds: 2100}, (result) => {
            console.log(result);
            addNewFavourite("Brown-Ale-French-Onion-Soup-1318732","Brown Ale French Onion Soup", 7800, 1.0, 1.0, 0.5, 0.8, 0.2, 0.0);

            this._refreshListView();
          }
          );
    }
    


  };	



module.exports = FavouriteView;


