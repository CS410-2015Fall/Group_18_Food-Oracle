'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var Fetch = require('./Fetch');
var RecipeView = require('./RecipeView');
var DB = require('./DB.js');
var Recommender = require('./Recommender');
var SearchResults = require('./SearchResults');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

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
    backgroundColor: 'rgba(72,187,236,0.2)',
  },
  topMargin: {
    marginTop: 65,
    
  },
cellContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(72,187,236,0.2)',
    padding: 20,
    width: width,
  },
    leftContainer: {
      flex: 4,
    },
    separator: {
    height: 2,
    backgroundColor: 'rgba(72,187,236,1)',
  },
    buttonRemove: {
    flex: 1,
    borderColor: 'rgba(72,187,236,0.5)',
    borderWidth: 2,
    borderRadius: 8,
    height: 30,
      width: 90,
    justifyContent: 'center',
    backgroundColor: 'rgba(20,56,86,0.8)',
    },
    buttonText: {
      fontSize: 21,
      fontFamily: 'Arial',
      color: 'white',
      alignSelf: 'center',
    },
    buttonContainerRight: {
      flex: 1,
      alignSelf: 'center',
      marginRight: 15,
    },
    buttonContainer: {
      flex: 0.0833,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: 'transparent',
    },
    buttonRecommend: {
      flex: 1,
      borderColor: 'rgba(72,187,236,0.5)',
      borderWidth: 3,
      borderRadius: 8,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(20,56,86,0.8)',
    },
    flowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5,
      height: 49,
    },

  fillerView: {
      height: 49,
    },

    ingredientText: {
    fontSize:23,
    fontFamily: 'Arial',
    color: 'rgba(20,56,86,0.8)',
  },
});

var resultCache = {
  recipes: false,
} 

var sortByTime = function(item) {
  item.sort(compare);
}

var compare = function(a, b){
  if (a.totalTimeInSeconds < b.totalTimeInSeconds)
    return -1;
  if (a.totalTimeInSeconds > b.totalTimeInSeconds)
    return 1;
  return 0;
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
      } else {
        DB.favourites.update_id(result[0]._id, {recipeName: name, totalTimeInSeconds: time, saltyValue: salty, sourValue: sour, sweetValue: sweet, bitterValue: bitter, meatyValue: meaty, piquantValue: piquant}, (result) => {
          console.log(result);
        });
      }
    });
  }

//////////// ----------------------------------


class FavouriteView extends Component {

    constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      favourites: false,
  
    };
    this._refreshListView(() => {}, []);
  }

  render() {
    DB.preferences.get({key: 'areFavoritesUpdated'}, (result) => {
      if (result.length == 0) {
        DB.preferences.add({key: 'areFavoritesUpdated', value: false}, (result) => {});
      } else if (result[0].value) {
        DB.preferences.update({key: 'areFavoritesUpdated'}, {value: false}, (result) => {
          this._refreshListView(() => {}, []);
        });
      }
    });
    return (
      <View style = {styles.container}>
        <ListView
          dataSource={ds.cloneWithRows(this.state.favourites)}
          renderRow={this.renderList.bind(this)}
          style={styles.listView}
          automaticallyAdjustContentInsets={true}
        />
        <View style = {styles.buttonContainer}>
          <View style = {styles.flowRight}>
            <TouchableHighlight
              style = {styles.buttonRecommend}
              underlayColor = '#99d9f4'
              onPress = {() => this._onRecommendPress()}>
              <Text style = {styles.buttonText}>
                Recommend Recipes
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.fillerView}/>
      </View>
    );
  }
  
    renderList(recipe) {  
      return (
        <TouchableOpacity onPress={() => this.rowPressed(recipe.id)}>
                <View>
                    <View style={styles.cellContainer}>
                        <View style={styles.leftContainer}>
                          <Text style = {styles.ingredientText}>{recipe.recipeName}</Text>
                          <Text style = {styles.ingredientText}>{recipe.totalTimeInSeconds/60} Minutes</Text>
                        </View>
                        <View style = {styles.buttonContainerRight}>
                            <TouchableHighlight 
                                style = {styles.buttonRemove}
                                underlayColor = '#99d9f4'
                                onPress = {() => this._onDeletePress(recipe.id)}>
                                <Text style = {styles.buttonText}>
                                    Remove
                                </Text>
                             </TouchableHighlight>
                          </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
        );
    }
    
  rowPressed(recipeID) {
        this._executeQuery(recipeID); 

  }

  _onDeletePress(recipeID) {
    DB.favourites.remove({id: recipeID}, (result) => {
      console.log('_onDeletePress');
      console.log(result);
      this._refreshListView(() => {}, []);
    });
  }
  
  _onRecommendPress() {
    console.log('_onRecommendPress');
    if (Object.keys(this.state.favourites).length != 0) {
      var recommender = new Recommender(this);
      this._executeRecommenderQuery(recommender.calculateFlavorRanges(this.state.favourites));
    }
  }

  _executeQuery(query) {
    console.log('_executeQuery');
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

  _handleResponse(response) {
  console.log('_handleResponse');
    console.log(response)
    this.props.navigator.push({
      component: RecipeView,
      passProps: {recipe: response}
    });
  }

  _handleRecommenderResponse(response) {
    console.log('_handleRecommenderResponse');
    var ids = [];
    var x;
    for (x in this.state.favourites) {
      ids.push(this.state.favourites[x].id);
    }
    var y;
    for (y in response.matches) {
      if (ids.indexOf(response.matches[y].id) != -1) {
        response.matches.splice(y, 1);
      }
    }
    this.props.navigator.push({
      component: SearchResults,
      passProps: {matches: response.matches}
    });
  }

  _executeRecommenderQuery(query) {
    console.log('_executeRecommenderQuery');
    console.log(query);
    var handler = function(self, responseData) {
      resultCache.recipes = responseData.matches;
      sortByTime(resultCache.recipes);
      self._handleRecommenderResponse(responseData);
    }
    var errorHandler = function(error) {
      React.AlertIOS.alert(
        'Error',
        'There seems to be an issue connecting to the network.  ' + error
      );
    }
    var fetch = new Fetch(this);
    fetch.recommendRequest(encodeURIComponent(query), handler, errorHandler);   
  }

  _refreshListView(func, args) {
    DB.favourites.get_all((result) => {
      console.log('_refreshListView');
      console.log(result);
      this.setState({
        isInitialized: true,
        favourites: result.rows,
      });
      func.apply(this, args);
    });
  } 
};  



module.exports = FavouriteView;
