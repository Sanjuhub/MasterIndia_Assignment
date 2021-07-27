const router = require("express").Router();
const subcatergoryController = require("../controlles/subCategoryController");

//router.get("/category/get", catergoryController.getCategory);
router.post("/subcategory/create", subcatergoryController.createSubCategory);
//router.delete("/category/delete", catergoryController.deleteCategory);

module.exports = router;
