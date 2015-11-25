'use strict'

var COMMONWORDS = ["I", "have", "some", "and", "also", "a", "too", "in", "my", "fridge", "refridgerator"];
var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
//var Favouritesamples = require('./favouritesamples.json');
//var Fetch = require('./Fetch');
//var RecipeView = require('./RecipeView');
var DB = require('./DB.js');
//var Recommender = require('./Recommender');
//var SearchResults = require('./SearchResults');

var {
  Component,
	StyleSheet,
	NavigatorIOS,
	View,
	Text,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
  },
	topMargin: {
		marginTop: 65,
		
	},
	cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 30,


    },
    rightContainer: {
    	flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    button: {
      position: 'absolute',
      right: 10,
      width: 90,
      flex: 1,
      flexDirection: 'row',
      borderColor: 'rgba(72,187,236,0.2)',
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(72,187,236,0.2)',
    },
    buttonText: {
      fontSize: 16,
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
		button2: {
			flex: 1,
			flexDirection: 'row',
			borderColor: 'rgba(72,187,236,0.2)',
			borderWidth: 1,
			borderRadius: 8,
			alignSelf: 'stretch',
			justifyContent: 'center',
			backgroundColor: 'rgba(72,187,236,0.2)',
		},
		flowRight: {
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'stretch',
			marginLeft: 10,
			marginRight: 10,
		},
});

var resultCache = {
	recipes: Favouritesamples.favourites
} 



var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

var datasourceInput = [];




class VerificationView extends Component {



    constructor(props) {
    super(props);
    this.state = {
      //dataSource: ds.cloneWithRows(this.props.noFound)  
    };
    this._refreshListView();

  }
  getInitialState(){
    this._refreshListView();
  }

  render(){
    filterCommonWords();
		return (
			<View style = {styles.container}>
				<View style = {styles.buttonContainer}>
					<View style = {styles.flowRight}>
						<TouchableHighlight
							style = {styles.button2}
							underlayColor = '#99d9f4'
							onPress = {() => _refreshListView()}> 
							<Text style = {styles.buttonText}>
								Recommend recipes
							</Text>
						</TouchableHighlight>
					</View>
        </View>
				<ListView
                dataSource={ds.cloneWithRows(datasourceInput)}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={true}
                
                />
          </View>
			);
	}
    //  if manual, instead of automaticallyAdjustContentInsets: contentInset={{top:65, bottom:-10}}
	

    //() => this.rowPressed(recipe.id)   // onPress
    // () => this._onDeletePress(recipe.id)  //onPress


      renderList(recipe){  
  		return (
  			<TouchableOpacity onPress={}>
                <View>
                    <View style={styles.cellContainer}>
                        <View style={styles.rightContainer}>
                    		<Text>{recipe.recipeName}</Text>
                        	<Text>{recipe.totalTimeInSeconds/60} Minutes</Text>
                        </View>
                            <TouchableHighlight 
                                style = {styles.button}
                                underlayColor = '#99d9f4'
                                onPress = {}>
                                <Text style = {styles.buttonText}>
                                    Delete
                                </Text>
                             </TouchableHighlight>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
  			);
  	}
  	
  rowPressed(recipeID){
        this._executeQuery(recipeID); 

  }

  filterCommonWords(){
    var input = this.props.noFound;
    for (i=0, i<input.length, i++){
          var COMMONWORDS_index = COMMONWORDS.indexOf(input[i].toLowerCase());
          if(COMMONWORDS_index == -1){
            //add to datasource
            datasourceInput.push(input[i].toLowerCase());
          }

    }
  }

  _onDeletePress(ingredientName){
    DB.favourites.remove({name: recipeID}, (result) => {
    	console.log('_onDeletePress');
      console.log(result);
      this._refreshListView();
    });
  }
  





  /*
      this.props.navigator.push({
      component: SearchResults,
      passProps: {matches: response.matches}
    });
  */


    _refreshListView() {
    DB.favourites.get_all((result) => {
    	console.log('_refreshListView');
      console.log(result);
      this.setState({
        
      });
    });
  }

    


  };	



module.exports = VerificationView;


