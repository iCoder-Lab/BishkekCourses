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
    "imgPath": String
    
### Category
    "name": String,
    "subCategories": Array<SubCategory>

### Branch
    "phone": String,
    "latitude": String,
    "longitude": String,
    "address": String"

### Contact
    "contactType": Int,
    "data": String

### Service
     "name": String,
     "price": Int,
     "description": String
     
### Image 
     "isLogo": Bool,
     "imagePath": String
    
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
    "categoryName": String,
    "subCategories": Array<SubCategory>
         
### PostContactType
    "contactTypeInt": Int,
    "contactTypeName: String
    
### ErrorModel
    "error": String
