const mongoose = require("mongoose");
let CategorySchema = new mongoose.Schema(
  
  {
   
    name: String,
    
  },{
    _id: {
      type: String,
      default: () => nanoid(), /// random_string
    },
  }
);
let categoryModel = mongoose.model("categories", CategorySchema);
module.exports = categoryModel;