var app = require('express')()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/courses'
mongoose.connect(url, {useMongoClient: true});
var models = require('../database/models/models')

module.exports = function(app)
{
  app.get('/getAllCourses', function(request, response)
    {
      models.Course
        .find()
        .select({"name": 1, "description": 2, "images": 3, "_id": 4})
        .then(function(branches) {
          response.send(branches)
        })
        .catch(function(error) {
          response.send({error:"error"})
        })
    })

  app.get('/getAllBranches', function(request, response)
  {
    models.Branch
      .find({})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error) {
        response.send({error:error})
      })
  })

  app.get('/getAllCategories', function(request, response)
  {
    models.Course
      .find({})
      .select({"categories": 1, "_id": 0})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error){
        response.send({error:error})
      })
  })

  app.get('/getAllContactTypes', function(request, response)
  {

  })

  app.get('/getCoursesByCategory/:category', function(request, response)
  {
    models.Course
      .find({"categories.name": request.params.category})
      .select({"name": 1, "description": 2, "images": 3, "_id": 4})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error){
        console.log(error)
        response.send({error:error})
      })
  })

  app.get('/getCoursesBySubcategory/:subCategory', function(request, response)
  {
    models.Course
      .find({"categories.subCategories.name": request.params.subCategory})
      .select({"name": 1, "description": 2, "images": 3, "_id": 4})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error){
        console.log(error)
        response.send({error:error})
      })
  })

  app.get('/getCourseByID/:id', function(request, response)
  {
    models.Course
      .find({"_id": request.params.id})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error){
        console.log(error)
        response.send({error: error})
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
        response.send({error:error})
      })
  })
}
