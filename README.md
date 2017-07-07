# Courses
Back-End for Courses. MongoDB and MySQL versions.

# Use Mongo version.

# Post Requests

To add a Course: /addCourse + JSON

# Get Requests

To get name, id, imagePath of all Courses :      /getAllCourses

To get All branches -> id (course id), name (course name), address, longtitude, latitude, phone, id (branch id):     /getAllBranches

To get All Categories -> id (course id), imagePath, name (category name), id (category id), name (subcategory name), imagePath: /getAllCategories


# Models:

### Category

    "_id": String,
    "name": String,
    "sabCategories": Array<SubCategory>

### SubCategory

    "_id": String,
    "name": String,
    "imagePath": String

### Course

    "_id": String,
    "name": String,
    "description" : String,
    "branches": Array<Branch>,
    "contacts": Array<Contact>,
    "services": Array<Service>,
    "categories": Array<Category>,
    "images": Array<CourseImage>

### Branch

    "_id": String,
    "phone": String,
    "latitude": String,
    "longitude": String,
    "address": String"

### Contact

    "_id": String,
    "contactType": Int,
    "data": String

### Service

     "_id": String,
     "name": String,
     "price": Int,
     "description": String
     
### CourseImage 

     "_id": String,
     "isLogo": Bool,
     "imagePath": String
