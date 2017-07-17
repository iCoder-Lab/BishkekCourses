var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

//var connect = mongoose.connect('mongodb://127.0.0.1/test', {useMongoClient: true})
var subcategory = new Schema ({
  name: { type: String, unique: true },
  imgpath: String
}, { versionKey: false })
var subcategories = []
subcategories.push(subcategory)

var category = new Schema ({
  name: { type: String, unique: true },
  subcategories: subcategories
}, { versionKey: false })
var categories = []
categories.push(category)

var branch = new Schema ({
  address: String,
  latitude: String,
  longitude: String,
  phone: String
}, { versionKey: false })
var branches = []
branches.push(branch)

var contact = new Schema ({
  contacttype: Number,
  data: String
}, { versionKey: false })
var contacts = []
contacts.push(contact)

var service = new Schema ({
  description: String,
  name: String,
  price: Number
}, { versionKey: false })
var services = []
services.push(service)

var image = new Schema ({
  imgpath: String,
  islogo: Boolean
}, { versionKey: false })
var images = []
images.push(image)

var course = new Schema ({
    name: { type: String, unique: true },
    description: String,
    branches: branches,
    categories: categories,
    contacts: contacts,
    images: images,
    services: services
}, { versionKey: false })

module.exports = {
  Course : mongoose.model('Course', course),
  Category : mongoose.model('Category', category),
  Branch : mongoose.model('Branch', branch),
  SubCategory : mongoose.model('SubCategory', subcategory)
}
