var bodyParser = require('body-parser').json()
//var urlParser = bodyParser.urlencoded({extended: false})
var connection = require('./connection')

module.exports = function(app)
{
  app.get('/', function(request, response)
  {
    response.render('main')
  })

  app.post('/addCourse', bodyParser, function(request, response, next)
  {
    try
    {
      var file = request.body

      var branches = file.branches
      var categories = file.category
      var contacts = file.contacts
      var description = file.description
      var images = file.images
      var name = file.name
      var services = file.services

      console.log(categories);
      connection.query('INSERT INTO COURSES(DESCRIPTION, NAME) VALUES (' + connection.escape(description) + ', ' + connection.escape(name) + ')',
          function(error, result, next)
          {
            if(error)
            {
              console.log(error)
              throw error;
              //return next(error)
            }

          })
      var courseID = 0;
      connection.query('SELECT MAX(ID) AS ID FROM COURSES;', function(error, result)
      {
        if(error)
        {
          console.log(error)
          return next(error)
        }

        else
        {
          courseID = result[0].ID
          console.log(courseID)
        }
      })

      for(branch in branches)
      {
        console.log("Branch -> Longtitude " + parseFloat(branches[branch].longitude));
        console.log("Branch -> Latitude -> " + parseFloat(branches[branch].latitude));
        console.log("Branch -> Address -> " + branches[branch].address);
        console.log("Branch -> Phone -> " + branches[branch].phone);

        connection.query('INSERT INTO BRANCHES(ADDRESS, LONGTITUDE, LATITUDE, PHONE, COURSEID) VALUES(' +
          connection.escape(branches[branch].address) + ', ' + connection.escape(parseFloat(branches[branch].longitude)) + ', ' +
          connection.escape(parseFloat(branches[branch].latitude)) + ', ' + connection.escape(branches[branch].phone) +
          ', (SELECT MAX(ID) FROM COURSES))', function(error, result, next)
          {
            if(error)
            {
              console.log(error)
              return next(error)
            }
          })
      }

      for(contact in contacts)
      {

        console.log("Contacts -> Data -> " + contacts[contact].data);
        connection.query('INSERT INTO CONTACTS(DATA, COURSEID, CONTACTTYPEID) VALUES(' + connection.escape(contacts[contact].data) + ', (' +
        'SELECT MAX(ID) FROM COURSES), ' + '(SELECT ID FROM CONTACTTYPES WHERE NAME = ' + connection.escape(contacts[contact].contactType) +'))', function(error, result, next)
        {
          if(error)
          {
            console.log(error)
            return next(error)
          }
        })
      }

      for(image in images)
      {
        console.log("Image -> ImagePath -> " + images[image].imagePath)
        console.log("Image -> Islogo -> " + images[image].isLogo)

        connection.query('INSERT INTO IMAGES(IMAGEPATH, ISLOGO, COURSEID) VALUES (' +
        connection.escape(images[image].imagePath) + ', ' + connection.escape(images[image].isLogo) +
        ', (' +   'SELECT MAX(ID) FROM COURSES' + '))', function(error, result, next)
        {
          if(error)
          {
            console.log(error)
            return next(error)
          }
        })
      }

      for(service in services)
      {
        console.log("Service -> Description -> " + services[service].description)
        console.log("Service -> Name -> " + services[service].name)
        console.log("Service -> Price -> " + services[service].price)

        connection.query('INSERT INTO SERVICES(DESCRIPTION, NAME, price, COURSEID) VALUES (' +
        connection.escape(services[service].description) + ', ' + connection.escape(services[service].name) + ', ' +
        connection.escape(services[service].price) + ', (' + 'SELECT MAX(ID) FROM COURSES' + '))', function(error, result, next)
        {
          if(error)
          {
            console.log(error)
            return next(error)
          }
        })
      }

      for(var i = 0; i < categories.length; i++)
      {
        console.log("Category -> Name -> " + categories[i].name)
        var cat = categories[i].name
        var checkCat = 'select id from categories where name = ' + connection.escape(cat)
        connection.query(checkCat, function(err, res)
        {
          if(err) throw err

          if(res.length < 1)
          {
            connection.query('INSERT INTO CATEGORIES(NAME) VALUES(' +
              connection.escape(cat) + ')', function(error, result)
              {
              })
          }
        })



          for(var j = 0; j < categories[i].subCategory.length; j++)
          {
            console.log("Subcat -> " + categories[i].subCategory[j])
            connection.query('INSERT INTO SUBCATEGORY(NAME, IMGPATH) VALUES(' +
            connection.escape(categories[i].subCategory[j].name) + ', ' + connection.escape(categories[i].subCategory[j].imgPath) + ')', function(error, result)
              {
                if(error)
                {
                  console.log(error)
                  return next(error)
                }
              })
          }
      }

      connection.query('INSERT INTO COURSETOCATEGORY(COURSEID, CATEGORYID) VALUES((SELECT MAX(ID) FROM COURSES), (SELECT MAX(ID) FROM CATEGORIES))', function(error, result, next)
        {
          if(error)
          {
            console.log(error)
            return next(error)
          }
        })

      connection.query('INSERT INTO CAT_TO_SUB(CATEGORYID, SUBCATID) VALUES((SELECT MAX(ID) FROM CATEGORIES), (SELECT MAX(ID) FROM SUBCATEGORY))', function(error, result, next)
        {
          if(error)
          {
            console.log(error)
            return next(error)
          }
        })
      response.send(branches)
      console.log(branches[0])
    }

    catch (e)
    {
      console.log(e)
    }

    finally
    {
      console.log('There was an Internal Error...')
    }

  })

  app.delete('/', function(request, response)
  {

  })

}
