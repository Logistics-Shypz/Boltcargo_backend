const express = require('express')
var router = express.Router()
var path = require('path')
var dateTime = require('node-datetime');

let JobsModel = require('../models/JobModel')
let CounterModel = require('../models/CounterModel')


router.use(function(req,res,next){

	//req.time = Date.now()
	//console.log("Request time is : " + req.time)
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted)
	next()
})

var getNextSequence = function(sequenceName){

	/*var sequenceDocument = CounterModel.findAndUpdate({
      query:{_id: sequenceName },
      update: {$inc:{value:1}},
      new:true
   });*/

   CounterModel.findOneAndUpdate({query:{_id: sequenceName },update: {$inc:{value:1}},new:true},function(err,result){

   		if(err){
   			throw err

   		}else{
   			console.log(result)
   		}
   })

   //console.log(sequenceDocument.value);
	
   
}

router.route('/')
		.get(function(req,res){

			JobsModel.find({},function(err,result){

				if(err){
					throw err;
				}
				else{

					res.send(result)
				}
			});

		})

router.route('/job/:id')
		.get(function(req,res){

			JobsModel.find({_id: req.params.id},function(err,result){

					if(err){
						throw err
					}

					else{
						res.send(result)
					}

			})
		})


router.route('/job/add')
		.post(function(req,res){


				console.log(req.body)

				/*JobsModel.findAndModify({query: })

				s = db.people.findAndModify({
				    query: { name: "Andy" },
				    sort: { rating: 1 },
				    update: { $inc: { score: 1 } },
				    upsert: true
				})*/


				var dtadd = new Date()
				cnt = 0
				num_containers = req.body['jobTypeOfContainers'][0]
				for(var k in num_containers){
					cnt = cnt + num_containers[k]
				}

				console.log(dtadd.getDate())
				console.log(dtadd.getMonth()+1)
				console.log(dtadd.getFullYear())

				unique_id = "BOLTCTPT" + dtadd.getDate() + (dtadd.getMonth()+1) + dtadd.getFullYear() + "/" + cnt
				console.log(unique_id)

				getNextSequence("orderid")
				//console.log(c)
				//console.log(cnt)
				/*let jobsModel = new JobsModel({

						score : getNextSequence("orderid"),
						jobUniqueId : unique_id,
						jobEnquiryType : req.body['jobEnquiryType'],
						jobTypeOfContainers: req.body['jobTypeOfContainers'],
						dateAdded : Date(),
						dateModified : null

					})*/


				/*jobsModel.save()
						.then(doc => {
									console.log(doc);
									var r = {

										'status' : 200,
										'message' : 'success',
										'descriptiton' : 'Enquiry successfully added',
										'object_id' : doc._id
									};
									//res.setHeader('Content-Type', 'application/json');
									//res.send(r);  works
									//res.status(200).end(JSON.stringify(r)) works
									res.json(r); 
								})
								.catch(err => {
									console.log(err);
								})*/
								

		})


module.exports = router;