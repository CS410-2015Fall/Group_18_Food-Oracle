var RNDBModel = require('react-native-db-models')

var DB = {
	"favourites": new RNDBModel.create_db('favourites'),
	"ingredients": new RNDBModel.create_db('ingredients'),
	"preferences": new RNDBModel.create_db('preferences'),
}

module.exports = DB