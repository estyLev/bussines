const categorysBll = require("../Bll/categoryBll");
const express = require("express");
const app = express();

app.route("/getAllCategorys").get(async (req, res) => {
  let data = await categorysBll.getAll();
  return res.json(data);
});

app.route("/getCategoryById/:id").get(async (req, res) => {
  let id = req.params.id;
  let data = await categorysBll.getCategoryById(id);
  return res.json(data);
});

app.route("/addCategory").post(async (req, res) => {
  let category = req.body;

  let data = await categorysBll.addCategory(category);
  return res.json(data)
});

app.route("/editCategory/:id").put(async (req, res) => {
  let id = req.params.id;
  let category = req.body;
  let data = await categorysBll.editCategory(id, category);
  return res.json(data)
});

app.route("/deleteCategory/:id").delete(async (req, res) => {
  let id = req.params.id;
  let data = await categorysBll.deleteCategory(id);
  return res.json(data)
});

module.exports = app;
