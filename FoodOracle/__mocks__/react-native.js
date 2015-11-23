var React = require('react/addons');
var ReactNative = React;
 
ReactNative.StyleSheet = {
    create: function(styles) {
        return styles;
    }
};
 
//Yup, quite naive
class View extends React.Component {}
class Text extends React.Component {}
 
ReactNative.View = View;
ReactNative.Text = Text;
ReactNative.TouchableWithoutFeedback = View;
 
module.exports = ReactNative;