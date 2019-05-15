var mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

let JobsSchema = new mongoose.Schema({

	//jobId: String,
	//score: Number,
	jobUniqueId: String,
	jobEnquiryType: String,
	jobContainerType: String,
	jobPartyName: String,
	jobStuffingFactoryLocation : String,
	jobPickupDate : String,
	jobStuffingDate: String,
	jobNumberOfContainers: String,
	jobTypeOfContainers: Array(Object),
	dateAdded : String,
	dateModified : String
})

JobsSchema.plugin(AutoIncrement, {inc_field: 'score'});

module.exports = mongoose.model('Jobs',JobsSchema)
