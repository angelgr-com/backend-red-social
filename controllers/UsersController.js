require('dotenv').config();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const UsersController = {};
const jwt = require('jsonwebtoken');

const isUserOwnData = (req) => {
    let loggedUser;
    // Check token validity
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid token: ', err);
        } else {
            loggedUser = decoded;
        }
    });

    return loggedUser.user._id === req.params.id;
};

UsersController.register = async (req, res) => {
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
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
                    res.status(200).send(user);
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
    if (isUserOwnData(req)) {
        User.find({
            $or: [
                { _id: req.params.id },
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
    User.find({
        $or: [
            { _id: req.params.id },
            { nickname: req.params.id },
            { email: req.params.id },
        ],
    })
        .then((user) => {
            if (user) {
                user.name = req.body.name;
                user.nickname = req.body.nickname;
                user.email = req.body.email;
                user.avatar = req.body.avatar;
                user.save();
                res.status(201).send(user);
            } else {
                res.status(401).send('User not found.');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

UsersController.delete = async (req, res) => {
    User.findByIdAndDelete({
        $or: [
            { _id: req.params.id },
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
};

UsersController.addFollowing = async (req, res) => {
    User.find({
        nickname: req.params.nickname,
    })
        .then((user) => {
            if (user) {
                user[0].following.push(req.body.follow);
                user[0].save();
                res.status(201).send(
                    `${req.params.nickname} now follows ${req.body.follow}`
                );
            } else {
                res.status(401).send('Thread not found.');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
            console.log(error);
        });
};

UsersController.addFollower = async (req, res) => {
    User.find({
        nickname: req.params.nickname,
    })
        .then((user) => {
            if (user) {
                user[0].followers.push(req.body.follower);
                user[0].save();
                res.status(201).send(
                    `${req.params.nickname} has a new follower: ${req.body.follower}`
                );
            } else {
                res.status(401).send('Thread not found.');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
            console.log(error);
        });
};

UsersController.following = async (req, res) => {
    User.find({
        nickname: req.params.nickname,
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
};

UsersController.followers = async (req, res) => {
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
