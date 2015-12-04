'use strict'

var COMMONWORDS = ["i", "have", "some", "and", "add", "the", "please", " ", "  ", "also", "a", "too", "to", "ohhh", "in", "my", "fridge", "refridgerator", "no", "couple", "of", "can", "you", "us", "please", "thanks", "some", "bunch", "but", "with", "whole", "tonnes", "got", "i've", "i'm","we", "we'll", "whatever", "whenever", "him", "her", "my", "is","at", "husband", "boyfriend", "girlfriend", "brother", "sister", "mother", "wife", "cousin", "grandmother", "grandfather", "papa", "mama", "food", "oracle", "hello", "hi", "goodday", "good", "morning", "evening", "night", "lunch", "dinner"];
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
    backgroundColor: 'rgba(74,255,160,0.4)',
  },
	topMargin: {
		marginTop: 65,
		
	},

 cellContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
    rightContainer: {
    	flex: 1
    },
    separator: {
    height: 2,
    backgroundColor: 'rgba(72,187,236,0.4)',
  },
      buttonAdd: {
    flexDirection: 'row',
    borderColor: 'rgba(72,187,236,1)',
    borderWidth: 1,
    borderRadius: 8,
    height: 33,
      width: 60,
      alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,56,86,0.8)',
  },
    
    buttonRemove: {
      flexDirection: 'row',
      alignSelf: 'stretch',
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 35,
    },

    buttonAddListed: {
      flex: 1,
      flexDirection: 'row',
      borderColor: 'rgba(72,187,236,0.5)',
      borderWidth: 2,
      borderRadius: 8,
      width: 130,
      height: 30,
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'rgba(20,56,86,0.8)',
    },

    buttonText: {
      fontSize: 23,
      fontFamily: 'Arial',
      color: 'white',
      alignSelf: 'center',
    },
    buttonContainer: {
			flex: 0.0833,
			justifyContent: 'center',
			alignItems: 'center',
			alignSelf: 'stretch',
			backgroundColor: 'transparent',
			marginTop: 0,
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
  ingredientText: {
    fontSize:35,
    fontFamily: 'Arial',
    color: 'rgba(20,56,86,0.8)',
    alignSelf: 'center',
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
    	inputString: '',
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
        <View style={styles.separator} />
				<ListView
                dataSource={ds.cloneWithRows(datasourceInput)}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={true}/>
        <View style={styles.separator} />
        <View style = {styles.buttonContainer}>
        
          <View style = {styles.flowRight}>
            <TextInput
              style = {styles.textInput}
              value = {this.state.inputString}
              onChange = {this._onIngredientTextChanged.bind(this)}
              placeholder = 'Enter additional ingredient' />
            <TouchableHighlight 
              style = {styles.buttonAdd}
              underlayColor = '#99d9f4'
              onPress = {this._addPressed.bind(this)}>
              <Text style = {styles.buttonText}>＋</Text>
            </TouchableHighlight>
          </View>
          </View>
                        <View style = {styles.buttonContainer}>
          <View style = {styles.flowRight}>
            <TouchableHighlight
              style = {styles.buttonAddListed}
              underlayColor = '#99d9f4'
              onPress = {() => this._okPressed()}> 
              <Text style = {styles.buttonText}>
                Add Ingredients Listed
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
                    		<Text style = {styles.ingredientText}>{word}</Text>
                        </View>
                            <TouchableHighlight 
                                style = {styles.buttonRemove}
                                underlayColor = '#99d9f4'
                                onPress = {() => this._onDeletePress(word)}>
                                <Icon name="trash-a" size={42} color='rgba(20,56,86,0.8)' />
                             </TouchableHighlight>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
  			);
  	}
  	


    _addPressed(){
      var inputAdd = this.state.inputString;
      if (inputAdd != '') {
      	datasourceInput.push(inputAdd);
      	this._refreshListView();
      }
    }

  filterCommonWords(){
    console.log("-------------- filter running -----------------");
    var input = this.props.noFound;
    console.log(input);
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
                	DB.dictionary.add({name: ingredient}, (result) => {
                		console.log(result);
                		this._recursiveAddIngredients(ingredients);
                	});
                }
              );
            } else {
              DB.ingredients.update_id(result[0]._id, {quantity: 'high'}, (result) => {
                DB.dictionary.add({name: ingredient}, (result) => {
									console.log(result);
									this._recursiveAddIngredients(ingredients);
								});
              });
            }
          }
        );
      } else {
        this._recursiveAddIngredients(ingredients);
      }
    } else {
    	DB.preferences.get({key: 'isFridgeUpdated'}, (result) => {
				if (result.length == 0) {
					DB.preferences.add({key: 'isFridgeUpdated', value: true}, (result) => {
						this.props.navigator.pop();
					});
				} else {
					DB.preferences.update({key: 'isFridgeUpdated'}, {value: true}, (result) => {
						this.props.navigator.pop();
					});
				}
			});
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


