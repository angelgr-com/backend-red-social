const router = require("express").Router();
const PostsController = require('../controllers/PostsController');

router.post("/", PostsController.new);
router.put("/", PostsController.update);
router.delete("/", PostsController.delete);

module.exports = router;