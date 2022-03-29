const router = require("express").Router();
const PostsController = require('../controllers/PostsController');

// Posts
router.get("/:_id", PostsController.getPost);
router.post("/", PostsController.newPost);
router.put("/", PostsController.updatePost);
router.delete("/:_id", PostsController.deletePost);

// Threads
router.get("/:title", PostsController.getThreadByTitle);
router.get("/id/:_id", PostsController.getThreadById);
router.delete("/delete/:title", PostsController.deleteThread);

// Likes
router.get("/likes/:author", PostsController.totalLikesByAuthor);


module.exports = router;