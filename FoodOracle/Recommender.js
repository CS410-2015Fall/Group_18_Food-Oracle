var DB = require('./DB.js');
var Math = require('mathjs');

function Recommender(parentContext) {
	this.parentContext = parentContext;
	
	this.calculateFlavorRanges = function(favorites) {
	
		var saltyValues = [];
		var sourValues = [];
		var sweetValues = [];
		var bitterValues = [];
		var meatyValues = [];
		var piquantValues = [];
		var i;
		for (i in favorites) {
			saltyValues.push(favorites[i].saltyValue);
			sourValues.push(favorites[i].sourValue);
			sweetValues.push(favorites[i].sweetValue);
			bitterValues.push(favorites[i].bitterValue);
			meatyValues.push(favorites[i].meatyValue);
			piquantValues.push(favorites[i].piquantValue);
		}
		
		var saltyMean = Math.mean(saltyValues);
		var saltySTD = Math.std(saltyValues, 'uncorrected');
		var saltyMin = saltyMean - saltySTD;
		if (saltyMin < 0) {saltyMin = 0;}
		var saltyMax = saltyMean + saltySTD;
		if (saltyMax > 1) {saltyMax = 1;}
		
		var sourMean = Math.mean(sourValues);
		var sourSTD = Math.std(sourValues, 'uncorrected');
		var sourMin = sourMean - sourSTD;
		if (sourMin < 0) {sourMin = 0;}
		var sourMax = sourMean + sourSTD;
		if (sourMax > 1) {sourMax = 1;}
		
		var sweetMean = Math.mean(sweetValues);
		var sweetSTD = Math.std(sweetValues, 'uncorrected');
		var sweetMin = sweetMean - sweetSTD;
		if (sweetMin < 0) {sweetMin = 0;}
		var sweetMax = sweetMean + sweetSTD;
		if (sweetMax > 1) {sweetMax = 1;}
		
		var bitterMean = Math.mean(bitterValues);
		var bitterSTD = Math.std(bitterValues, 'uncorrected');
		var bitterMin = bitterMean - bitterSTD;
		if (bitterMin < 0) {bitterMin = 0;}
		var bitterMax = bitterMean + bitterSTD;
		if (bitterMax > 1) {bitterMax = 1;}
		
		var meatyMean = Math.mean(meatyValues);
		var meatySTD = Math.std(meatyValues, 'uncorrected');
		var meatyMin = meatyMean - meatySTD;
		if (meatyMin < 0) {meatyMin = 0;}
		var meatyMax = meatyMean + meatySTD;
		if (meatyMax > 1) {meatyMax = 1;}
		
		var piquantMean = Math.mean(piquantValues);
		var piquantSTD = Math.std(piquantValues, 'uncorrected');
		var piquantMin = piquantMean - piquantSTD;
		if (piquantMin < 0) {piquantMin = 0;}
		var piquantMax = piquantMean + piquantSTD;
		if (piquantMax > 1) {piquantMax = 1;}
		
		var query = '&flavor.salty.min=' + saltyMin + '&flavor.salty.max=' + saltyMax
			+ '&flavor.sour.min=' + sourMin + '&flavor.sour.max=' + sourMax
			+ '&flavor.sweet.min=' + sweetMin + '&flavor.sweet.max=' + sweetMax
			+ '&flavor.bitter.min=' + bitterMin + '&flavor.bitter.max=' + bitterMax
			+ '&flavor.meaty.min=' + meatyMin + '&flavor.meaty.max=' + meatyMax
			+ '&flavor.piquant.min=' + piquantMin + '&flavor.piquant.max=' + piquantMax;
		return query;
	}
}

module.exports = Recommender;