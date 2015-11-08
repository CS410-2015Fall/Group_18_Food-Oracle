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
		height: 35,
		flex: 0.0625,
		flexDirection: 'row',
		borderColor: 'rgba(72,187,236,0.2)',
		borderWidth: 1,
		borderRadius: 8,
		alignSelf: 'stretch',
		justifyContent: 'center',
		backgroundColor: 'rgba(72,187,236,0.2)',
		marginTop: 65,
 	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Arial',
		color: 'black',
		alignSelf: 'center',
	},
	searchContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: 'transparent',
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
			selectedIngredient: false,
			isLoading: false,
		};
		this._refreshListView();
	}
	
	render() {
		var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
		hidden='true' size='large'/>) : (<View/>);
		return (
			<View style = {styles.container}>
				<TouchableHighlight 
					style = {styles.button}
					underlayColor = '#99d9f4'
					onPress ={this._onSearchPress.bind(this)}>
					<Text style = {styles.buttonText}>Search for recipes</Text>
				</TouchableHighlight>
				<TouchableHighlight 
					style = {styles.button}
					underlayColor = '#99d9f4'
					onPress ={this._onAddPress.bind(this)}>
					<Text style = {styles.buttonText}>Add ingredient</Text>
				</TouchableHighlight>
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
							DB.ingredients.remove_id(this.state.selectedIngredient._id, (result) => {
								console.log(result);
								this._refreshListView();
							});
						} else {
							DB.ingredients.update_id(this.state.selectedIngredient._id,
								{name: this.state.selectedIngredient.name, quantity: option,
									checked:this.state.selectedIngredient.checked},
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
					</View>
					<View style = {styles.separator} />
				</View>
			</TouchableOpacity>
		);
	}
	
	rowPressed(ingredient) {
		this.setState({
			selectedIngredient: ingredient,
		});
		this.refs.picker.show();
	}
	
	_onSearchPress() {
		var query = 'onions, chicken, mushrooms';
		this._executeQuery(query);
	}
	
	_onAddPress() {
		DB.ingredients.add({name: 'test', quantity: 'high', checked: false}, (result) => {
			console.log(result);
			this._refreshListView();
		});
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