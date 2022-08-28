//const { response } = require("../controllers/products");
const userModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const getAll = () => {
  return new Promise((resolve, reject) => {
    userModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    userModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const editUser = (id, newuser) => {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndUpdate(
      id,
      {
        _id: newuser._id,
        password: newuser.password,
        role: newuser.role,
        firstName: newuser.firstName,
        lastName: newuser.lastName,
        email: newuser.email,
        address: newuser.address,
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

const addUser = (newuser) => {
  return new Promise(async(resolve, reject) => {
    const users =await getAll().then(
      (data) => {
        return data;
      },
      function (err, data) {
        if (err) reject(err);
      }
    );

    const email = users.find(
      (us) => {
        return us.email == newuser.email;
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
    if (!email) {
      let user = new userModel({
        _id: newuser._id,
        password: newuser.password,
        role: newuser.role,
        firstName: newuser.firstName,
        lastName: newuser.lastName,
        email: newuser.email,
        address: newuser.address,
      });
      user.save(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Created !");
        }
      });
    } else reject("email is exsist");
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndDelete(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    
    let users = await getAll().then((data) => {
      return data;
    });

    const user = users.find((u) => {
      return u.email == email && u.password == password;
    });
    if (user) {
      const accessTokensecret = "bussinesToken";
      const refreshTokenSecret = "someRandomStringForRefresh";
      let refreshTokens = [];

      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        accessTokensecret
      );
      const refreshToken = jwt.sign(
        { email: user.email, role: user.role },
        refreshTokenSecret
      );

      refreshTokens.push(refreshToken);
      resolve({accessToken, refreshToken});
    }
    else 
    reject("email or password incorrect")
  });
};
module.exports = {
  getAll,
  getUserById,
  editUser,
  addUser,
  deleteUser,
  login
};
