'use strict'

var React = require('react-native');
var FridgeSample = require('./fridgesample.json');
var FMPicker = require('react-native-fm-picker');
var SearchResults = require('./SearchResults');

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
		height: 36,
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
		color: 'white',
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

var resultCache = {
	ingredients: FridgeSample.ingredients
} 

var INGREDIENT_QUANTITIES = ['high', 'low', 'empty'];

class FridgeView extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		this.state = {
			dataSource: ds.cloneWithRows(resultCache.ingredients),
			selectedIngredient: false,
		};
	}
	
	render() {
	var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
		hidden='true' size='large'/>) : (<View/>);
		return (
			<View style = {styles.container}>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {this.renderRow.bind(this)}
					automaticallyAdjustContentInsets = {true}
				/>
				<FMPicker ref = {'picker'}
					options = {INGREDIENT_QUANTITIES}
					onSubmit = {(option) => {}}
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
							<Text>{ingredient.id}</Text>
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
	
};

module.exports = FridgeView;