var app = require('express')()
var posts = require('./controllers/postRequests')
var gets = require('./controllers/getRequests')
var deletes = require('./controllers/deleteRequests')

posts(app)
gets(app)
deletes(app)
app.listen(3000, '')
console.log('Listening -> 3000');
