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
  CategoryModel.find().exec((err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(data);
    }
  });
}

function deleteCategory(req, res) {
  const title = req.body.title;

  CategoryModel.findOneAndDelete({ title }).then((data) => {
    if (!data) {
      return res.status(404).json("Given category does not exist.");
    } else {
      return res.status(200).json("Deleted successfully.");
    }
  });
}

async function getSubcategory(req, res) {
  const title = req.body.title;

  const findCategory = await CategoryModel.findOne({ title });
  if (!findCategory) {
    return res.json("Unble to find given category.");
  }

  CategoryModel.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "categoryId",
        as: "subcategory",
      },
    },
    { $match: { title } },
    { $project: { _id: 0 } },
  ]).then((err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
}

module.exports = {
  getCategory,
  createCatergory,
  deleteCategory,
  getSubcategory,
};
