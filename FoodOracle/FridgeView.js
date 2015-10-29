'use strict'

var React = require('react-native');
var FridgeSample = require('./fridgesample.json');

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
			showIngredientEditor: false,
			selectedIngredient: false,
		};
	}
	
	render() {
		return (
			<View>
				<ListView
					dataSource = {this.state.dataSource}
        	renderRow = {this.renderRow.bind(this)}
        	style = {styles.listView}
          automaticallyAdjustContentInsets = {true}
				/>
				{this.state.showIngredientEditor ? (
					<View>
						<Text>Please choose the quantity of this ingredient:</Text>
						<PickerIOS
							selectedValue = {this.state.selectedIngredient.quantity}
							onValueChange = {(quantity) => {
								this.setState({showIngredientEditor: false})
								}
							}
						>
							{INGREDIENT_QUANTITIES.map(
								(quantity) => (
									<PickerIOS.Item
										key = {quantity}
										value = {quantity}
										label = {quantity}
									/>
								)
							)}
						</PickerIOS>
					</View>
				) : (<View/>)}
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
			showIngredientEditor: true,
		});
		console.log(this.state.selectedIngredient.id);
		console.log(this.state.showIngredientEditor);
	}
	
};

module.exports = FridgeView;