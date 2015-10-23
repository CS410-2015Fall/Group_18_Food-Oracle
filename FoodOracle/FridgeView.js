'use strict'

var React = require('react-native');
var FridgeSample = require('./fridgesample.json');

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
	AsyncStorage
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

var FridgeView = React.createClass({

	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			dataSource: ds.cloneWithRows(resultCache.ingredients),
		};
	},
	
	render: function() {
		return (
			<View>
				<ListView
					dataSource = {this.state.dataSource}
        	renderRow = {this.renderList.bind(this)}
        	style = {styles.listView}
          automaticallyAdjustContentInsets = {true}
				/>
			</View>
		);
	},
	
	renderList: function(ingredients) {
		return (
			<TouchableOpacity /*onPress={() => this.showBookDetail(book)}*/>
				<View>
					<View style = {styles.cellContainer}>
						<View style = {styles.rightContainer}>
							<Text>{ingredients.id}</Text>
							<Text>{ingredients.quantity}</Text>
						</View>
					</View>
					<View style = {styles.separator} />
				</View>
			</TouchableOpacity>
		);
	}
	
});

module.exports = FridgeView;