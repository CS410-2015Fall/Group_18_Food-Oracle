'use strict';
 
var React = require('react-native');
var FMPicker = require('react-native-fm-picker');

var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Component,
	PickerIOS,
	PickerItemIOS,
	TouchableOpacity 
} = React;

var styles = StyleSheet.create({
  container: {
  	flex: 1,
  	justifyContent: 'center',
        alignItems: 'center',
    marginTop: 65
  },
  instruction: {
  	fontSize: 18,
  	fontFamily: 'Arial',
  	color:'blue', 
  	marginTop: 20,
  },
  selectionText: {
  	fontSize: 20,
  	fontFamily: 'Arial',
  },
  display: {
  	fontSize: 30,
  	fontFamily: 'Arial',
  	marginTop: 20,
  }
});

var PickerItemIOS = PickerIOS.Item;

var options = ['none', 'american', 'italian', 'mexican', 'french', 'southwestern', 'indian', 
'chinese', 'english', 'mediterranean', 'greek', 'spanish', 'german', 'thai', 'moroccan'
,'irish', 'japanese', 'cuban','hawaiin','swedish','portugese'];

class PreferenceView extends Component {
	constructor(props){
		super(props);
		this.state = {
			cuisine: "none",
		};
	}

	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.selectionText}>
					Current cuisine choice:</Text>
				<Text style={styles.display}> {this.state.cuisine} </Text>
				<Text
					style={styles.instruction}
					onPress={()=>{
						this.refs.picker.show();
					}}>
					Click here to change choice
				</Text>
				<FMPicker ref={'picker'} 
					options={options}
                    onSubmit={(option)=>{
                        this.setState({cuisine: option})
                    }}
                    />
			</View>
		);
	}
}

module.exports = PreferenceView;