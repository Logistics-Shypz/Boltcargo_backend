const dbconfig = {

	 'mongo_db' : {

	 		'host' : 'localhost',
	 		'port' : '27017',
	 		'boltcargo_db' : 'BoltcargoDB',
	 		'jobs_collection' : 'jobs',
	 		'products_collection' : 'products',
	 		'counters_collection' : 'ordercounters',
	 		'users_collection' : 'users',
	 		'options' : {

	 			'poolSize' : 50,
	 			'autoIndex' : true
	 		}


	 }
}


module.exports = dbconfig