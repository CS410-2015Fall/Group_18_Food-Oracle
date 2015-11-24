'use strict'

var React = require('react-native');
var FMPicker = require('react-native-fm-picker');
var Fetch = require('./Fetch');
var SearchResults = require('./SearchResults');
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
	PickerIOS,
	TextInput,
  Image,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
  },
  flowRight: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
	button: {
		flex: 1,
		flexDirection: 'row',
		borderColor: 'rgba(72,187,236,0.2)',
		borderWidth: 1,
		borderRadius: 8,
		alignSelf: 'stretch',
		justifyContent: 'center',
		backgroundColor: 'rgba(72,187,236,0.2)',
 	},
	buttonText: {
		fontSize: 18,
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
	fillerView: {
    height: 49,
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
		backgroundColor: '#F5FCFF',
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
		height: 1,
		backgroundColor: '#dddddd',
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
		this._refreshListView(() => {}, []);
	}
	
	render() {
		var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
		hidden='true' size='large'/>) : (<View/>);
		return (
			<View style = {styles.container}>
				<View style = {styles.buttonContainer}>
					<View style = {styles.flowRight}>
						<TextInput
							style = {styles.textInput}
							value = {this.state.inputString}
							onChange = {this._onIngredientTextChanged.bind(this)}
							placeholder = 'Enter ingredient' />
						<TouchableHighlight 
							style = {styles.button}
							underlayColor = '#99d9f4'
							onPress = {this._onAddPress.bind(this)}>
							<Text style = {styles.buttonText}>Add</Text>
						</TouchableHighlight>
					</View>
					<View style = {styles.flowRight}>
						<TouchableHighlight
							style = {styles.button}
							underlayColor = '#99d9f4'
							onPress = {this._onUnselectAllPress.bind(this)}>
							<Text style = {styles.buttonText}>Unselect All</Text>
						</TouchableHighlight>
						<TouchableHighlight 
							style = {styles.button}
							underlayColor = '#99d9f4'
							onPress = {this._onSearchPress.bind(this)}>
							<Text style = {styles.buttonText}>Search recipes</Text>
						</TouchableHighlight>
					</View>
				</View>
				{spinner}
				{this.state.isInitialized ? (
					<ListView
						dataSource = {ds.cloneWithRows(this.state.ingredients)}
						renderRow = {this.renderRow.bind(this)}
						automaticallyAdjustContentInsets = {true}
					/>
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
			</View>
		);
	}
	
	renderRow(ingredient) {
		return (
			<TouchableOpacity onPress = {() => this.rowPressed(ingredient)}>
				<View>
					<View style = {styles.cellContainer}>
						<View style = {styles.rightContainer}>
							<Text>{ingredient.name}</Text>
							<Text>{ingredient.quantity}</Text>
						</View>
						<TouchableHighlight 
							style = {styles.button}
							underlayColor = '#99d9f4'
							onPress = {() => this._onSelectPress(ingredient)}>
							<Text style = {styles.buttonText}>
								{ingredient.isSelected ? 'Unselect' : 'Select'}
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
		var inputIngredients = this.state.inputString.split(/\s*\,\s*/);
		console.log(inputIngredients);
		var x;
		this._recursiveAddIngredients(inputIngredients);
		this.setState({inputString: ''});
	}
	
	_recursiveAddIngredients(ingredients) {
		console.log(ingredients);
		if (ingredients.length != 0) {
			var ingredient = ingredients.splice(0, 1)[0].trim();
			if (ingredient != '') {
				DB.ingredients.get({name: ingredient}, (result) => {
						if (result.length == 0) {
							DB.ingredients.add({name: ingredient,
								quantity: 'high', isSelected: false}, (result) => {
									this._refreshListView(this._recursiveAddIngredients, [ingredients]);
								}
							);
						} else {
							DB.ingredients.update_id(result[0]._id, {quantity: 'high'}, (result) => {
								this._refreshListView(this._recursiveAddIngredients, [ingredients]);
							});
						}
					}
				);
			} else {
				this._recursiveAddIngredients(ingredients);
			}
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