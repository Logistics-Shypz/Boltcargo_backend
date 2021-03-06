const express = require('express')
var router = express.Router()
var path = require('path')
var dateTime = require('node-datetime');



let UserModel = require('../models/UserModel')

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

			UserModel.find({},function(err,result){

				if(err){
					throw err;
				}
				else{

					res.send(result)
				}
			});
		})


router.route('/user/add')
		.post(function(req,res){


			console.log(req.body)

			var userModel = new UserModel({

				userName: req.body['userName'],
				userPassword: req.body['userPassword'],
				userMobile: req.body['userMobile'],
				dateAdded : Date(),
				dateModified : null
			})


			UserModel.findOne({$or:[{'userName':req.body.userName},{'userMobile':req.body.userMobile}]},function(err,result){


				if(err){
					throw err
				}

				if(result){
					 var errmsg = {
						'status' : 401,
						'message' : 'failure',
						'description' : "User with username or mobile is already registered"
					}
					res.json(errmsg)

				}else{
					userModel.save()
						.then(doc => {
									console.log(doc);
									var r = {

										'status' : 200,
										'message' : 'success',
										'descriptiton' : 'User successfully added',
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
										'descriptiton' : 'User Not added successfully added',
										
									};
									res.json(r)
								})
				}

			})
			

			


		})


router.route('/user/:id')
		.get(function(req,res){

			UserModel.find({_id: req.params.id},function(err,result){
				if(err){
					throw err;
				}else{

					res.send(result)
				}
			});
		})
		.put(function(req,res){

			var updt = {

				'userType' : req.body.userType,
				'userBusinessName' : req.body.userBusinessName,
				'userBusinessAddress' : req.body.userBusinessAddress,
				'userBusinessContact' : req.body.userBusinessContact,
				'userBusinessEmail' : req.body.userBusinessEmail,
				'dateModified' : Date()
			}

			UserModel.updateOne({_id: req.params.id},{$set : updt},function(err,result){
				if(err){
					throw err
				}

				res.send(result)
			});


		})


router.route('/user/:name/:pass')
		.get(function(req,res){

			UserModel.find({userName: req.params.name,userPassword: req.params.pass},function(err,result){

				if(err){
					throw err
				}

				res.send(result)
			})
		})

module.exports = router;