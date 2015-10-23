'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Image, 
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65
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
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

class RecipeView extends Component{
	render() {
    var recipe = this.props.recipe;  
      return (
      <View style={styles.container}>
        <Image style={styles.image} 
            source={{uri: recipe.imageUrlsBySize['90']}} />
        <View style={styles.heading}>
          <Text style={styles.title}>{recipe.recipeName}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>Rating {recipe.rating}</Text>
        <Text style={styles.description}>{recipe.ingredients}</Text>
      </View>
    );
  } 
}

module.exports = RecipeView;