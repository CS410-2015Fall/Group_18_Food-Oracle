var RNDBModel = require('react-native-db-models')

var DB = {
	"flavors": new RNDBModel.create_db('flavors'),
	"favourites": new RNDBModel.create_db('favourites'),
	"ingredients": new RNDBModel.create_db('ingredients'),
	"preferences": new RNDBModel.create_db('preferences'),
}

module.exports = DB