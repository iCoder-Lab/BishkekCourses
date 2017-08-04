const app = require('express')()
const posts = require('./controllers/postRequests')
const gets = require('./controllers/getRequests')
const deletes = require('./controllers/deleteRequests')

posts(app)
gets(app)
deletes(app)

app.listen(3000, '')
console.log('Listening -> 3000');
