'use strict'

var React = require('react-native');
var FridgeSample = require('./fridgesample.json');
var FMPicker = require('react-native-fm-picker');

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
} = React;

var styles = StyleSheet.create({
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
		return (
			<View>
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