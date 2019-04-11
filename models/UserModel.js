var mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({

	
		userId : String,
		userName : String,
		userPassword : String,
		userEmail: String,
		userMobile: String,
		userType: String,
		userBusinessName: String,
		userBusinessAddress: String,
		userBusinessContact: String,
		userKyc: String,
		userKycDocument: String
})


module.exports = mongoose.model('users',UserSchema)
