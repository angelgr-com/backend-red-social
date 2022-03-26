const router = require("express").Router();

const UsersController = require('../controllers/UsersController');

//CRUD



//Registro
router.post("/register", async(req, res) => {
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
        res.json(await UsersController.loginUser(correo));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Users/login




//profile

//Lee Usuario por id
router.get("/read/id/:id", async(req, res) => {
    try {
        let id = req.params.id
        res.json(await UsersController.findUser(id));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Users/leer/id/:id



//Actualizar datos de Usuario por id
router.put("/updadate/profileId/:id", async(req, res) => {
    try {
        const user = req.body;
        res.json(await UsersController.updateUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Users/actualizar/email/:id


//Borramos a usuario por id
router.delete("/delete/id/:id", async(req, res) => {
    try {
        let id = req.params.id
        res.json(await UsersController.removeUser(id));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Usuarios/borrar/id/:id





//superusuario

//Subir de nivel a superusuario de Usuario por id
router.post("/admin", async(req, res) => {
    try {
        const user = req.body;
        res.json(await UsersController.adminUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
//http://localhost:3000/Usuarios/actualizar/idAdmin


//Convertir en Auth de Usuario por id
router.post("/auth", async(req, res) => {
    try {
        const user = req.body;
        res.json(await UsersController.authUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

















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