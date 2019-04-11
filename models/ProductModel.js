var mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({

	productName: String,
	productSize: String,
	productType: String,
	productWeight: String,
	dateAdded : String,
	dateModified : String
    
    
})


module.exports = mongoose.model('Product',ProductSchema)

