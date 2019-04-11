function MongoURI(host,port,db){

	this.host = host;
	this.port = port;
	this.db = db;
}


MongoURI.prototype.mongoURL = function(){

	let mongouri = "mongodb://" + this.host + ":" + this.port + "/" + this.db

	return mongouri;
};


module.exports = MongoURI