'use strict';
 
var React = require('react-native');
var KDSocialShare = require('NativeModules').KDSocialShare;
var Icon = require('react-native-vector-icons/Ionicons');
var Browser = require('react-native-browser');

var {
  StyleSheet,
  Image, 
  View,
  Text,
  Component,
  TouchableHighlight,
  ListView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    marginBottom: 49,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  heading: {
    backgroundColor: '#F8F8F8',
  },

  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },

  backdropImage: {
    width: 400,
    height: 300
  },

  backdropView: {
    marginTop: 25,
    marginLeft: 25,
    width: 180,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  title: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    borderColor: '#656565',
    borderWidth: 2,
  },

  description: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },

  button: {
    height: 30,
    width: 180,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  justifyContent: 'center',
  marginRight: 5,
  marginLeft: 10,
 },

 buttonText: {
  fontSize: 18,
  fontFamily: 'Arial',
  color: 'white',
  alignSelf: 'center'
},
flowRight: {
  flexDirection: 'row',
  backgroundColor: 'rgba(0,0,0,0.3)',
},
 cellContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: 400,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.)'
    },

  ingredients: {
    flex: 1,
  }
});

class RecipeView extends Component{
  
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    var recipe = this.props.recipe;
    this.state = {
      dataSource: ds.cloneWithRows(recipe.ingredientLines),
    };
  }

  pressShare(){
    var object = {};
    var recipe = this.props.recipe;
    object["link"] = recipe.source.sourceRecipeUrl;
    object["imagelink"] = recipe.images["0"].hostedMediumUrl;
    
    KDSocialShare.shareOnFacebook(object,
      (results) => {
        console.log(results);
      }
    );
  }

  pressSource(){
    var recipe = this.props.recipe;
    Browser.open(recipe.source.sourceRecipeUrl, {
                navigationButtonsHidden: false,
                showActionButton: false,
                showPageTitles: false,
                disableContextualPopupMenu: true,
                hideWebViewBoundaries: true
                });
  }

	render() {
    var recipe = this.props.recipe;  
    console.log(recipe.images[0]['hostedLargeUrl'])
      return (

      <View style={styles.container}>
        
        <View style={styles.heading}>
          <Image style={styles.backdropImage} 
            source={{uri: recipe.images[0]['hostedLargeUrl']}}>
              <View style={styles.backdropView}>
                <Text style={styles.title}>{recipe.name}</Text>
              </View>
            </Image>
        </View>

        <View style={styles.separator}/>
        <View style={styles.flowRight}>
        <TouchableHighlight 
          onPress={this.pressSource.bind(this)}
          style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Show Source</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
          onPress={this.pressShare.bind(this)}
          style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Share on Facebook</Text>
        </TouchableHighlight>
        </View>
        <View style={styles.separator}/>

        <View style={styles.ingredients}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
        </View>

      </View>
    );
  }

  renderRow(ingredient) {
  return (
                <View>
                    <View style={styles.cellContainer}>
                        <Text style={styles.description}>{ingredient}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
  );
} 
}


        /*<View style={styles.flowRight}>
          <TouchableHighlight 
            onPress={this.pressShare.bind(this)}
            underlayColor='#dddddd'>
            <Icon name="ios-heart-outline" size={35} color="#48BBEC"/>
          </TouchableHighlight>
        </View>
        <View style={styles.separator}/>*/

module.exports = RecipeView;