const mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
  _id: Number,
  password: String,
  role: Number,
  firstName: String,
  lastName: String,
  email: String,
  address: {
    city: String,
    street: String,
    numBuild: Number,
  },
});
let userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
