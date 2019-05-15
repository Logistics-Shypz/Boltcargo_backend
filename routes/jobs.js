const express = require('express')
var router = express.Router()
var path = require('path')
var dateTime = require('node-datetime');


let JobsModel = require('../models/JobModel')
let Counter = require('../models/CounterModel')




router.use(function(req,res,next){

	//req.time = Date.now()
	//console.log("Request time is : " + req.time)
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted)
	next()
})

var getNextSequence = function(sequenceName){

		

		return Counter
			  .findOneAndUpdate(
			    {
			      _id: 'orderid'  // search query
			    }, 
			    {
			      $inc: {sequence_value:1}   // field:values to update
			    },
			    {
			      new: true,                       // return updated doc
			                  // validate before update
			    })
			  .then(doc => {
			   console.log(doc)
			  })
			  .catch(err => {
			    console.error(err)
			  })

	
   
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


				Counter
				  .findOneAndUpdate(
				    {
				      _id: 'orderid'  // search query
				    }, 
				    {
				      $inc: {sequence_value:1}   // field:values to update
				    },
				    {
				      new: true,                       // return updated doc
				                  // validate before update
				    })
				  .then(doc => {

						var dtadd = new Date()
						cnt = 0
						num_containers = JSON.parse(req.body['jobTypeOfContainers'][0])
						console.log(num_containers)
						for(var k in num_containers){
							cnt = cnt + parseInt(num_containers[k])
						}

						console.log(dtadd.getDate())
						console.log(dtadd.getMonth()+1)
						console.log(dtadd.getFullYear())
						console.log(cnt)

						unique_id = "BOLTCTPT" + dtadd.getDate() + (dtadd.getMonth()+1) + dtadd.getFullYear() + "/" + doc['sequence_value'] + "/" + cnt
						console.log(unique_id)


						let jobsModel = new JobsModel({

							
							jobUniqueId : unique_id,
							jobEnquiryType : req.body['jobEnquiryType'],
							jobContainerType : req.body['jobContainerType'],
							jobPartyName: req.body['jobPartyName'],
							jobStuffingFactoryLocation : req.body['jobStuffingFactoryLocation'],
							jobPickupDate : req.body['jobPickupDate'],
							jobStuffingDate : req.body['jobStuffingDate'],
							jobNumberOfContainers : req.body['jobNumberOfContainers'],
							jobTypeOfContainers: req.body['jobTypeOfContainers'],
							dateAdded : Date(),
							dateModified : null

						})

						console.log(jobsModel)

						jobsModel.save()
						.then(doc => {
									console.log(doc);
									var r = {

										'status' : 200,
										'message' : 'success',
										'description' : 'Enquiry successfully submitted',
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
										'description' : 'Unable to Submit Enquiry Successfully'
										
									};
									res.json(r)
								})


				   		
				  })
				  .catch(err => {
				    console.error(err)
				  })


				// console.log(req.body)

				/*JobsModel.findAndModify({query: })

				s = db.people.findAndModify({
				    query: { name: "Andy" },
				    sort: { rating: 1 },
				    update: { $inc: { score: 1 } },
				    upsert: true
				})*/


				// var dtadd = new Date()
				// cnt = 0
				// num_containers = req.body['jobTypeOfContainers'][0]
				// for(var k in num_containers){
				// 	cnt = cnt + num_containers[k]
				// }

				// console.log(dtadd.getDate())
				// console.log(dtadd.getMonth()+1)
				// console.log(dtadd.getFullYear())
				// console.log(cnt)

				// unique_id = "BOLTCTPT" + dtadd.getDate() + (dtadd.getMonth()+1) + dtadd.getFullYear() + "/" + cnt
				// console.log(unique_id)


				

				// res = getNextSequence("orderid")
				// console.log(res['sequence_value'])
				//console.log(c)
				//console.log(cnt)
				// let jobsModel = new JobsModel({

						
				// 		jobUniqueId : unique_id,
				// 		jobEnquiryType : req.body['jobEnquiryType'],
				// 		jobTypeOfContainers: req.body['jobTypeOfContainers'],
				// 		dateAdded : Date(),
				// 		dateModified : null

				// 	})

				// console.log(jobsModel)
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