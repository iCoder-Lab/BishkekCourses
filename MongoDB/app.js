var express = require('express')
var app = express()
var posts = require('./controllers/postRequests')
var gets = require('./controllers/getRequests')
app.set('view engine', 'ejs')
app.use(express.static('./assets'))

posts(app)
gets(app)
app.listen(3000, '')
console.log('Listening -> 3000');
