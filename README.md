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
* /getAllCourses
   - returns Array< SimplifiedCourse >
* /getCoursesByCategory/{categoryname}
   - returns Array < SimplifiedCourse >
* /getCoursesBySubcategory/{subCategoryname}
   - returns Array< SimplifiedCourse >
* /getCoursesByBoth/{categoryname}/{subCategoryname}
   - returns Array< SimplifiedCourse >
* /getCourseByName/{coursename}
   - returns Course
* /getAllBranches
   - returns Array< Branch >
* /getAllCategories
   - returns Array< Category >
* /getAllContactTypes
   - returns Array< PostContactType >


## Delete Requests
    * /deleteCourse/{coursename}
    * /deleteCategory/{categoryname} 
    - !!! works if category does not contain any course
    * /deleteSubCategory/{subcategoryname}
    - !!! works if category does not contain any course

# Models:

### SubCategory
    "name": String,
    "imgpath": String
    
### Category
    "name": String,
    "subcategories": Array<SubCategory>

### Branch
    "phone": String,
    "latitude": String,
    "longitude": String,
    "address": String"

### Contact
    "contacttype": Int,
    "data": String

### Service
     "name": String,
     "price": Int,
     "description": String
     
### Image 
     "islogo": Bool,
     "imgpath": String
    
### Course
    "name": String,
    "description" : String,
    "branches": Array<Branch>,
    "contacts": Array<Contact>,
    "services": Array<Service>,
    "categories": Array<Category>,
    "images": Array<Image>
    
### SimplifiedCourse
    "name": String,
    "description": String,
    "images": Array<Image>
    
### PostSubCategories
    "name": String,
    "subcategories": Array<SubCategory>
         
### PostContactType
    "contacttypeint": Int,
    "contacttypename: String
    
### ErrorModel
    "error": String
