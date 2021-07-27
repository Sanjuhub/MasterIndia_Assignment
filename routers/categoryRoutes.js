const router = require("express").Router();
const catergoryController = require("../controlles/catergoryController");
const categoryModel = require("../models/categoryModel");

router.get("/category/get", catergoryController.getCategory);
router.post("/category/create", catergoryController.createCatergory);
router.delete("/category/delete", catergoryController.deleteCategory);

module.exports = router;
