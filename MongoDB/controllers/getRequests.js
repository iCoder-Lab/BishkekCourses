var app = require('express')()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/courses'
mongoose.connect(url, {useMongoClient: true});
var models = require('../database/models/models')

module.exports = function(app) {
  app.get('/getAllCourses', function(request, response) {
    models.Course
      .find()
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error) {
        response.status(404).send({error:"error"})
      })
  })

  app.get('/getAllSimplifiedCourses', function(request, response) {
    models.Course
      .find()
      .select({"name": 1, "description": 2, "images": 3, "_id": 0})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error) {
        response.status(404).send({error:"error"})
      })
  })

  app.get('/getAllBranches', function(request, response) {
    var previousLong;
    var previousLati;
    models.Branch
    .find()
    .sort({'longitude': -1, 'latitude': -1})
    .exec()
    .each(function (branch) {
      if(branch.longitude == previousLong && branch.latitude == previousLati) {
        branch.remove()
      }
      previousLong = branch.longitude
      previousLati = branch.latitude
    })
    .then(function(result) {
      models.Branch
        .find({})
        .select({"_id": 0})
        .then(function(result) {
          response.send(result)
        })
        .catch(function(error) {
          response.status(404).send({error:error})
        })
    })
  })

  app.get('/getAllCategories', function(request, response) {
    var previousName;
    models.Category
    .find()
    .sort('name')
    .exec()
    .each(function (course) {
      if (course.name == previousName) {
        course.remove()
      }
      previousName = course.name
    })
    .then(function(result) {
      models.Category
        .find()
        .select({"_id": 0, "subcategories._id": 0})
        .then(function(res) {
          response.send(res)
        })
        .catch(function(error) {
          response.status(404).send({error:error})
        })
    })
  })

  app.get('/getAllContactTypes', function(request, response) {
    var result =  [
    {"contacttypeint": 1, "contacttypename": "Телефон"},
    {"contacttypeint": 2, "contacttypename": "Почта"},
    {"contacttypeint": 3, "contacttypename": "WhatsApp"},
    {"contacttypeint": 4, "contacttypename": "Facebook"},
    {"contacttypeint": 5, "contacttypename": "Instagram"},
    {"contacttypeint": 6, "contacttypename": "Website"}]
    response.send(result)
  })

  app.get('/getCoursesByCategory/:category', function(request, response) {
    models.Course
      .find({"categories.name": request.params.category})
      .select({"name": 1, "description": 2, "images": 3, "_id": 0})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error) {
        response.status(404).send({error:error})
      })
  })

  app.get('/getCoursesBySubcategory/:subcategory', function(request, response) {
    models.Course
      .find({"categories.subcategories.name": request.params.subcategory})
      .select({"name": 1, "description": 2, "images": 3, "_id": 0})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error) {
        response.status(404).send({error:error})
      })
  })

  app.get('/getCourseByName/:name', function(request, response) {
    models.Course
      .find({"name": request.params.name})
      .then(function(result) {
        response.send(result[0])
      })
      .catch(function(error) {
        response.status(404).send({error: error})
      })
  })

  app.get('/getCourseByBoth/:categoryname/:subcatname', function(request, response) {
    models.Course
      .find({ $and: [{'categories.name': request.params.categoryname}, {'categories.subcategories.name': request.params.subcatname}]})
      .select({'name': 2, 'images': 3, 'description': 4, '_id': 0})
      .then(function(result) {
        response.send(result)
      })
      .catch(function(error) {
        response.status(404).send({error:error})
      })
  })
}
