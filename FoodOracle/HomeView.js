'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var SearchResults = require('./SearchResults');
var sample = require('./sample.json')

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	Component,
	TouchableHighlight,
	TextInput
} = React;


var styles = StyleSheet.create({

	container: {
		flex: 1,
    marginTop: 65,
  },

  flowRight: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	alignSelf: 'stretch'
  },

  flowRightMealTime: {
  	flex: 1,
  	flexDirection: 'row',
  },

  searchInput: {
  height: 36,
  marginRight: 5,
  flex: 3,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC',
  justifyContent: 'center'
},

button: {
  	height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  alignSelf: 'stretch',
  justifyContent: 'center'
 },

 buttonText: {
  fontSize: 18,
  fontFamily: 'Arial',
  color: 'white',
  alignSelf: 'center'
},

 mealTimeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#58C4FA',
        alignSelf: 'stretch'
    },
   mealTimeText: {
   	flex: 4,
   	color: '#FFFFFF',
   	fontSize: 25,
   	fontFamily: 'Arial',
   	marginRight: 10,
   	marginLeft: 50

   },

   mealTimeIcon: {
   		flex: 1
   },

 separator: {
        height: 2,
        backgroundColor: '#dddddd'
    },
});

var resultCache = {
	recipes: sample.matches
} 

class HomeView extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchString: '',
		};
	}

	render() {
		console.log('HomeView.render');
		return (
  	    <View style={styles.container}>

				<View style={styles.separator} />
				<View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this.onSearchTextChanged.bind(this)}
						placeholder='Quick food search'/>
					<TouchableHighlight 
						style={styles.button}
						underlayColor='#99d9f4'
						onPress={this.onSearchPressed.bind(this)}>
						<Text style={styles.buttonText}>Search</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.separator} />
				<TouchableHighlight style={styles.mealTimeContainer}
    				underlayColor='#dddddd'>
    				<View style={styles.flowRightMealTime}>	
  						<Text style={styles.mealTimeText}>Breakfast</Text>
  						<Icon name="ios-arrow-right" size={40} color="#FFF" 
  						style={styles.mealTimeIcon}/>
  					</View>
				</TouchableHighlight>
				
				<View style={styles.separator} />
				
				<TouchableHighlight style={styles.mealTimeContainer}
    				underlayColor='#dddddd'>
    				<View style={styles.flowRightMealTime}>	
  						<Text style={styles.mealTimeText}>Lunch</Text>
  						<Icon name="ios-arrow-right" size={40} color="#FFF" 
  						style={styles.mealTimeIcon}/>
  					</View>
				</TouchableHighlight>

				<View style={styles.separator} />
				
				<TouchableHighlight style={styles.mealTimeContainer}
    				underlayColor='#dddddd'>
  					<View style={styles.flowRightMealTime}>	
  						<Text style={styles.mealTimeText}>Dinner</Text>
  						<Icon name="ios-arrow-right" size={40} color="#FFF" 
  						style={styles.mealTimeIcon}/>
  					</View>
				</TouchableHighlight>
				<View style={styles.separator} />
			</View>

        );
	}

	onSearchTextChanged(event){
		console.log('onSearchTextChanged');
		this.setState({searchString: event.nativeEvent.text});
		console.log(this.state.searchString);
	}

	_executeQuery(query){
		console.log(query)
		this.props.navigator.push({
				title: 'Matching Recipes',
				component: SearchResults,
				passProps: {matches: resultCache.recipes}
			});

	}

	onSearchPressed(){
		console.log('Search Food, will connect to Fetch Later');
		var query = this.state.searchString;
		this._executeQuery(query);
	}
}

module.exports = HomeView;