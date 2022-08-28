const mongoose = require("mongoose");
let ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  categoryCode: Number,
  price: Number,
  units: Number,
  src: String,
});
let productModel = mongoose.model("Products", ProductSchema);
module.exports = productModel;
