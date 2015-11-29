var RNDBModel = require('react-native-db-models')

var DB = {
	"dictionary": new RNDBModel.create_db('dictionary'),
	"favourites": new RNDBModel.create_db('favourites'),
	"ingredients": new RNDBModel.create_db('ingredients'),
	"preferences": new RNDBModel.create_db('preferences'),
}

module.exports = DB