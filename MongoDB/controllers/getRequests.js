var app = require('express')()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/test'
mongoose.connect(url, {useMongoClient: true});
//var models = require('../database/models/models')
var Course = require('../database/models/models').Course

module.exports = function(app)
{
  app.get('/getAllCourses', function(request, response)
  {
    models.Course
      .find({}).select({"name": 1, "_id": 2, "images.imagePath": 3})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error) {
        response.send("error")
      })
  })

  app.get('/getAllBranches', function(request, response)
  {
    models.Course
      .find({}).select({"branches": 1, "address": 2, "longtitude": 3, "latitude": 4, "phone": 5, "_id": 6, "name": 7})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error) {
        response.send("error")
      })
  })

  app.get('/getAllCategories', function(request, response)
  {
    models.Course
      .find({}).select({"category._id": 1, "subCategory._id": 2, "category.name": 3, "category.subCategory.name": 4, "images.imagePath": 5})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error){
        response.send("error")
      })
  })
  app.get('/getAll', function(request, response)
  {
    models.Course
      .find({})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error){
        console.log(error)
        response.send("error")
      })
  })
  app.get('/getCourse/:categoryID/:subcatID', function(request, response)
  {
    models.Course
      .find({ $and: [{'category._id': request.params.categoryID}, {'category.subCategory._id': request.params.subcatID}]})
      .select({'_id': 1, 'name': 2, 'images': 3, 'branches.address': 4, 'services.name': 5})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error){
        console.log(error)
        response.send("error")
      })
  })
}
