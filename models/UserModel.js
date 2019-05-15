var mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({

	
		userId : String,
		userName : String,
		userPassword : String,
		userMobile: String,
		userType: String,
		userBusinessName: String,
		userBusinessAddress: String,
		userBusinessContact: String,
		userBusinessEmail: String,
		userKyc: String,
		userKycDocument: String,
		dateAdded: String,
		dateModified: String
})


module.exports = mongoose.model('users',UserSchema)
