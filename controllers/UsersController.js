require('dotenv').config();
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const UsersController = {};
const jwt = require("jsonwebtoken");

UsersController.userRegister = async (req, res) => {
    let name = req.body.name;
    let nickname = req.body.nickname;
    let email = req.body.email;
    let password = bcrypt.hashSync(
        req.body.password,
        Number.parseInt(process.env.AUTH_ROUNDS)
        );
    let avatar = req.body.avatar;
    let isAdmin = req.body.isAdmin;
  
    User.find({
      email: email,
    })
      .then((datosRepetidos) => {
        if (datosRepetidos == false) {
          User.create({
            name: name,
            nickname: nickname,
            email: email,
            avatar: userName,
            password: password,
            isAdmin: isAdmin
          })
            .then((user) => {
              res.send(`${user.firstName}, successfully registered`);
            })
            .catch((error) => {
              res.send(error);
            });
        } else {
          res.send(
            "The user with this e-mail already exists in our database."
          );
        }
      })
      .catch((error) => {
        res.send(error);
      });
      
  };

  module.exports = UsersController;
