var appID = "a05ca702";
var appKey = "7ce644115e75fa844afb42c6079fc6c8";
var baseURL = "http://api.yummly.com/v1/api/recipes?";
var baseURLforGet = "http://api.yummly.com/v1/api/recipe/";

function Fetch(parentContext) {
	var subURL = '_app_id=' + appID + '&_app_key=' + appKey;
	this.parentContext = parentContext;
	this.searchRequest = function(request, callback, errorHandler){
		var fetchURL = baseURL + subURL + '&q=' + request;
		/*  fetch with cusinie choice
		if(cusinie != 'all'){
			fetchURL = fetchURL + '&allowedCuisine[]=cuisine^cuisine-' + cusinie;
		} */
		fetch(fetchURL)
		.then((response) => response.json())
		.then((responseData) => {
			callback(parentContext, responseData);
		}).catch((error) => {
			errorHandler(error);
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