const router = require("express").Router();
const productController = require("../controlles/productController");

router.post("/product/create", productController.createProduct);
router.get("/product/get", productController.getProduct);
router.get("/product/getbycategory", productController.getProductBycategory);
router.get(
  "/product/getbysubcategory",
  productController.getProductBySubcategory
);

module.exports = router;
