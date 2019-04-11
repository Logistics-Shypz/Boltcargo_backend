const mongoose = require('mongoose')

var state = {
	db: null
}

module.exports = {

	connect: function(uri,options,done){
		if (state.db) return done()

		console.log(uri)

		mongoose.connect(uri,options).then(
			() => {
			state.db = mongoose.connection
			console.log("Connected to mongodb")
			//console.log(state.db)
			
			},
			err => {
				console.log("Error connecting with mongodb")
			}
		)
	},

	get:function(){
		return state.db
	},

	close:function(){
		if (state.db) {
		    state.db.close(function(err, result) {
		      state.db = null
		      state.mode = null
		      done(err)
		    })
  		}
	}
	 
}