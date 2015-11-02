'use strict';
 
var React = require('react-native');
var FMPicker = require('react-native-fm-picker');
var DB = require('./DB.js');

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
  	color:'rgba(20,50,87,1)', 
  	marginTop: 20,
  },
  selectionText: {
  	fontSize: 20,
  	fontFamily: 'Arial',
  	color: 'rgba(20,50,87,1)',
  },
  display: {
  	fontSize: 30,
  	fontFamily: 'Arial',
  	marginTop: 20,
  	color: 'rgba(20,50,87,1)',
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
			cuisine: '',
		};
		DB.preferences.get({key: 'cuisine'}, (result) => {
			if (result.length == 0) {
				DB.preferences.add({key: 'cuisine', value: 'none'}, (result) => {
					console.log(result);
					this.setState({cuisine: result[0].value});
				});
			}
			console.log(result);
			this.setState({cuisine: result[0].value});
		});
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
                        this.setState({cuisine: option});
                        DB.preferences.update({key: "cuisine"}, {value: option},
                        	(result) => {console.log(result)});
                    }}
                    />
			</View>
		);
	}
}

module.exports = PreferenceView;