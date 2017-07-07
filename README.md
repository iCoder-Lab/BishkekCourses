# Courses
Back-End for Courses. MongoDB and MySQL versions.

# Use Mongo version.

# Post Requests

* /addCourse
    - takes Course
* /addCategory
    - takes Category
* /addSubCategories
    - takes PostSubCategories

# Get Requests

* /getAllCourses 
   - returns Array<Course>
   
* /getAllBranches
   - returns Array<CourseBranch>
   
* /getAllCategories
   - returns Array<Category>
   
* /getCourses/{subCategory._id}
    returns Array<SimplifiedCourse>
    
* /getCourses/{category._id}
    returns Array<SimplifiedCourse>

* /getCourse/{course._id}
    returns Course


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
     
### CourseBranch

    "_id": String,
    "name": String,
    "branches: Array<Branch>
    
    
### SimplifiedCourse

    "_id": String,
    "name": String,
    "description": String,
    "images": Array<CourseImage>
    
### PostSubCategories

    "categoryId": String,
    "sabCategories": Array<SubCategory>
