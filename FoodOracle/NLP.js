
var INGREDIENTS = ["almond", "almonds","apple", "apples", "artichoke", "artichokes", "asparagus","avocado", "bacon", "banana", "bananas", "beef", "blueberry", "blueberries", "bouillon", "broccoli", "butter", "buttermilk", "cabbage", "cabbages", "carrot", "carrots", "cauliflower", "celery", "cheese", "cheddar", "cherry", "chicken", "chives", "bok choy", "cinnamon", "cod", "corn", "cucumber", "egg"]; 
//a dictionary of food ingredients that we will test the input words against. Added so far: starts with A, B, C,


function NLP(input_sentence, callback){
	var words = input_sentence.split(" ");
	var noFound = [];
	var foundIngredients[];
	for (int i = 0, i < words.length, i++){
		var ingredients_index = INGREDIENTS.indexOf(words[i]);
		if(ingredients_index == -1){
			//not found, add to no found list, ask, if yes, add to fridge and add to INGREDIENTS; if no, do nothing
			noFound.push(INGREDIENTS[ingredients_index]);
		}
		else{
			//found; add to found list that adds to fridge: INGREDIENTS[ingredients_index]
			foundIngredients.push(INGREDIENTS[ingredients_index]);
		}
	}
	//callback with noFound 'did you mean?'; callback function need to refreshListView
	callback(noFound, foundIngredients); 
}

module.exports = NLP;