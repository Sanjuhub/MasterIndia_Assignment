const router = require("express").Router();
const catergoryController = require("../controlles/catergoryController");

router.get("/category/get", catergoryController.getCategory);
router.get("/getsubcategory", catergoryController.getSubcategory);
router.post("/category/create", catergoryController.createCatergory);
router.delete("/category/delete", catergoryController.deleteCategory);

module.exports = router;
