'use strict';
 
var React = require('react-native');
var KDSocialShare = require('NativeModules').KDSocialShare;
var Icon = require('react-native-vector-icons/Ionicons');
var Browser = require('react-native-browser');
var Lightbox = require('react-native-lightbox');

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(72,187,236,0.3)',
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
    width: 170,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#48BBEC',
    borderWidth: 2,
  },

  title: {
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },

  description: {
    fontSize: 20,
    margin: 5,
    color: '#656565',
    paddingLeft: 25,
    paddingRight: 25,
  },

  button: {
    height: 30,
    width: 170,
  flexDirection: 'row',
  backgroundColor: 'rgba(0,0,0,0.5)',
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
flowRightButtons: {
  flexDirection: 'row',
  backgroundColor: 'rgba(0,0,0,0)',
  marginTop: 175,
  marginRight: 25,
  marginLeft: 25,
  marginBottom: 50,
  justifyContent: 'center',
  borderRadius: 8,
},
 cellContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F5FCFF',
        width: 400,
        height: 70,
        backgroundColor: 'rgba(0,0,0,0)'
    },

  ingredients: {
    flex: 1,
  },
  fillerView: {
      height: 49,
    },
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
            <Lightbox navigator={this.navigator}>
            <Image style={styles.backdropImage} 
              source={{uri: recipe.images[0]['hostedLargeUrl']}}>
                  <View style={styles.backdropView}>
                    <Text style={styles.title}>{recipe.name}</Text>
                  </View>
              
                  <View style={styles.flowRightButtons}>
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
            </Image>
            </Lightbox>
        </View> 
          
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
          
        <View style={styles.fillerView}/>
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

module.exports = RecipeView;