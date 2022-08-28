const jfiles = require("jsonfile");
const productModel = require("../models/productsModel");

const getAll = () => {
  return new Promise((resolve, reject) => {
    productModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    productModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const editProduct = (id, newProduct) => {
  return new Promise((resolve, reject) => {
    productModel.findByIdAndUpdate(
      id,
      {
        id: newProduct.id,
        name: newProduct.name,
        categoryCode: newProduct.categoryCode,
        price: newProduct.price,
        units: newProduct.units,
        src: newProduct.src,
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

const addProduct = (newProduct) => {
  return new Promise((resolve, reject) => {
    let product = new productModel({
      id: newProduct.id,
      name: newProduct.name,
      categoryCode: newProduct.categoryCode,
      price: newProduct.price,
      units: newProduct.units,
      src: newProduct.src,
    });
    product.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    productModel.findByIdAndDelete(id, function (err, data) {
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
  getProductById,
  editProduct,
  addProduct,
  deleteProduct,
};
