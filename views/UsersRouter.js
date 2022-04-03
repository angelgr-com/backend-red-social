const router = require("express").Router();
const UsersController = require('../controllers/UsersController');
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Register
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

// Profile
router.get("/:id", auth, UsersController.find);
router.put("/:id", auth, UsersController.update);
router.delete("/:id", auth, isAdmin, UsersController.delete);
router.put("/:user/follows/:nickname", auth, UsersController.userFollows);
router.put("/:nickname/add-follower/:user", auth, UsersController.addFollower);
router.get("/following/:id", UsersController.following);
router.get("/followers/:nickname", auth, UsersController.followers);
// router.get("/:id", auth, UsersController.find);
// router.put("/:id", auth, UsersController.update);
// router.delete("/:id", auth, isAdmin, UsersController.delete);
// router.put("/following/add-to/:nickname", auth, UsersController.addFollowing);
// router.put("/followers/add-to/:nickname", auth, UsersController.addFollower);
// router.get("/following/:nickname", auth, UsersController.following);
// router.get("/followers/:nickname", auth, UsersController.followers);

// //superusuario
//Subir de nivel a superusuario de Usuario por id
// router.put('/idAdmin', auth, isAdmin ,  UsersController.idAdmin);

//Convertir en Auth de Usuario por id
// router.put('/idAuth', auth, isAdmin , UsersController.idAuth);


 

// //Subir de nivel a superusuario de Usuario por id
// router.post("/admin", async(req, res) => {
//     try {
//         const user = req.body;
//         res.json(await UsersController.adminUser(user));
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// });
// //http://localhost:3000/Usuarios/actualizar/idAdmin


// //Convertir en Auth de Usuario por id
// router.post("/auth", async(req, res) => {
//     try {
//         const user = req.body;
//         res.json(await UsersController.authUser(user));
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// });

















//GET - Find all data of all clients

// router.get("/", async(req, res) => {
//     try {
//         res.json(await UsersController.findAllUsers());
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// });


// //POST

//Create User

// router.post("/", async(req, res) => {
//     try {
//         const user = req.body;
//         res.json(await UsersController.createUser(user));
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// });

// //Find by email

// router.post('/email', async(req, res) => {
//     try {
//         let email = req.body.email;
//         res.json(await UsersController.findByEmail(email));
//     } catch (err) {
//         return res.status(500).json({
//             message: err.message
//         });
//     }
// });

// //PUT


// //DELETE

// router.delete("/", async(req, res) => {
//     try {
//         const body = req.body;
//         res.json(await UsersController.removeUser(body));
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// });

module.exports = router;