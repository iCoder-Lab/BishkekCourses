var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

//var connect = mongoose.connect('mongodb://127.0.0.1/test', {useMongoClient: true})
var subCategory = new Schema ({
  name: String,
  imgPath: String
})
var subCategories = []
subCategories.push(subCategory)

var category = new Schema ({
  name: String,
  subCategories: subCategories
})
var categories = []
categories.push(category)

var branch = new Schema ({
  address: String,
  latitude: String,
  longitude: String,
  phone: String
})
var branches = []
branches.push(branch)

var contact = new Schema ({
  contactType: Number,
  data: String
})
var contacts = []
contacts.push(contact)

var service = new Schema ({
  description: String,
  name: String,
  price: Number
})
var services = []
services.push(service)

var image = new Schema ({
  imagePath: String,
  isLogo: Boolean
})
var images = []
images.push(image)

var course = new Schema ({
    name: [{ type: String, unique: true }],
    description: String,
    branches: branches,
    categories: categories,
    contacts: contacts,
    images: images,
    services: services
})

module.exports = {
  Course : mongoose.model('Course', course),
  Category : mongoose.model('Category', category),
  Branch : mongoose.model('Branch', branch)
}
