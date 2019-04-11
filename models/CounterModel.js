var mongoose = require('mongoose')

let CounterSchema = new mongoose.Schema({

	_id: String,
	value: Number
})


module.exports = mongoose.model('ordercounters',CounterSchema)
