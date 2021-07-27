const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  pname: { type: String, required: true, unique: true },
  pcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  psubcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
