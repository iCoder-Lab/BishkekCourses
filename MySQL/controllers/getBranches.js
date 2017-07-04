var bodyParser = require('body-parser').json()
var connection = require('./connection')

module.exports = function(app)
{
  app.get('/getAllBranches', bodyParser, function(request, response, next)
  {
    connection.query('SELECT b.ADDRESS as ADDRESS, b.LONGTITUDE AS LONGTITUDE, b.LATITUDE AS LATITUDE, b.PHONE AS PHONE, b.COURSEID AS COURSEID, c.NAME AS COURSENAME FROM BRANCHES AS b INNER JOIN COURSES AS c ON c.ID = b.COURSEID',
        function(error, result, next)
        {
          if(error)
          {
            throw error
          }

          else
          {
            response.json(result)
          }
        })
  })
  app.get('/getAllCategories', bodyParser, function(request, response, next)
  {
    var query = 'SELECT C.ID AS CATEGORYID, S.ID AS SUBCATEGORYID, C.NAME AS CATEGORYNAME, S.NAME AS SUBCATEGORYNAME,' +
    'S.IMGPATH AS IMAGEPATH FROM CAT_TO_SUB CT INNER JOIN CATEGORIES C ON CT.CATEGORYID = C.ID INNER JOIN SUBCATEGORY S ON S.ID = CT.SUBCATID'

    connection.query(query,
        function(error, result, next)
        {
          if(error)
          {
            throw error
          }
          else
          {
            response.json(result)
          }
        })
  })

  app.get('/getAllCourses', bodyParser, function(request, response, next)
  {

    var query = 'SELECT C.NAME AS COURSENAME, C.ID AS COURSEID, I.IMAGEPATH FROM COURSES C INNER JOIN IMAGES I ON I.COURSEID = C.ID WHERE I.ISLOGO = 1'

    connection.query(query,
        function(error, result, next)
        {
          if(error)
          {
            throw error
          }
          else
          {
            response.json(result)
          }
        })
  })

  app.get('/getCourseByID/:categoryID/:subcatID', function(request, response, next)
  {

    var query = 'SELECT C.ID AS COURSEID, C.NAME AS COURSENAME, I.IMAGEPATH AS IMAGE, B.ADDRESS AS ADDRESS, SER.NAME AS SERVICENAME, CNT.DATA AS CONTACT FROM COURSETOCATEGORY CC INNER JOIN COURSES C ON C.ID = CC.COURSEID' +
     ' INNER JOIN CAT_TO_SUB CS ON CS.CATEGORYID = CC.CATEGORYID INNER JOIN CATEGORIES CAT ON CAT.ID = CC.CATEGORYID INNER JOIN SUBCATEGORY SC ON SC.ID = CS.SUBCATID INNER JOIN IMAGES I ' +
     ' ON I.COURSEID = C.ID INNER JOIN BRANCHES B ON B.COURSEID = C.ID INNER JOIN SERVICES SER ON SER.COURSEID = C.ID INNER JOIN CONTACTS CNT ON CNT.COURSEID = C.ID WHERE CAT.ID = ' +
     connection.escape(request.params.categoryID) + ' AND SC.ID = ' + connection.escape(request.params.subcatID)

    connection.query(query,
        function(error, result, next)
        {
          if(error)
          {
            throw error
          }
          
          else
          {
            response.json({"myresult" : result})
          }
        })
  })

}

/*    var query = 'SELECT C.ID AS COURSEID, C.NAME AS COURSENAME FROM COURSETOCATEGORY CC INNER JOIN COURSES C ON C.ID = CC.COURSEID' +
 *    'INNER JOIN CAT_TO_SUB CS ON CS.CATEGORYID = CC.CATEGORYID INNER JOIN CATEGORIES CAT ON CAT.ID = CC.CATEGORYID INNER JOIN SUBCATEGORY SC ON SC.ID = CS.SUBCATID WHERE CAT.ID = ' +
 *    connection.escape(cID) + ' AND SC.ID = ' + connection.escape(subcatID)
 */
