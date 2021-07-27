const subcategoryModel = require("../models/subcategoryModel");
const CategoryModel = require("../models/categoryModel");
var ObjectID = require("mongodb").ObjectID;

async function createSubCategory(req, res) {
  const title = req.body.title;
  const categoryId = req.body.categoryId;
  console.log(categoryId);

  const existingsubCat = await subcategoryModel.findOne({ title });
  if (existingsubCat) {
    return res.status(409).json("Already exist");
  }

  if (!ObjectID.isValid(categoryId)) {
    return res.status(406).json("Given CategoryId is not valid.");
  }

  const findCategory = await CategoryModel.findById(categoryId);

  if (!findCategory) {
    return res.status(404).json("Unable to find the category.");
  }

  const newsubCategory = new subcategoryModel({
    title: title,
    categoryId: categoryId,
  });

  newsubCategory.save((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(201).json(data);
  });
}

module.exports = {
  createSubCategory,
};
