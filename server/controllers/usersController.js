const usersBll = require("../Bll/usersBll");
//import usersBll from '../Bll/usersBll';
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

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

app.route("/getAllUsers").get(authenticateJWT, async (req, res) => {
  let data = await usersBll.getAll();
  return res.json(data);
});

app.route("/getUserById/:id").get(authenticateJWT, async (req, res) => {
  let id = req.params.id;
  let data = await usersBll.getUserById(id);
  return res.json(data);
});

app.route("/addUser").post(async (req, res) => {
  let User = req.body;

  let data = await usersBll.addUser(User);

  return res.json(data);
});

app.route("/editUser/:id").put(async (req, res) => {
  let id = req.params.id;
  let User = req.body;
  let data = await usersBll.editUser(id, User);
  return res.json(data);
});

app.route("/deleteUser/:id").delete(async (req, res) => {
  let id = req.params.id;
  let data = await usersBll.deleteUser(id);
  return res.json(data);
});
app.route("/login").post(async(req,res)=>{
  let password= req.body.password;
  let email=req.body.email;
  let data = await usersBll.login(email,password);
  return res.json(data);
})
module.exports = app;
