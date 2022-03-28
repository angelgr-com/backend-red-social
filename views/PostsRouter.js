const router = require("express").Router();
const PostsController = require('../controllers/PostsController');

router.post("/", PostsController.new);
router.put("/", PostsController.update);
router.delete("/:_id", PostsController.delete);
router.get("/:title", PostsController.getThread);
router.delete("/delete/:title", PostsController.deleteThread);

module.exports = router;