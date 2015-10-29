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
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565',
    marginRight: 75,
    marginLeft: 25
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
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
flowRight: {
  flexDirection: 'row',
}
});

class RecipeView extends Component{
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

      <ScrollView style={styles.container}>
        
        <View style={styles.heading}>
          <Image style={styles.image} 
            source={{uri: recipe.images[0]['hostedLargeUrl']}} />
        </View>

        <View style={styles.separator}/>

        <View style={styles.flowRight}>
          <Text style={styles.title}>{recipe.name}</Text>
          <TouchableHighlight 
            onPress={this.pressSource.bind(this)}
            underlayColor='#dddddd'>
            <Icon name="ios-heart-outline" size={35} color="#48BBEC"/>
          </TouchableHighlight>
        </View>
        <View style={styles.separator}/>

        <Text style={styles.description}>{recipe.ingredientLines}</Text>
        
        <View style={styles.separator}/>

        <TouchableHighlight 
          onPress={this.pressSource.bind(this)}
          style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Show Source</Text>
        </TouchableHighlight>

        <View style={styles.separator}/>
        
        <TouchableHighlight
          onPress={this.pressShare.bind(this)}
          style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Share on Facebook</Text>
        </TouchableHighlight>

      </ScrollView>
    );
  } 
}

module.exports = RecipeView;