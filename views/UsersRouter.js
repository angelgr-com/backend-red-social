const router = require("express").Router();

const UsersController = require('../controllers/UsersController');

//CRUD



//Registro
router.post('/registro', UsuariosController.registraUsuario);
//http://localhost:3000/Usuarios/registro


//Registro
router.post("/registro", async(req, res) => {
    try {
        const user = req.body;
        res.json(await UsersController.createUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Users/registro


//Login
router.post("/login", async(req, res) => {
    try {
        let correo = req.body.email;
        let password = req.body.password;
        res.json(await UsersController.loginUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Users/registro



//Login
router.post('/login', UsuariosController.loginUsuarios);
//http://localhost:3000/Usuarios/login


//profile

//Lee Usuario por id
//http://localhost:3000/Usuarios/leer/id/:id
// router.get('/leer/id/:id', auth, isAdmin, UsuariosController.traerUsuarioId);
router.get('/leer/id/:id', async(req, res) => {
    
}auth, isAdmin, UsuariosController.traerUsuarioId);

//Actualizar contraseña de Usuario por id
router.put('/actualizar/newpassword', auth, UsuariosController.updatePasswordId);
//http://localhost:3000/Usuarios/actualizar/newpassword


//Actualizar datos de Usuario por id
router.put('/actualizar/perfilId/:id', UsuariosController.updateProfileId);
//http://localhost:3000/Usuarios/actualizar/email/:id

//Borramos a usuario por id
router.delete('/borrar/id/:id', auth, isAdmin, UsuariosController.deleteById);
//http://localhost:3000/Usuarios/borrar/id/:id


// //superusuario

// //Subir de nivel a superusuario de Usuario por id
// router.put('/actualizar/idAdmin', auth, UsuariosController.idAdmin);
// //http://localhost:3000/Usuarios/actualizar/idAdmin

// //Convertir en Auth de Usuario por id
// router.put('/actualizar/idAuth', auth, UsuariosController.degradeProfileId);
// //http://localhost:3000/Usuarios/actualizar/email/idAuth
















//GET - Find all data of all clients

router.get("/", async(req, res) => {
    try {
        res.json(await UsersController.findAllUsers());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});


//POST

//Create User

router.post("/", async(req, res) => {
    try {
        const user = req.body;
        res.json(await UsersController.createUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

//Find by email

router.post('/email', async(req, res) => {
    try {
        let email = req.body.email;
        res.json(await UsersController.findByEmail(email));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

//PUT


//DELETE

router.delete("/", async(req, res) => {
    try {
        const body = req.body;
        res.json(await UsersController.removeUser(body));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;