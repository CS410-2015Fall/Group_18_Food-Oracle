'use strict'

var React = require('react-native');
var FridgeSample = require('./fridgesample.json');
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
	separator: {
			height: 1,
			backgroundColor: '#dddddd'
	},
});

var sampleIngredients = {
	ingredients: FridgeSample.ingredients
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
		};
		this._refreshListView();
	}
	
	render() {
		var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
		hidden='true' size='large'/>) : (<View/>);
		return (
			<View style = {styles.container}>
				<View style = {styles.buttonContainer}>
					<TouchableHighlight 
						style = {styles.button}
						underlayColor = '#99d9f4'
						onPress = {this._onSearchPress.bind(this)}>
						<Text style = {styles.buttonText}>Search for recipes</Text>
					</TouchableHighlight>
					<TouchableHighlight 
						style = {styles.button}
						underlayColor = '#99d9f4'
						onPress = {this._onAddPress.bind(this)}>
						<Text style = {styles.buttonText}>Add ingredient</Text>
					</TouchableHighlight>
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
								this._refreshListView();
							});
						} else {
							DB.ingredients.update_id(this.state.currentIngredient._id,
								{name: this.state.currentIngredient.name, quantity: option,
									isSelected: this.state.currentIngredient.isSelected},
								(result) => {
									console.log(result);
									this._refreshListView();
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
	
	_onSearchPress() {
		var query = 'onions, chicken, mushrooms';
		this._executeQuery(query);
	}
	
	_onAddPress() {
		DB.ingredients.add({name: 'test', quantity: 'high', isSelected: false}, (result) => {
			console.log(result);
			this._refreshListView();
		});
	}
	
	_onSelectPress(ingredient) {
		DB.ingredients.update_id(ingredient._id,
			{name: ingredient.name, quantity: ingredient.quantity, isSelected: !(ingredient.isSelected)},
			(result) => {
				console.log(result);
				this._refreshListView();
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
	
	_refreshListView() {
		DB.ingredients.get_all((result) => {
			console.log(result);
			this.setState({
				isInitialized: true,
				ingredients: result.rows,
			});
		});
	}
	
};

module.exports = FridgeView;