# Node Js Application

## API Endpoints Details:

### 1. API to get all categories

GET: api/category/get

Return all the categories

### 2. API to get subcategories for a category

GET: api/getsubcategory

Request body must have { title } field.

### 3. API to get all products for a category

GET: api/product/getbycategory

Request body must have { title } field.

### 4. API to get all products for a subcategory

GET: api/product/getbysubcategory

Request body must have { title } field.

### 5. - API to post new product under existing subcategory and category

POST: api/product/create

Request body must have following fields { pname, categoryId, subcategoryId }
