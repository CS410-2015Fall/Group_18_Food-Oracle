var appID = "a05ca702";
var appKey = "7ce644115e75fa844afb42c6079fc6c8";
var baseURL = "http://api.yummly.com/v1/api/recipes?";

function Fetch(parentContext) {
	var subURL = '_app_id=' + appID + '&_app_key=' + appKey;
	this.parentContext = parentContext;
	this.fetchRequest = function(request, callback){
		var fetchURL = baseURL + subURL + '&q=' + request;
		debugger;
		fetch(fetchURL)
		.then((response) => response.json())
		.then((responseData) => {
			debugger;
			callback(parentContext, responseData);
		}).done();
	}
}



module.exports = Fetch;