'use strict'

var React = require('react-native');
var FMPicker = require('react-native-fm-picker');
var Fetch = require('./Fetch');
var SearchResults = require('./SearchResults');
var VerificationView = require('./VerificationView');
var RefreshableListView = require('react-native-refreshable-listview')
var DB = require('./DB.js');
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
	PickerIOS,
	TextInput,
  Image,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(72,187,236,0.2)',
  },
  flowRight: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	alignSelf: 'stretch',
  	justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 49,

  },
  flowRightSearch: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	alignSelf: 'stretch',
  	justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },

  flowRightButtonLeft: {
		flexDirection: 'row',
		borderColor: 'rgba(72,187,236,0.5)',
		borderWidth: 1,
		borderRadius: 8,
		marginRight: 3,
		marginTop: 15,
		marginBottom: 10,
		height: 30,
    	width: 106,
		justifyContent: 'center',
		backgroundColor: 'rgba(20,56,86,0.8)',
 	},
 	flowRightButtonRight: {
		flexDirection: 'row',
		borderColor: 'rgba(72,187,236,0.5)',
		borderWidth: 1,
		borderRadius: 8,
		marginLeft: 3,
		marginTop: 15,
		marginBottom: 10, 
		height: 30,
    	width: 140,
		justifyContent: 'center',
		backgroundColor: 'rgba(20,56,86,0.8)',
 	},
	buttonSelect: {
		flexDirection: 'row',
		borderColor: 'rgba(20,56,86,0.8)',
		borderWidth: 2,
		borderRadius: 2,
		height: 33,
    	width: 30,
    	alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(72,187,236,0.5)',
 	},
 	buttonAdd: {
		flexDirection: 'row',
		borderColor: 'rgba(72,187,236,1)',
		borderWidth: 1,
		borderRadius: 8,
		height: 33,
    	width: 60,
    	alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(20,56,86,0.8)',
 	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Arial',
		color: 'white',
		alignSelf: 'center',
	},
	ingredientText: {
		fontSize:35,
		fontFamily: 'Arial',
		color: 'rgba(20,56,86,0.8)',
		alignSelf: 'center',
	},
	fridgeHeader: {
  		alignItems: 'center',
  		alignSelf: 'stretch',
  		justifyContent: 'center',
  		backgroundColor: 'rgba(20,56,86,0.8)',
	},
	fridgeHeaderText: {
		fontSize:25,
		fontFamily: 'Arial',
		color: 'white',
		alignSelf: 'center',
	},
	quantityText: {
		fontSize:20,
		fontFamily: 'Arial',
		color: 'rgba(20,56,86,0.8)',
		alignSelf: 'center',
	},
	buttonTextAdd: {
		fontSize: 25,
		fontFamily: 'Arial',
		color: 'white',
		alignSelf: 'center',
	},
	buttonContainer: {
		flex: 0.125,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: 'transparent',
		marginTop: 75,
		height: 100,
	},
	
	textContainer: {
		flex: 1
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	},
	cellContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(72,187,236,0.2)',
		padding: 20,
	},
	rightContainer: {
		flex: 1
	},
	textInput: {
		height: 35,
		paddingLeft: 5,
		marginRight: 5,
		flex: 2,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: 'rgba(20,50,87,1)',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	separator: {
		height: 2,
		backgroundColor: 'rgba(72,187,236,1)',
	},
	ingredientSeparator: {
		height: 2,
		width: 80,
		marginTop: 5,
		marginBottom: 5,
		alignSelf: 'center',
		backgroundColor: 'rgba(72,187,236,1)',
	},
	headerSeparator: {
		height: 2,
		alignSelf: 'stretch',
		backgroundColor: 'rgba(72,187,236,1)',
	},
	listPanel: {
		flex: 1,
		marginTop: 15,
	}
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

var INGREDIENT_QUANTITIES = ['high', 'low', 'empty'];

class FridgeView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isInitialized: false,
			ingredients: false,
			currentIngredient: false,
			isLoading: false,
			inputString: '',
		};
		this._refreshListView(() => {
			// DB.dictionary.erase_db((result) => {console.log(result);});
		}, []);
	}
	
	render() {
		DB.preferences.get({key: 'isFridgeUpdated'}, (result) => {
      if (result.length == 0) {
        DB.preferences.add({key: 'isFridgeUpdated', value: false}, (result) => {});
      } else if (result[0].value) {
        DB.preferences.update({key: 'isFridgeUpdated'}, {value: false}, (result) => {
          this._refreshListView(() => {}, []);
        });
      }
    });
		var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
		hidden='true' size='large'/>) : (<View/>);
		return (
			<View style = {styles.container}>
				<View style = {styles.buttonContainer}>
					<View style = {styles.flowRightSearch}>
						<TextInput
							style = {styles.textInput}
							value = {this.state.inputString}
							onChange = {this._onIngredientTextChanged.bind(this)}
							placeholder = 'Enter ingredient' />
						<TouchableHighlight 
							style = {styles.buttonAdd}
							underlayColor = '#99d9f4'
							onPress = {this._onAddPress.bind(this)}>
							<Text style = {styles.buttonTextAdd}>＋</Text>
						</TouchableHighlight>
					</View>
					<View style = {styles.fridgeHeader}>
						<View style = {styles.headerSeparator} />
						<Text style ={styles.fridgeHeaderText}>Ingredients</Text>
						<View style = {styles.headerSeparator} />
					</View>
				</View>
				{spinner}
				{this.state.isInitialized ? (
					<View style = {styles.listPanel}>
					<RefreshableListView
						dataSource = {ds.cloneWithRows(this.state.ingredients)}
						renderRow = {this.renderRow.bind(this)}
						loadData={this._refreshListView.bind(this)}
						automaticallyAdjustContentInsets = {false}
					/>
					</View>
				) : (<View/>)}
				<FMPicker ref = {'picker'}
					options = {INGREDIENT_QUANTITIES}
					onSubmit = {(option) => {
						if (option == 'empty') {
							DB.ingredients.remove_id(this.state.currentIngredient._id, (result) => {
								console.log(result);
								this._refreshListView(() => {}, []);
							});
						} else {
							DB.ingredients.update_id(this.state.currentIngredient._id, {quantity: option},
								(result) => {
									console.log(result);
									this._refreshListView(() => {}, []);
								}
							);
						}
					}}
				/>
				<View style = {styles.flowRight}>
						<TouchableHighlight
							style = {styles.flowRightButtonLeft}
							underlayColor = '#99d9f4'
							onPress = {this._onUnselectAllPress.bind(this)}>
							<Text style = {styles.buttonText}>Unselect All</Text>
						</TouchableHighlight>
						<TouchableHighlight 
							style = {styles.flowRightButtonRight}
							underlayColor = '#99d9f4'
							onPress = {this._onSearchPress.bind(this)}>
							<Text style = {styles.buttonText}>Search Selected</Text>
						</TouchableHighlight>
					</View>
			</View>
		);
	}
	
	renderRow(ingredient) {
		return (
			<TouchableOpacity onPress = {() => this.rowPressed(ingredient)}>
				<View>
					<View style = {styles.cellContainer}>
						<View style = {styles.rightContainer}>
							<Text style = {styles.ingredientText}>{ingredient.name}</Text>
							<View style = {styles.ingredientSeparator} />
							<Text style = {styles.quantityText}> quantity: {ingredient.quantity}</Text>
						</View>
						<TouchableHighlight 
							style = {styles.buttonSelect}
							underlayColor = '#99d9f4'
							onPress = {() => this._onSelectPress(ingredient)}>
							<Text style = {styles.buttonText}>
								{ingredient.isSelected ? '✔' : ''}
							</Text>
						</TouchableHighlight>
					</View>
					<View style = {styles.separator} />
				</View>
			</TouchableOpacity>
		);
	}
	
	rowPressed(ingredient) {
		this.setState({
			currentIngredient: ingredient,
		});
		this.refs.picker.show();
	}
	
	_onIngredientTextChanged(event) {
		this.setState({inputString: event.nativeEvent.text});
	}
	
	_onSearchPress() {
		var query = '';
		var x;
		var first = true;
		for (x in this.state.ingredients) {
			if (this.state.ingredients[x].isSelected) {
				if (first) {
					first = false;
				} else {
					query += ', ';
				}
				query += this.state.ingredients[x].name;
			}
		}
		this._executeQuery(query);
	}
	
	_onUnselectAllPress() {
		DB.ingredients.update({isSelected: true}, {isSelected: false}, (result) => {
			this._refreshListView(() => {}, []);
		});
	}
	
	_onAddPress() {
	
		var inputIngredients = this.state.inputString.split(/\,|\s+/);
		console.log('inputIngredients: ' + inputIngredients);
		this._NLP(inputIngredients, (noFound, foundIngredients) => {
			console.log('noFound: ' + noFound);
			console.log('foundIngredients: ' + foundIngredients);
			this._recursiveAddIngredients(foundIngredients, (noFound) => {
				console.log('-------after adding found ingredients-------');
				console.log(noFound);
				this._refreshListView(() => {
					this.setState({inputString: ''});
					if (noFound.length != 0) {
						this.props.navigator.push({
							component: VerificationView,
							passProps: {noFound: noFound}
						});
					}
				}, []);
			}, [noFound]);
		});
	}

	_NLP(words, callback) {
		var noFound = [];
		var foundIngredients = [];
		DB.dictionary.get_all((result) => {
			console.log(result);
			var dictWords = Object.keys(result.rows).map(key => result.rows[key].name);
			var i;
			for (i = 0; i < words.length; i++) {
				console.log(words[i]);
				if (dictWords.indexOf(words[i].toLowerCase()) == -1) {
					noFound.push(words[i]);
				} else {
					foundIngredients.push(words[i]);
				}
			}
			callback(noFound.filter(value => value != ''), foundIngredients.filter(value => value != ''));
		});
	}
	
	_recursiveAddIngredients(ingredients, func, args) {
    console.log("----------recursive add---------");
    console.log(ingredients + ', ' + args);
    if (ingredients.length != 0) {
      var ingredient = ingredients.splice(0, 1)[0].trim();
      if (ingredient != '') {
        DB.ingredients.get({name: ingredient}, (result) => {
            if (result.length == 0) {
              DB.ingredients.add({name: ingredient,
                quantity: 'high', isSelected: false}, (result) => {
                  this._recursiveAddIngredients(ingredients, func, args);
                }
              );
            } else {
              DB.ingredients.update_id(result[0]._id, {quantity: 'high'}, (result) => {
                this._recursiveAddIngredients(ingredients, func, args);
              });
            }
          }
        );
      } else {
        this._recursiveAddIngredients(ingredients, func, args);
      }
    } else {
    	console.log('------func-------');
    	console.log(args);
    	func.apply(this, args);
    }
  }

	_onSelectPress(ingredient) {
		DB.ingredients.update_id(ingredient._id, {isSelected: !(ingredient.isSelected)},
			(result) => {
				console.log(result);
				this._refreshListView(() => {}, []);
			}
		);
	}

	
	_handleResponse(response){
    this.setState({isLoading: false,});
		this.props.navigator.push({
			component: SearchResults,
			passProps: {matches: response.matches}
		});
	}

	_executeQuery(query){
		console.log(query);
    this.setState({isLoading: true});
		var handler = function(self, responseData) {
			resultCache.recipes = responseData.matches;
			sortByTime(resultCache.recipes);
			self._handleResponse(responseData);
		}
    var errorHandler = function(error) {
      this.setState({isLoading: false,});
      React.AlertIOS.alert(
				'Error',
				'There seems to be an issue connecting to the network.  ' + error
			);
    }
		var fetch = new Fetch(this);
		fetch.searchRequest(encodeURIComponent(query), handler, errorHandler);		
	}
	
	_refreshListView(func, args) {
		DB.ingredients.get_all((result) => {
			this.setState({
				isInitialized: true,
				ingredients: result.rows,
			});
			func.apply(this, args);
		});
	}
	
};

module.exports = FridgeView;