require('dotenv').config();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const UsersController = {};
const jwt = require('jsonwebtoken');
const isAccessGranted = require("../middlewares/isAccessGranted");

UsersController.register = async (req, res) => {
    console.log(req);
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            req.body.name === undefined
                ? req.body.name = user.name
                : req.body.name = req.body.name;
            req.body.nickname === undefined
                ? req.body.nickname = user.nickname
                : req.body.nickname = req.body.nickname;
            req.body.email === undefined
                ? req.body.email = user.email
                : req.body.email = req.body.email;
            req.body.avatar === undefined
                ? req.body.avatar = user.avatar
                : req.body.avatar = req.body.avatar;
            req.body.password === undefined
                ? req.body.password = user.password
                : req.body.password = req.body.password;
            req.body.isAdmin === undefined
                ? req.body.isAdmin = user.isAdmin
                : req.body.isAdmin = req.body.isAdmin;
            
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
                    isAdmin: req.body.isAdmin,
                })
                    .then((user) => {
                        res.status(201).send(
                            `${user.name} was successfully registered`
                        );
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    });
            } else {
                res.send(
                    'A user with this e-mail already exists in our database.'
                );
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

UsersController.login = async (req, res) => {
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(
                        { user: user },
                        process.env.AUTH_SECRET,
                        {
                            expiresIn: process.env.AUTH_EXPIRES,
                        }
                    );
                    res.status(200).send({
                        _id: user._id,
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email,
                        avatar: user.avatar,
                        following: user.following,
                        followers: user.followers,
                        isAdmin: user.isAdmin,
                        token: token
                    });
                } else {
                    res.status(401).json({ msg: 'Invalid user or password.' });
                }
            } else {
                res.send('Invalid user or password.');
            }
        })
        .catch((error) => {
            res.send(error);
        });
};

