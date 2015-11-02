var appID = "a05ca702";
var appKey = "7ce644115e75fa844afb42c6079fc6c8";
var baseURL = "http://api.yummly.com/v1/api/recipes?";
var baseURLforGet = "http://api.yummly.com/v1/api/recipe/";

var DB = require('./DB.js');

function Fetch(parentContext) {
	var subURL = '_app_id=' + appID + '&_app_key=' + appKey;
	this.parentContext = parentContext;
	this.searchRequest = function(request, callback, errorHandler) {
		console.log(request);
		DB.preferences.get({key: 'cuisine'}, (result) => {
			var cuisine;
			if (result.length == 0) {
				cuisine = 'none';
			} else {
				cuisine = result[0].value;
			}
			if(cuisine != 'none') {
				request = request + '%2C%20' + cuisine;
			}
			var fetchURL = baseURL + subURL + '&q=' + request +'&requirePictures=true';
			// fetchURL = fetchURL + '&allowedCuisine[]=cuisine^cuisine-' + cuisine;
			fetch(fetchURL)
			.then((response) => response.json())
			.then((responseData) => {
				callback(parentContext, responseData);
			}).catch((error) => {
				errorHandler(error);
			});
		});
	}

	this.getRequest = function(request, callback){
		var subURL = '_app_id=' + appID + '&_app_key=' + appKey;
		var fetchURL = baseURLforGet + request + '?'+subURL;
		fetch(fetchURL)
		.then((response) => response.json())
		.then((responseData) => {
			callback(parentContext, responseData);
		}).catch((error) => {
			errorHandler(error);
		});
	}


}

module.exports = Fetch;