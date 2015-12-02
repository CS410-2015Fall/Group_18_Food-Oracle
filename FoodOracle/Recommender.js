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
			if (favorites[i].saltyValue != undefined) saltyValues.push(favorites[i].saltyValue);
			if (favorites[i].sourValue != undefined) sourValues.push(favorites[i].sourValue);
			if (favorites[i].sweetValue != undefined) sweetValues.push(favorites[i].sweetValue);
			if (favorites[i].bitterValue != undefined) bitterValues.push(favorites[i].bitterValue);
			if (favorites[i].meatyValue != undefined) meatyValues.push(favorites[i].meatyValue);
			if (favorites[i].piquantValue != undefined) piquantValues.push(favorites[i].piquantValue);
		}
		
		if (saltyValues.length != 0) {
			var saltyMean = Math.mean(saltyValues);
			var saltySTD = Math.std(saltyValues, 'uncorrected');
		} else {
			var saltyMean = 0.5;
			var saltySTD = 0.5;
		}
		var saltyRangeBoost = 0.1*Math.pow(0.5, saltySTD/0.1);
		var saltyMin = saltyMean - saltySTD - saltyRangeBoost;
		if (saltyMin < 0) {saltyMin = 0;}
		var saltyMax = saltyMean + saltySTD + saltyRangeBoost;
		if (saltyMax > 1) {saltyMax = 1;}
		
		if (sourValues.length != 0) {
			var sourMean = Math.mean(sourValues);
			var sourSTD = Math.std(sourValues, 'uncorrected');
		} else {
			var sourMean = 0.5;
			var sourSTD = 0.5;
		}
		var sourRangeBoost = 0.1*Math.pow(0.5, sourSTD/0.1);
		var sourMin = sourMean - sourSTD - sourRangeBoost;
		if (sourMin < 0) {sourMin = 0;}
		var sourMax = sourMean + sourSTD + sourRangeBoost;
		if (sourMax > 1) {sourMax = 1;}
		
		if (sweetValues.length != 0) {
			var sweetMean = Math.mean(sweetValues);
			var sweetSTD = Math.std(sweetValues, 'uncorrected');
		} else {
			var sweetMean = 0.5;
			var sweetSTD = 0.5;
		}
		var sweetRangeBoost = 0.1*Math.pow(0.5, sweetSTD/0.1);
		var sweetMin = sweetMean - sweetSTD - sweetRangeBoost;
		if (sweetMin < 0) {sweetMin = 0;}
		var sweetMax = sweetMean + sweetSTD + sweetRangeBoost;
		if (sweetMax > 1) {sweetMax = 1;}
		
		if (bitterValues.length != 0) {
			var bitterMean = Math.mean(bitterValues);
			var bitterSTD = Math.std(bitterValues, 'uncorrected');
		} else {
			var bitterMean = 0.5;
			var bitterSTD = 0.5;
		}
		var bitterRangeBoost = 0.1*Math.pow(0.5, bitterSTD/0.1);
		var bitterMin = bitterMean - bitterSTD - bitterRangeBoost;
		if (bitterMin < 0) {bitterMin = 0;}
		var bitterMax = bitterMean + bitterSTD + bitterRangeBoost;
		if (bitterMax > 1) {bitterMax = 1;}
		
		if (meatyValues.length != 0) {
			var meatyMean = Math.mean(meatyValues);
			var meatySTD = Math.std(meatyValues, 'uncorrected');
		} else {
			var meatyMean = 0.5;
			var meatySTD = 0.5;
		}
		var meatyRangeBoost = 0.1*Math.pow(0.5, meatySTD/0.1);
		var meatyMin = meatyMean - meatySTD - meatyRangeBoost;
		if (meatyMin < 0) {meatyMin = 0;}
		var meatyMax = meatyMean + meatySTD + meatyRangeBoost;
		if (meatyMax > 1) {meatyMax = 1;}
		
		if (piquantValues.length != 0) {
			var piquantMean = Math.mean(piquantValues);
			var piquantSTD = Math.std(piquantValues, 'uncorrected');
		} else {
			var piquantMean = 0.5;
			var piquantSTD = 0.5;
		}
		var piquantRangeBoost = 0.1*Math.pow(0.5, piquantSTD/0.1);
		var piquantMin = piquantMean - piquantSTD - piquantRangeBoost;
		if (piquantMin < 0) {piquantMin = 0;}
		var piquantMax = piquantMean + piquantSTD + piquantRangeBoost;
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