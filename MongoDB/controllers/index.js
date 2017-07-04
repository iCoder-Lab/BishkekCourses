var express = require('express')
var app = express()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/test'
mongoose.connect(url, {useMongoClient: true});
var models = require('../database/models/course')(mongoose)


module.exports = function(app)
{
  app.get('/getAllBranches', function(request, response)
  {
    models.Course
      .find({}).select({"branches": 1, "name": 2})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error){
        response.send("error")
      })
  })

  app.get('/getAllCategories', function(request, response)
  {
    models.Course
      .find({}).select({"category.name": 1, "name": 2, "category.subCategory.name": 3})
      .then(function(branches) {
        response.send(branches)
      })
      .catch(function(error){
        response.send("error")
      })
  })

  app.get('/getCourse/:categoryID/:subcatID', function(request, response)
  {
    models.Course
      .find({ $and: [{'category.name': request.params.categoryID}, {'category.subCategory._id': request.params.subcatID}]})
      .select({'category.name': 1})
      .then(function(result) {
        console.log(result)
        response.send(result)
      })
      .catch(function(error){
        response.send("error")
      })
  })

  app.post('/addCourse', bP, function(request, response)
  {
    var inp = request.body
    console.log(inp)
    var course = new models.Course(inp)
    course.save(function (err, c)
    {
      if (err)
        return console.error(err)
      console.log(err);
      response.send(course)
    });
  })



}