UsersController.find = async (req, res) => {
    if (isAccessGranted(req)) {
        User.find({
            $or: [
                { nickname: req.params.id },
                { email: req.params.id },
            ],
        })
            .then((user) => {
                if (user) {
                    res.status(200).json({
                        name: user[0].name,
                        nickname: user[0].nickname,
                        avatar: user[0].avatar,
                        following: user[0].following,
                        followers: user[0].followers,
                    });
                } else {
                    res.status(401).send('User not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    } else {
        res.status(401).send('Unauthorized access');
    }
};

UsersController.update = async (req, res) => {
    if (isAccessGranted(req)) {
        User.find({
            $or: [
                { nickname: req.params.id },
                { email: req.params.id },
            ],
        })
            .then((user) => {
                req.body.name === undefined
                ? req.body.name = user.name
                : req.body.name = req.body.name;
                req.body.nickname === undefined
                    ? req.body.nickname = user.nickname
                    : req.body.nickname = req.body.nickname;
                req.body.email === undefined
                    ? req.body.email = user.email
                    : req.body.email = req.body.email;
                req.body.avatar === undefined
                    ? req.body.avatar = user.avatar
                    : req.body.avatar = req.body.avatar;
                req.body.password === undefined
                    ? req.body.password = user.password
                    : req.body.password = req.body.password;
                req.body.isAdmin === undefined
                    ? req.body.isAdmin = user.isAdmin
                    : req.body.isAdmin = req.body.isAdmin;
                if (user) {
                    user[0].name = req.body.name;
                    user[0].nickname = req.body.nickname;
                    user[0].email = req.body.email;
                    user[0].avatar = req.body.avatar;
                    user[0].save();
                    res.status(201).send(user);
                } else {
                    res.status(401).send('User not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    } else {
        res.status(401).send('Unauthorized access. Users can only update their own threads or comments.');
    }
};

UsersController.delete = async (req, res) => {
    if (isAccessGranted(req)) {
        User.deleteOne({
            $or: [
                { nickname: req.params.id },
                { email: req.params.id },
            ],
        })
            .then((user) => {
                if (user) {
                    res.status(201).send('User deleted.');
                } else {
                    res.status(400).send('User not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    } else {
        res.status(401).send('Unauthorized access. Users can delete only their own threads or comments.');
    }
};

UsersController.userFollows = async (req, res) => {
    // if (isAccessGranted(req)) {
        User.find({
            nickname: req.params.user,
        })
            .then((user) => {
                if (user) {
                    user[0].following.push(req.params.nickname);
                    user[0].save();
                    res.status(201).send(
                        `${req.params.user} now follows ${req.params.nickname}`
                    );
                } else {
                    res.status(401).send('Thread not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            });
    // } else {
    //     res.status(401).send('Unauthorized access');
    // }
};

UsersController.addFollower = async (req, res) => {
    // if (isAccessGranted(req)) {
        User.find({
            nickname: req.params.nickname,
        })
            .then((user) => {
                if (user) {
                    user[0].followers.push(req.params.user);
                    user[0].save();
                    res.status(201).send(
                        `${req.params.nickname} has a new follower: ${req.params.user}`
                    );
                } else {
                    res.status(401).send('Thread not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            });
    // } else {
    //     res.status(401).send('Unauthorized access');
    // }
};

UsersController.following = async (req, res) => {
    // if (isAccessGranted(req)) {
        User.find({
            nickname: req.params.id,
        })
            .then((user) => {
                if (user) {
                    res.status(201).send(user[0].following);
                } else {
                    res.status(401).send('Thread not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            });
    // } else {
    //     res.status(401).send('Unauthorized access.');
    // }
};

UsersController.followers = async (req, res) => {
    // if (isAccessGranted(req)) {
        User.find({
            nickname: req.params.nickname,
        })
            .then((user) => {
                if (user) {
                    res.status(201).send(user[0].followers);
                } else {
                    res.status(401).send('Thread not found.');
                }
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            });
    // } else {
    //     res.status(401).send('Unauthorized access');
    // }
};

// Actualizar a admin del user por id
// UsersController.idAdmin = (req, res) => {
//     let id = req.body.id;
//     let highPassword = req.body.highPassword;
//     let newRol;

//     User
//     .findOne({
//         where: {
//             nickname: req.params.nickname
//         }
//     })
//     .then(userFound => {
//         if (userFound) {
//             //console.log("holaaaaaaaaaaaaaaaaaaaaaaa", userFound);
//             if (userFound.isAdmin === false) {
//                 //En caso de que el rol antiguo SI sea el correcto....
//                 //1er paso..encriptamos el nuevo password....
//                 newRol = true;
//                 ////////////////////////////////7
//                 //2do paso guardamos el nuevo password en la base de datos
//                 let data = {
//                     ifAdmin: newRol
//                 }
//                 //console.log("esto es data", data);
//                 user
//                 .update(data, {
//                         where: {
//                             id: id
//                         }
//                     })
//                 .then(updated => {
//                     res.send(updated);
//                 })
//                 .catch((error) => {
//                     res.status(401).json({
//                         msg: `Ha ocurrido un error actualizando el password`
//                     });
//                 });

//             } else {
//                 res.status(401).json({
//                     msg: "Tu user ya es Admin"
//                 });
//             }
//         } else {
//             res.send(`user no encontrado`);
//         }
//     }).catch((error => {
//         res.send(error);
//     }));
// };

//Actualizar a auth del user por id
//   UsersController.idAuth = (req, res) => {

//     let id = req.body.id;
//     let highPassword = req.body.highPassword;
//     let newRol;
//     if (highPassword === `${constHighPassword}`) {

//         user.findOne({
//             where: {
//                 id: id
//             }
//         }).then(userFound => {

//             if (userFound) {

//                 if (userFound.rol === true) {

//                     //En caso de que el rol antiguo SI sea el correcto....

//                     //1er paso..encriptamos el nuevo password....

//                     newRol = false;

//                     ////////////////////////////////7

//                     //2do paso guardamos el nuevo password en la base de datos

//                     let data = {
//                         rol: newRol
//                     }

//                     //console.log("esto es data", data);

//                     user.update(data, {
//                             where: {
//                                 id: id
//                             }
//                         })
//                         .then(updated => {
//                             res.send(updated);
//                         })
//                         .catch((error) => {
//                             res.status(401).json({
//                                 msg: `Ha ocurrido un error actualizando el password`
//                             });
//                         });

//                 } else {
//                     res.status(401).json({
//                         msg: "Tu user ya es Auth"
//                     });
//                 }

//             } else {
//                 res.send(`user no encontrado`);
//             }

//         }).catch((error => {
//             res.send(error);
//         }));

//     } else {
//         res.send(`Contraseña de admin incorrecta`);
//     }
// };

module.exports = UsersController;
