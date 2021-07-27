const mongoose = require("mongoose");
const categoryModel = require("./categoryModel");

const subCategorySchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
