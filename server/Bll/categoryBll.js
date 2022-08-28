const categoryModel = require("../models/categoryModel");

const getAll = () => {
  return new Promise((resolve, reject) => {
    categoryModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    categoryModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const editCategory = (id, newcategory) => {
  return new Promise((resolve, reject) => {
    categoryModel.findByIdAndUpdate(
      id,
      {
        id: newcategory.id,
        name: newcategory.name,
       
      },
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Updated !");
        }
      }
    );
  });
};

const addCategory = (newcategory) => {
  return new Promise((resolve, reject) => {
    let category = new categoryModel({
      id: newcategory.id,
      name: newcategory.name,
      
    });
    category.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    categoryModel.findByIdAndDelete(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

module.exports = {
  getAll,
  addCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
};
