'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var SearchResults = require('./SearchResults');
var Fetch = require('./Fetch')
var sample = require('./sample.json')
var appID = "4cab9c6f";
var appKey = "d6a77b248298d4344b36a76d680c7cd5";
var baseURL = "http://api.yummly.com/v1/api/recipes?";

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
    marginTop: 64,
    marginBottom: 49,
  },

  flowRight: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
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
        height: 1,
        backgroundColor: '#dddddd'
    },
});

var resultCache = {
	recipes: sample.matches
} 

function urlForQuery (kvalue){
	
	var querystring = encodeURIComponent(value);
		

		return baseURL + querystring;
}

var sortByTime = function(item){
  	item.sort(compare);
}

var compare = function(a, b){
  		if (a.totalTimeInSeconds < b.totalTimeInSeconds)
    		return -1;
  		if (a.totalTimeInSeconds > b.totalTimeInSeconds)
    		return 1;
  		return 0;
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

	_handleResponse(response){
		this.props.navigator.push({
			component: SearchResults,
			passProps: {matches: response.matches}
		});
	}

	_executeQuery(query){
		console.log(query)
		var handler = function(self, responseData) {
			resultCache.recipes = responseData.matches;
			sortByTime(resultCache.recipes);
			self._handleResponse(responseData);
		}
		var fetch = new Fetch(this);
		fetch.searchRequest(encodeURIComponent(query), handler);		
	}

	onSearchPressed(){
		console.log('Search Food, will connect to Fetch Later');
		var query = this.state.searchString;
		this._executeQuery(query);
	}
}



module.exports = HomeView;