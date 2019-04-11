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
				userEmail: req.body['userEmail']
				userMobile: req.body['userMobile']
			})


			


		})


module.exports = router;