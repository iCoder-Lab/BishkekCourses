var mysql = require('mysql')

var connection = mysql.createConnection
(
  {
    host: 'localhost',
    user: 'root',
    password: 'defender1145',
    database: 'courses'
  }
)

connection.connect
(
  function(error)
  {
    console.log('connected to db');
    if (error) throw error;
  }
)

module.exports = connection
