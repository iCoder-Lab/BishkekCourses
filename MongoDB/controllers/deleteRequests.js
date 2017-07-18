var app = require('express')()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/courses'
mongoose.connect(url, {useMongoClient: true});
var models = require('../database/models/models')

module.exports = function(app) {
  app.delete('/deleteCourse/:coursename', function(request, response) {
    models.Course
    .findOneAndRemove({'name': request.params.coursename})
    .then(function(result) {
      response.send({error: ""})
    })
    .catch(function(err) {
      response.status(404).send({error: err})
    })
  })

  app.delete('/deleteCategory/:categoryname', function(request, response) {
    models.Course
      .find({"categories.name": request.params.categoryname})
      .then(function(result) {
        if(result.length == 0) {
          models.Category
          .remove({"name": request.params.categoryname})
          .exec()
          .then(function(r) {
            if(r.length == 0) {
              response.status(404).send({error:'category not found'})
            }
            else {
              response.send({error:''})
            }
          })
          .catch(function(err) {
            response.status(404).send({error: err})
          })
        }

        else {
          response.status(404).send({error:'Category could not be deleted.'})
        }
      })
      .catch(function(error) {
        response.status(404).send({error:error})
      })
  })

  app.delete('/deleteSubCategory/:subcategoryname', function(request, response) {
    models.Course
      .find({"categories.subcategories.name": request.params.subcategoryname})
      .then(function(result) {
        if(result.length == 0) {
          models.Category
          .update({"subcategories.name": request.params.subcategoryname},
                  {$pull: {subcategories: {name: request.params.subcategoryname}}},
                  { multi: true })
          .then(function(r) {
            if(r.length == 0) {
              response.status(404).send({error:"subCategory not found."})
            }
            else {
              response.send({error:""})
            }
          })
          .catch(function(err) {
            response.status(404).send({error: err})
          })
        }

        else {
            response.status(404).send({error:'subCategory could not be deleted.'})
        }
      })
      .catch(function(error) {
        response.status(404).send({error:error})
      })
  })
}
