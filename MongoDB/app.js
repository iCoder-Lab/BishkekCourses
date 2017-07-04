var express = require('express')
var app = express()
var index = require('./controllers/index')
app.set('view engine', 'ejs')
app.use(express.static('./assets'))

index(app)
app.listen(3000, '')
console.log('Listening -> 3000');
