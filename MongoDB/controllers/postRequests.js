const async = require('async')
const bP = require('body-parser').json()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const url = 'mongodb://127.0.0.1/courses'
mongoose.connect(url, {useMongoClient: true})
const models = require('../database/models/models')

module.exports = function(app) {
  app.post('/addCourse', bP, function(request, response) {
    const inp = request.body
    async.waterfall([
      function(callback) {
        if(inp.branches != undefined) {
          async.each(inp.branches, function (item, callback) {
            let branch = new models.Branch(item)
            branch.save(function (error) {
              console.log(error)
              callback("some internal error")
            })
          callback(null)
          })
        }
        else {
          callback("you are required to have at least one branch")
        }
      },
      function(callback) {
        let course = new models.Course(inp)
        course.markModified('name')
        course.save(function (error, updated) {
          if (error) {
            console.log(error)
            callback("could not save course")
          }
          else {
            callback(null, "")
          }
        })
      }
    ], function (error, result) {
      if(error) {
        response.status(500).send({error: "error"})
      }
      else {
        response.send({error: result})
      }
    })
  })

  app.post('/addCategory', bP, function(request, response) {
    const inp = request.body
    async.waterfall([
      function(callback) {
        if(inp.subcategories != undefined) {
          async.each(inp.subcategories, function (item, callback) {
            let subcategory = new models.SubCategory(item)
            subcategory.save(function (err) {
              console.log(err);
              callback("internal error")
            })
          })
          callback(null)
        }
        else {
          callback("you are required to have at least one subcategory")
        }
      },
      function(callback) {
        let category = new models.Category(inp)
        category
        .save(function (error, result) {
          if (error) {
            console.log(error)
            callback("could not save category")
          }
          else {
            callback(null, "")
          }
        })
      }
    ], function (error, result) {
      if(error) {
        response.status(500).send({error: "error"})
      }
      else {
        response.send({error: result})
      }
    })
  })

  app.post('/addSubCategories', bP, function(request, response) {
    const inp = request.body
    async.waterfall([
      function(callback) {
        models.Category
        .find({"name": inp.name})
        .then(function(result){
          if(result.length > 0) {
            callback(null)
          }
          else {
            callback("no such a category")
          }
        })
      },
      function(callback) {
        if(inp.subcategories != undefined) {
          async.each(inp.subcategories, function (item, callback) {
            let subcategory = new models.SubCategory(item)
            subcategory.save(function (error) {
              console.log(error);
              callback("subcategory already exists")
            })
          callback(null)
          })
        }
        else {
          callback("you are required to have at least one subcategory")
        }
      },
      function(callback) {
        models.Category.update(
          { name: inp.name },
          { $push: {subcategories: { $each: inp.subcategories}}}, function (error, res){
          if(error) {
            console.log(error);
            callback("error");
          }
          else {
            callback(null, "")
          }
        })
      }
    ], function (error, result) {
      if(error) {
        response.status(500).send({error: "error"})
      }
      else {
        response.send({error: result})
      }
    })
  })
}
