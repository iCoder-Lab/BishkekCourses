var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

//var connect = mongoose.connect('mongodb://127.0.0.1/test', {useMongoClient: true})

module.exports = function(mongoose) {
  var schema = new Schema
  ({
      branches:
      [{
        address: String,
        latitude: String,
        longitude: String,
        phone: String
      }],

      category:
      [{
        name: String,
        subCategory:
        [{
          name: String,
          imgPath: String
        }]
      }],

      contacts:
      [{
        data: String,
        contactType: Number
      }],

      description: String,
      images:
      [{
        imagePath: String,
        isLogo: Boolean
      }],

      name: String,
      services:
      [{
        description: String,
        name: String,
        price: Number
      }]
  })
  var models = {
    Course : mongoose.model('Course', schema)
  }
  return models
}
