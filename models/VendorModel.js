var mongoose = require('mongoose')

let VendorSchema = new mongoose.Schema({

	
		vendorId : String,
		vendorName : String,
		vendorMobile: String,
		vendorAddress: String,
		vendorAdded: String,
		vendorModified: String

		
})


module.exports = mongoose.model('vendors',VendorSchema)