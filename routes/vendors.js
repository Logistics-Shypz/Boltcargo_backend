const express = require('express')
var router = express.Router()
var path = require('path')
var dateTime = require('node-datetime');

let VendorModel = require('../models/VendorModel')


router.use(function(req,res,next){

	//req.time = Date.now()
	//console.log("Request time is : " + req.time)
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted)
	next()
})


router.route('/')
		.get(function(req,res){

			VendorModel.find({},function(err,result){

				if(err){
					throw err;
				}
				else{

					res.send(result)
				}
			});
		})


router.route('/vendor/add')
		.post(function(req,res){


			console.log(req.body)

			var vendorModel = new VendorModel({

				vendorName: req.body['vendorName'],
				vendorMobile: req.body['vendorMobile'],
				vendorAddress: req.body['vendorAddress'],
				vendorAdded : Date(),
				vendorModified : null
			})


			VendorModel.findOne({$or:[{'vendorName':req.body.vendorName},{'vendorMobile':req.body.vendorMobile}]},function(err,result){


				if(err){
					throw err
				}

				if(result){
					 var errmsg = {
						'status' : 401,
						'message' : 'failure',
						'description' : "Vendor with username or mobile is already registered"
					}
					res.json(errmsg)

				}else{
					vendorModel.save()
						.then(doc => {
									console.log(doc);
									var r = {

										'status' : 200,
										'message' : 'success',
										'description' : 'Vendor successfully added',
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
										'description' : 'Vendor Not added successfully added',
										
									};
									res.json(r)
								})
				}

			})
			

			


		})


router.route('/vendor/:id')
		.get(function(req,res){

			VendorModel.find({_id: req.params.id},function(err,result){
				if(err){
					throw err;
				}else{

					res.send(result)
				}
			});
		})
		.put(function(req,res){

			var updt = {

				
				'vendorMobile' : req.body.vendorMobile,
				'dateModified' : Date()
			}

			VendorModel.updateOne({_id: req.params.id},{$set : updt},function(err,result){
				if(err){
					throw err
				}

				res.send(result)
			});


		})


module.exports = router;