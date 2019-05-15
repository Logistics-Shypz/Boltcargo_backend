const express = require('express')
var router = express.Router()
var path = require('path')
var dateTime = require('node-datetime');
/*const bodyParser = require('body-parser');*/

let ProductModel = require('../models/ProductModel')



/*router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}));*/


router.use(function(req,res,next){

	//req.time = Date.now()
	//console.log("Request time is : " + req.time)
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted);
	next()
})


router.route('/')
		.get(function(req,res){

			//res.send("retreive all")

			ProductModel.find({},function(err,result){

				if(err){
					throw err;
				}
				else{

					res.send(result)
				}
			});


		})



router.route('/product/:id')
		.get(function(req,res){


			//res.send("get specific id")
			console.log(req.params.id)
			//ImageModel.find({_id: req.params.id}, function(err,result){
			ProductModel.find({_id: req.params.id},function(err,result){
				if(err){
					throw err;
				}else{

					res.send(result)
				}
			});
		})
		.put(function(req,res){

			//res.send("update specific id")

			productName = req.body['productName']

			ProductModel.updateOne({_id: req.params.id},{$set : {'productName': productName,'dateModified':Date()}},function(err,result){
				if(err){
					throw err
				}

				res.send(result)
			});
		})		

router.route('/product/add')
		.post(function(req,res){
			
			let productModel = new ProductModel({

						productName : req.body['productName'],
						productSize: req.body['productSize'],
						productType: req.body['productType'],
						productWeight : req.body['productWeight'],
						dateAdded : Date(),
						dateModified : null

					})


			ProductModel.findOne({'productName':req.body.productName},function(err,result){

				if(err){
					throw err
				}

				if(result){
					var errmsg = {
						'status' : 401,
						'message' : 'failure',
						'description' : "Product with name is already registered"
					}
					res.json(errmsg)
				}else{

					productModel.save()
						.then(doc => {
									console.log(doc);
									var r = {

										'status' : 200,
										'message' : 'success',
										'description' : 'Product successfully added',
										'object_id' : doc._id
									};
									//res.setHeader('Content-Type', 'application/json');
									//res.send(r);  works
									//res.status(200).end(JSON.stringify(r)) works
									res.json(r); 
								})
								.catch(err => {
									console.log(err);
									var r = {

										'status' : 401,
										'message' : 'failure',
										'description' : 'Product Not added successfully added',
										
									};
									res.json(r)
								})
				}
			})

			
		})


module.exports = router;