# Courses
Back-End for Courses. MongoDB and MySQL versions.


## Post Requests

* /addCourse
    - takes Course
* /addCategory
    - takes Category
* /addSubCategories
    - takes PostSubCategories

## Get Requests

* /getAllCoursesWithDetails
   - returns Array< Course >
* /getAllCoursesWithoutDetails
   - returns Array< Course >
* /getCoursesFromCategory/{category._id}
   - returns Array < SimplifiedCourse >
* /getCoursesFromSubcategory/{category._id}/{subCategory._id}
   - returns Array< SimplifiedCourse >
* /getCourseWithID/{course._id}
   - returns Course
* /getAllBranches
   - returns Array< Branch >
* /getAllCategories
   - returns Array< Category >

## Delete Requests
    * /course/{course._id}
    * /category/{category._id} 
    - !!! works if category does not contain any course
    * /subCategory/{subCategory._id}
    - !!! works if category does not contain any course

# Models:

### SubCategory
    "_id": String,
    "name": String,
    "imagePath": String
    
### Category
    "_id": String,
    "name": String,
    "subCategories": Array<SubCategory>

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
     
### Image 
     "_id": String,
     "isLogo": Bool,
     "imagePath": String
    
### Course
    "_id": String,
    "name": String,
    "description" : String,
    "branches": Array<Branch>,
    "contacts": Array<Contact>,
    "services": Array<Service>,
    "categories": Array<Category>,
    "images": Array<Image>
     
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
    "subCategories": Array<SubCategory>
    
    
### ErrorModel
    "error": String

