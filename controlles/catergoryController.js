const categoryModel = require("../models/categoryModel");
const CategoryModel = require("../models/categoryModel");

async function createCatergory(req, res) {
  const title = req.body.title;

  const existing = await CategoryModel.findOne({ title });
  if (existing) {
    console.log(existing);
    return res.status(409).json("Already exist");
  }

  const categoryObj = new CategoryModel({
    title,
  });

  categoryObj.save((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(201).json(data);
  });
}

async function getCategory(req, res) {
  categoryModel.find().exec((err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(data);
    }
  });
}

function deleteCategory(req, res) {
  const title = req.body.title;

  categoryModel.findOneAndDelete({ title }).then((data) => {
    if (!data) {
      return res.status(404).json("Given category does not exist.");
    } else {
      return res.status(200).json("Deleted successfully.");
    }
  });
}

module.exports = {
  getCategory,
  createCatergory,
  deleteCategory,
};
