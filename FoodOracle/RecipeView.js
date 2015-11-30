'use strict';
 
var React = require('react-native');
var KDSocialShare = require('NativeModules').KDSocialShare;
var Icon = require('react-native-vector-icons/Ionicons');
var Browser = require('react-native-browser');
var Lightbox = require('react-native-lightbox');
var Favourites = require('./FavouriteView');
var DB = require('./DB.js');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  StyleSheet,
  Image, 
  View,
  Text,
  Component,
  TouchableHighlight,
  ListView,
  AlertIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(74,255,160,0.4)',
  },

  heading: {
    backgroundColor: '#FFFFFF',
  },

  separator: {
    height: 2,
    backgroundColor: 'rgba(72,187,236,0.5)',
  },

  backdropImage: {
    alignSelf: 'stretch',
    height: height/3,
    width: width,
  },

  backdropView: {
    width: width/2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#48BBEC',
    borderWidth: 1,
    margin: 10,

  },

  title: {
    fontSize: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },

  ingredients: {
    fontSize: 20,
    margin: 5,
    color: 'rgba(20,56,86,1)',
    paddingLeft: 20,
    paddingRight: 20,
  },

  button: {
  flex: 1,
  flexDirection: 'row',
    borderColor: 'rgba(72,187,236,0.5)',
    borderWidth: 1,
    height: height/16,
    width: width/3,
    justifyContent: 'center',
    backgroundColor: 'rgba(20,56,86,0.8)',
 },

 buttonText: {
  fontSize: 23,
  fontFamily: 'Arial',
  color: 'white',
  alignSelf: 'center'
},
flowRightButtons: {
  
  flexDirection: 'row',
  backgroundColor: 'rgba(0,0,0,0)',
  
},
flowRight: {
  flexDirection: 'row',
},
 cellContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F5FCFF',
        width: width,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0)'
    },
  
  header: {
    flex: 1,
    backgroundColor: 'rgba(20,50,87,1)',
    fontSize: 25,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 25,
  },

  fillerView: {
      height: 49,
    },
    listPanel: {
    flex: 1,
  }
});

class RecipeView extends Component{
  
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    var recipe = this.props.recipe;
    this.state = {
      dataSource: ds.cloneWithRows(recipe.ingredientLines),
    };
  }

  pressShare(){
    var object = {};
    var recipe = this.props.recipe;
    object["link"] = recipe.source.sourceRecipeUrl;
    object["imagelink"] = recipe.images["0"].hostedMediumUrl;
    
    KDSocialShare.shareOnFacebook(object,
      (results) => {
        console.log(results);
      }
    );
  }

  pressSource(){
    var recipe = this.props.recipe;
    Browser.open(recipe.source.sourceRecipeUrl, {
                navigationButtonsHidden: false,
                showActionButton: false,
                showPageTitles: true,
                disableContextualPopupMenu: true,
                hideWebViewBoundaries: true
                });
  }

  pressSave(){
    //function addNewFavourite(recipeid, name, time, salty, sour, sweet, bitter, meaty, piquant)
    React.AlertIOS.alert(
          'Recipe Saved',
          'Check your CookBook'
        );
    var recipe = this.props.recipe;
    var id = recipe.id;
    var name = recipe.name;
    var time = recipe.totalTimeInSeconds;
    var salty = recipe.flavors.Salty;
    var meaty = recipe.flavors.Meaty;
    var bitter = recipe.flavors.Bitter;
    var sour = recipe.flavors.Sour;
    var sweet = recipe.flavors.Sweet;
    var piquant = recipe.flavors.Piquant;

    console.log(recipe.flavors.Salty);
    //console.log(id + name + time + "" + salty + "" + sour + "" + sweet + "" + bitter + "" + meaty + "" + piquant)

    this.addNewFavourite(id, name, time, salty, sour, sweet, bitter, meaty, piquant);
  }

	render() {
    var recipe = this.props.recipe;  
    console.log(recipe.images[0]['hostedLargeUrl'])
      return (

      <View style={styles.container}>
        
        <View style={styles.heading}>
            <Lightbox navigator={this.navigator}
                      renderContent={() => (
                            <Image style={styles.backdropImage} 
                            source={{uri: recipe.images[0]['hostedLargeUrl']}}/>
                          )}>
            <Image style={styles.backdropImage} 
              source={{uri: recipe.images[0]['hostedLargeUrl']}}>
                  <View style={styles.backdropView}>
                    <Text style={styles.title}>{recipe.name}</Text>
                  </View>
              
                  
            </Image>
            </Lightbox>
        </View> 
        <View style={styles.flowRightButtons}>
                          <TouchableHighlight 
                            onPress={this.pressSource.bind(this)}
                            style={styles.button}
                            underlayColor='#99d9f4'>
                            <View style={styles.flowRight}>
                              <Text style={styles.buttonText}>Cook </Text>
                              <Icon name="fork" size={26} color="#FFFFFF" />
                              <Icon name="knife" size={26} color="#FFFFFF" />
                              <Icon name="spoon" size={26} color="#FFFFFF" />
                            </View>
                          </TouchableHighlight>
                  
                          <TouchableHighlight
                            onPress={this.pressShare.bind(this)}
                            style={styles.button}
                            underlayColor='#99d9f4'>
                            <View style={styles.flowRight}>
                              <Text style={styles.buttonText}>Share </Text>
                              <Icon name="social-facebook" size={26} color="#FFFFFF" />
                            </View>
                          </TouchableHighlight>

                          <TouchableHighlight
                            onPress={this.pressSave.bind(this)}
                            style={styles.button}
                            underlayColor='#99d9f4'>
                            <View style={styles.flowRight}>
                              <Text style={styles.buttonText}>Save </Text>
                              <Icon name="bookmark" size={26} color="#FFFFFF" />
                            </View>
                          </TouchableHighlight>
                  </View>
        <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
        <View style={styles.fillerView}/>
      </View>
    );
  } 

  renderRow(ingredient) {
  return (
                <View style={styles.listPanel}>
                    <View style={styles.cellContainer}>
                        <Text style={styles.ingredients}>{ingredient}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
		);
	}

	addNewFavourite(recipeid, name, time, salty, sour, sweet, bitter, meaty, piquant) {     //all the flavor values are floats with range of 0.0 - 1.0
		var updateFavorites = function() {
			DB.favourites.get({id: recipeid}, (result) => {
				console.log(result);
				if (result.length == 0) {
					DB.favourites.add({id: recipeid, 
														 recipeName: name, 
														 totalTimeInSeconds: time, 
														 saltyValue: salty, 
														 sourValue: sour, 
														 sweetValue: sweet, 
														 bitterValue: bitter, 
														 meatyValue: meaty, 
														 piquantValue: piquant}, 
														 (result) => {
														console.log(result);
						}
					);
				
				} else {
					DB.favourites.update_id(result[0]._id, {recipeName: name, 
																					totalTimeInSeconds: time, 
																					saltyValue: salty, 
																					sourValue: sour, 
																					sweetValue: sweet, 
																					bitterValue: bitter, 
																					meatyValue: meaty, 
																					piquantValue: piquant}, (result) => {
						console.log(result);
					});
				}
			});
		}
		DB.preferences.get({key: 'areFavoritesUpdated'}, (result) => {
			if (result.length == 0) {
				DB.preferences.add({key: 'areFavoritesUpdated', value: true}, (result) => {
					updateFavorites();
				});
			} else {
				DB.preferences.update({key: 'areFavoritesUpdated'}, {value: true}, (result) => {
					updateFavorites();
				});
			}
		});
  } 
}

module.exports = RecipeView;