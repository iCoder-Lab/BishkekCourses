var app = require('express')()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/courses'
mongoose.connect(url, {useMongoClient: true});
var models = require('../database/models/models')

module.exports = function(app) {
  app.post('/addCourse', bP, function(request, response) {
    var inp = request.body
    for(var i = 0; i < inp.categories.length; i++) {
      var category = new models.Category(inp.categories[i])
      category.save(function (err, c) {
        if (err)
          console.log({error: err})
      })
    }

    for(var i = 0; i < inp.branches.length; i++) {
      var branch = new models.Branch(inp.branches[i])
      branch.save(function (err, c) {
        if (err)
          console.log({error: err})
      })
    }

    var course = new models.Course(inp)
    course.markModified('name')
    course.save(function (err, updated) {
      if (err)
        console.log({error: err})
    })
    response.send({error: ""})
  })

  app.post('/addCategory', bP, function(request, response) {
    var inp = request.body
    var category = new models.Category(inp)
    models.Category
    .find({'name': inp.name})
    .then(function(result) {
      if(result.length != 0) {
        response.send({error:'That course already exists...'})
      }
      else {
        try {
          category.save(function (error, result) {
            if (error) {
              response.send({error:error})
            }
            else {
              response.send({error: ""})
            }
          })
        }
        catch(e) {
          response.send({error: e})
        }
      }
    })
    .catch(function(error) {
     response.send({error: error})
    })
  })

  app.post('/addSubCategories', bP, function(request, response) {
    var inp = request.body
    models.Category.update(
      { name: inp.name },
      { $push: {subcategories: { $each: inp.subcategories}}}, function (err, res){
        if(err) {
          response.send({error: err})
        }
        else {
          response.send({error: ""})
        }
      }
    )
  })
}
