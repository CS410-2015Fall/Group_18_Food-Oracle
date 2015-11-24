jest.dontMock('../index.ios');
jest.setMock('react-native', {
    NativeModules: {}
});
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

const i = require('../index.ios.js');

describe('Search', function() {

 
  it('should exists', function() {
 	
  });
});