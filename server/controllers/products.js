const productsBll = require("../Bll/productBll");
const express = require("express");
const app = express()
const jwt = require("jsonwebtoken");


const accessTokensecret = "bussinesToken";
const refreshTokenSecret = "someRandomStringForRefresh";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokensecret, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
app.route("/getAllProducts").get(authenticateJWT, async (req, res) => {
  let data = await productsBll.getAll();
  return res.json(data);
});

app.route("/getProductById/:id").get(async (req, res) => {
  let id = req.params.id;
  let data = await productsBll.getProductById(id);
  return res.json(data);
});

app.route("/addProduct").post(async (req, res) => {
  let product = req.body;

  let data = await productsBll.addProduct(product);
  return res.json(data)
});

app.route("/editProduct/:id").put(async (req, res) => {
  let id = req.params.id;
  let product = req.body;
  let data = await productsBll.editProduct(id, product);
  return res.json(data)
});

app.route("/deleteProduct/:id").delete(async (req, res) => {
  let id = req.params.id;
  let data = await productsBll.deleteProduct(id);
  return res.json(data)
});

module.exports = app;
