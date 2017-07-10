var app = require('express')()
var posts = require('./controllers/postRequests')
var gets = require('./controllers/getRequests')

posts(app)
gets(app)
app.listen(3000, '')
console.log('Listening -> 3000');
