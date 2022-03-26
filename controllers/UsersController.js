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
     
    User
    .findOne({
        email: email,
    })
    .then(user => {
        // Create user if no one is registered with that email
        if (user === null) {
            User.create({
                name: name,
                nickname: nickname,
                email: email,
                avatar: avatar,
                password: password,
                isAdmin: isAdmin
            })
            .then(user => {
                res.status(201).send(`${user.name} was successfully registered`);
            })
            .catch(error => {
                res.status(400).send(error);
            });
        } else {
            res.send(
                "A user with this e-mail already exists in our database."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
  };

  module.exports = UsersController;
