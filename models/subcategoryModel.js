const mongoose = require("mongoose");
const category = require("./categoryModel");

const subCategorySchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  cate
});

module.exports = mongoose.model("SubCategory", categorySchema);
