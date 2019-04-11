const createError = require('http-errors');
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

/*Loading routes */
var jobsRouter = require('./routes/jobs');
var productsRouter = require('./routes/products');
var userRouter = require('./routes/users')

/* Loading db and server configurations */
const dbconfig = require('./config/dbconfig');
const MongoURI =  require('./models/MongoURI');
const mongodb = require('./db/db');
var dbCode = require('./db/dbCodes');

const app = express()
const port = 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname,'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/v1/products',productsRouter);
app.use('/v1/jobs',jobsRouter);
app.use('/v1/users',userRouter);


var mongo_uri = new MongoURI(dbconfig.mongo_db.host,dbconfig.mongo_db.port,dbconfig.mongo_db.boltcargo_db)
var mongo_options = dbconfig.mongo_db.options
var mongo_url = mongo_uri.mongoURL()

mongodb.connect(mongo_url,mongo_options,function(err){

	if(err){
		console.log('Unable to connect to mongodb');
	}

  console.log("Connected to MongoDB");
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


