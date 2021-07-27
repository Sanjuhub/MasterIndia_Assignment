const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const subcategoryModel = require("../models/subcategoryModel");
const ObjectID = require("mongodb").ObjectID;

async function createProduct(req, res) {
  const pname = req.body.pname;
  const cateId = req.body.categoryId;
  const subcateId = req.body.subcategoryId;

  const existingProduct = await productModel.findOne({ pname });
  if (existingProduct) return res.json("Product already exist.");

  if (!ObjectID.isValid(cateId) || !ObjectID.isValid(subcateId)) {
    return res.json("Given categoryId/subcategoryId is not valid.");
  }

  const findCategory = await categoryModel.findById(cateId);
  const findSubcategory = await subcategoryModel.findById(subcateId);

  if (!findCategory || !findSubcategory) {
    if (!findCategory) {
      res.write("Unable to find the category.");
    }
    if (!findSubcategory) {
      res.write("Unable to find the subcategory.");
    }
    return res.send();
  }

  const newProduct = new productModel({
    pname: pname,
    pcategoryId: cateId,
    psubcategoryId: subcateId,
  });

  newProduct.save((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}

function getProduct(req, res) {
  productModel.find().then((err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
}

async function getProductBycategory(req, res) {
  category = req.body.title;

  const existcategory = await categoryModel.findOne({ title: category });
  if (!existcategory) {
    return res.status(404).json("Unable to find given category.");
  }

  categoryModel
    .aggregate([
      { $match: { title: category } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "pcategoryId",
          as: "productDetails",
        },
      },
      { $project: { _id: 0, title: 1, "productDetails.pname": 1 } },
    ])
    .then((err, data) => {
      if (err) {
        return res.json(err);
      } else {
        res.json(data);
      }
    });
}

async function getProductBySubcategory(req, res) {
  const subcategory = req.body.title;
  const existsubcat = await subcategoryModel.findOne({ title: subcategory });

  if (!existsubcat) {
    return res.status(404).json("Unable to find given subcategory.");
  }

  subcategoryModel
    .aggregate([
      { $match: { title: subcategory } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "psubcategoryId",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryDetail",
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          "productDetails.pname": 1,
          "categoryDetail.title": 1,
        },
      },
    ])
    .then((err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
}

module.exports = {
  createProduct,
  getProduct,
  getProductBycategory,
  getProductBySubcategory,
};
