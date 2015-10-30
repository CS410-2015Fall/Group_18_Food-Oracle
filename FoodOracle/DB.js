var RNDBModel = require('react-native-db-models')

var DB = {
	"favourites": new RNDBModel.create_db('favourites'),
	"items": new RNDBModel.create_db('items'),
	"preferences": new RNDBModel.create_db('preferences'),
}

module.exports = DB