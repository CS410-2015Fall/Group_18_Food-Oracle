function Fetch(parentContext) {
	this.parentContext = parentContext;
	this.fetchRequest = function(URL, callback){
		fetch(URL)
		.then((response) => response.json())
		.then((responseData) => {
			callback(parentContext, responseData);
		}).done();
	}
}



module.exports = Fetch;