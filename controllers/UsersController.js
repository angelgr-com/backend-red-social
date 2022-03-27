require('dotenv').config();
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const UsersController = {};
const jwt = require("jsonwebtoken");

UsersController.register = async (req, res) => {
    User
    .findOne({
        email: req.body.email,
    })
    .then(user => {
        // Create user if no one is registered with that email
        if (user === null) {
            User.create({
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                avatar: req.body.avatar,
                password: bcrypt.hashSync(
                    req.body.password,
                    Number.parseInt(process.env.AUTH_ROUNDS)
                ),
                isAdmin: req.body.isAdmin
            })
            .then(user => {
                res
                .status(201)
                .send(`${user.name} was successfully registered`);
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

UsersController.findById = async (req, res) => {
    User
    .findById({
        _id: req.params.id,
    })
    .then(user => {
        if (user) {
            res.status(200).json({
                name: user.name,
                nickname: user.nickname,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin
            })
        } else {
            res.status(401).send(
                "User not found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

UsersController.updateById = async (req, res) => {
    User
    .findById({
        _id: req.params.id,
    })
    .then(user => {
        if (user) {
            user.name = req.body.name;
            user.nickname = req.body.nickname;
            user.email = req.body.email;
            user.avatar = req.body.avatar;
            user.isAdmin = req.body.isAdmin;
            user.save();
            res.status(201).send(user);
        } else {
            res.status(401).send(
                "User not found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

UsersController.deleteById = async (req, res) => {
    User
    .findByIdAndDelete({
        _id: req.params.id,
    })
    .then(user => {
        if (user) {
            res.status(201).send(
                "User deleted."
            );
        } else {
            res.status(401).send(
                "User not found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

module.exports = UsersController;
