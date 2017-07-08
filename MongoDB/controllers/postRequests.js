var app = require('express')()
var bP = require('body-parser').json()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var url = 'mongodb://127.0.0.1/courses'
mongoose.connect(url, {useMongoClient: true});
var models = require('../database/models/models')(mongoose)

module.exports = function(app)
{
  app.post('/addCourse', bP, function(request, response)
  {
    var inp = request.body
    var course = new models.Course(inp)

    models.Course
      .find({'name': inp.name}).limit(1)
      .then(function(result)
      {
        if(result.length != 0)
        {
          response.send({error:'Muhamed, No No. That course already exists...'})
        }
        else
        {
          course.save(function (err, c)
          {
            if (err)
              return console.send({error:err})
            response.json(course)
          })
        }
      })
      .catch(function(error)
      {
        response.send({error:'There was an Internal Error'})
      })
  })
  app.post('/addCategory', bP, function(request, response)
  {

  })
}
