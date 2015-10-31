'use strict'

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var SearchResults = require('./SearchResults');
var Fetch = require('./Fetch');
var sample = require('./sample.json');
var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;

var background = 'http://iphonewallpapers-hd.com/wallpapers/cocktail_-640x1136.jpg';

var {
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	Component,
	TouchableHighlight,
	TextInput,
  Image,
  ActivityIndicatorIOS,
} = React;


var styles = StyleSheet.create({

	container: {
		flex: 1,
    marginTop: 64,

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
  paddingLeft: 5,
  marginRight: 5,
  flex: 3,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: 'rgba(20,50,87,1)',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
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
  alignSelf: 'center'
},

 mealTimeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    },

     searchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    },
    mealTimeTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(72,187,236,0.2)',
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

    fillerView: {
      height: 49,
    },
});

var resultCache = {
	recipes: sample.matches
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
      isLoading: false,
		};
	}

	render() {
		console.log('HomeView.render');
    var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
                                                  hidden='true'
                                                  size='large'/>):
                                          (<View/>);
		return (

  	    <View style={styles.container}>
				<Image source={{uri: background,}} style={styles.mealTimeContainer}>
        
        <BlurView blurType="dark" style={styles.searchContainer}>
        <View blurType="light" style={styles.searchContainer}>
        <View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this._onSearchTextChanged.bind(this)}
						placeholder='Quick food search'/>
					<TouchableHighlight 
						style={styles.button}
						underlayColor='#99d9f4'
						onPress={this._onSearchPress.bind(this)}>
						<Text style={styles.buttonText}>Search</Text>
					</TouchableHighlight>
				</View>
        {spinner}
        </View>
        </BlurView>
        

        <BlurView blurType="dark" style={styles.mealTimeContainer}>
				<TouchableHighlight 
            style={styles.mealTimeTextContainer}
    				underlayColor='#dddddd'
            onPress={() => this._onMealTimePress('breakfast')}>
    				<View style={styles.flowRightMealTime}>	
  						<Text style={styles.mealTimeText}>Breakfast </Text>

  						<Icon name="ios-arrow-right" size={40} color="#FFF" 
  						style={styles.mealTimeIcon}/>
  					</View>
				</TouchableHighlight>
        </BlurView>
				
         <BlurView blurType="dark" style={styles.mealTimeContainer}>
				<TouchableHighlight style={styles.mealTimeTextContainer}
    				underlayColor='#dddddd'
            onPress={() => this._onMealTimePress('lunch')}>
    				<View style={styles.flowRightMealTime}>	
  						<Text style={styles.mealTimeText}>Lunch</Text>
  						<Icon name="ios-arrow-right" size={40} color="#FFF" 
  						style={styles.mealTimeIcon}/>
  					</View>
				</TouchableHighlight>
        </BlurView>
				
         <BlurView blurType="dark" style={styles.mealTimeContainer}>
				<TouchableHighlight 
            style={styles.mealTimeTextContainer}
    				underlayColor='#dddddd'
            onPress={() => this._onMealTimePress('dinner')}>
  					<View style={styles.flowRightMealTime}>	
  						<Text style={styles.mealTimeText}>Dinner</Text>
  						<Icon name="ios-arrow-right" size={40} color="#FFF" 
  						style={styles.mealTimeIcon}/>
  					</View>
				</TouchableHighlight>
        </BlurView>

        <BlurView blurType="dark" style={styles.fillerView}>
          <View style={styles.fillerView}/>
        </BlurView>
        </Image>
			</View>

    );
	}

	_onSearchTextChanged(event){
		console.log('onSearchTextChanged');
		this.setState({searchString: event.nativeEvent.text});
		console.log(this.state.searchString);
	}

	_handleResponse(response){
    this.setState({isLoading: false,});
		this.props.navigator.push({
			component: SearchResults,
			passProps: {matches: response.matches}
		});
	}

	_executeQuery(query){
		console.log(query)
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

	_onSearchPress(){
		var query = this.state.searchString;
		this._executeQuery(query);
	}

  _onMealTimePress(mealtime){
    console.log(mealtime)
    this._executeQuery(mealtime);
  }

}

module.exports = HomeView;