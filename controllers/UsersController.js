require('dotenv').config();
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const UsersController = {};
// const jwt = require("jsonwebtoken");

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

UsersController.login = async (req, res) => {
    User
    .findOne({
        email: req.body.email,
    })
    .then((user) => {
        if (!user) {
            res.send("Invalid user or password.");
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({ user: user },
                                     process.env.AUTH_ROUNDS,
                                     { expiresIn: process.env.AUTH_EXPIRES }
                );
                user.token = token;
                res.json({
                    user: user,
                    token: token
                });
            } else {
                res.status(401).json({ msg: "Invalid user or password." });
            }
        }
    })
    .catch((error) => {
        res.send(error);
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
            res.status(400).send(
                "User not found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

//Actualizar a admin del user por id
// UsersController.idAdmin = (req, res) => {
//     let id = req.body.id;
//     let highPassword = req.body.highPassword;
//     let newRol;
  
//         User.findOne({
//             where: {
//                 id: id
//             }
//         }).then(userFound => {
  
//             if (userFound) {
//                 //console.log("holaaaaaaaaaaaaaaaaaaaaaaa", userFound);
//                 if (userFound.rol === false) {
  
//                     //En caso de que el rol antiguo SI sea el correcto....
  
//                     //1er paso..encriptamos el nuevo password....
  
//                     newRol = true;
  
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
//                         msg: "Tu user ya es Admin"
//                     });
//                 }
  
  
//             } else {
//                 res.send(`user no encontrado`);
//             }
  
//         }).catch((error => {
//             res.send(error);
//         }));
  

  
//   };
  
  
//   //Actualizar a auth del user por id
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
