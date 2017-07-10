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
          console.log("category " + inp.categories[i].name +" already exists")
      })
    }

    for(var i = 0; i < inp.branches.length; i++) {
      var branch = new models.Branch(inp.branches[i])
      branch.save(function (err, c) {
        if (err)
          console.log("branch already exists")
      })
    }

    var course = new models.Course(inp)
    course.markModified('name')
    course.save(function (err, updated) {
      if (err)
        console.log("course " + inp.name + " already exists")
    })
    response.json(course)
  })

  app.post('/addCategory', bP, function(request, response) {
    var inp = request.body
    var category = new models.Category(inp)
    models.Category
    .find({'name': inp.name}).limit(1)
    .then(function(result) {
      if(result.length != 0) {
        response.send({error:'Muhamed, No No. That course already exists...'})
      }
      else {
        try {
          category.save(function (error, result) {
            if (error) {
              response.send({error:error})
            }
            else {
              response.send()
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
    console.log(inp.subCategories);
    models.Category.update(
      { name: inp.name },
      { $push: {subCategories: { $each: inp.subCategories}}}, function (err, res){
        if(err) {
          response.send({error: err})
        }
        else {
          response.send()
        }
      }
    )
  })
}
