'use strict'

var COMMONWORDS = ["i", "have", "some", "and", "also", "a", "too", "in", "my", "fridge", "refridgerator", "no", "couple", "of"];
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
  TextInput,
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
      button1: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'rgba(72,187,236,0.2)',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(72,187,236,0.2)',
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
			marginTop: 0,
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
      textInput: {
    height: 35,
    paddingLeft: 5,
    marginRight: 5,
    flex: 2,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: 'rgba(20,50,87,1)',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

});

var resultCache = {
	recipes: false
} 



var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

var datasourceInput = [];




class VerificationView extends Component {



    constructor(props) {
    super(props);
    this.state = {
    };

    this.filterCommonWords();
    this._refreshListView();

  }
  getInitialState(){
        this.filterCommonWords();
    this._refreshListView();

  }

  render(){
  	//console.log(this.props.noFound);

		return (
			<View style = {styles.container}>

				<ListView
                dataSource={ds.cloneWithRows(datasourceInput)}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={true}/>
        <View style = {styles.buttonContainer}>
          <View style = {styles.flowRight}>
            <TextInput
              style = {styles.textInput}
              value = {this.state.inputString}
              onChange = {this._onIngredientTextChanged.bind(this)}
              placeholder = 'Enter ingredient' />
            <TouchableHighlight 
              style = {styles.button1}
              underlayColor = '#99d9f4'
              onPress = {this._addPressed.bind(this)}>
              <Text style = {styles.buttonText}>Add</Text>
            </TouchableHighlight>
          </View>
          </View>
                        <View style = {styles.buttonContainer}>
          <View style = {styles.flowRight}>
            <TouchableHighlight
              style = {styles.button2}
              underlayColor = '#99d9f4'
              onPress = {() => this._okPressed()}> 
              <Text style = {styles.buttonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        </View>
			);
	}
    //  if manual, instead of automaticallyAdjustContentInsets: contentInset={{top:65, bottom:-10}}
	

    //() => this.rowPressed(recipe.id)   // onPress
    // () => this._onDeletePress(recipe.id)  //onPress


      renderList(word){  
  		return (
  			<TouchableOpacity onPress={() => {}}>
                <View>
                    <View style={styles.cellContainer}>
                        <View style={styles.rightContainer}>
                    		<Text>{word}</Text>
                        </View>
                            <TouchableHighlight 
                                style = {styles.button}
                                underlayColor = '#99d9f4'
                                onPress = {() => this._onDeletePress(word)}>
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
  	


    _addPressed(){
      var inputAdd = this.state.inputString;
      datasourceInput.push(inputAdd);
      this._refreshListView();
    }

  filterCommonWords(){
    console.log("-------------- filter running -----------------");
    var input = this.props.noFound;
    var i;
    datasourceInput = [];
    for (i=0; i<input.length; i++) {
          var COMMONWORDS_index = COMMONWORDS.indexOf(input[i].toLowerCase());
          if(COMMONWORDS_index == -1){
            //add to datasource
            datasourceInput.push(input[i].toLowerCase());
            console.log(i);
            console.log(datasourceInput);
          }

    }
    console.log(datasourceInput);
  }

  _onDeletePress(ingredientName){
    console.log("---------------delete pressed-------------------");
    console.log(ingredientName);
    var index = datasourceInput.indexOf(ingredientName);
    if (index >-1){
      datasourceInput.splice(index, 1);
    }

    this._refreshListView();
  }
  
  _okPressed(){

    this._recursiveAddIngredients(datasourceInput);
    DB.ingredients.get_all((result) => {
      console.log("----------DB RESULT---------");
      console.log(result);
    });
      this.props.navigator.pop({
      //component: SearchResults,
      //passProps: {matches: response.matches}
    });
  }

    _recursiveAddIngredients(ingredients) {
    console.log("----------recursive add---------");
    console.log(ingredients);
    if (ingredients.length != 0) {
      var ingredient = ingredients.splice(0, 1)[0].trim();
      if (ingredient != '') {
        DB.ingredients.get({name: ingredient}, (result) => {
            if (result.length == 0) {
              DB.ingredients.add({name: ingredient,
                quantity: 'high', isSelected: false}, (result) => {
                  //this._refreshListView(this._recursiveAddIngredients, [ingredients]);
                }
              );
            } else {
              DB.ingredients.update_id(result[0]._id, {quantity: 'high'}, (result) => {
                //this._refreshListView(this._recursiveAddIngredients, [ingredients]);
              });
            }
          }
        );
      } else {
        this._recursiveAddIngredients(ingredients);
      }
    }
  }

  _onIngredientTextChanged(event) {
    this.setState({inputString: event.nativeEvent.text});
  }



  /*

  */


    _refreshListView() {      
      this.setState({
      });

  }

    


  };	



module.exports = VerificationView;


