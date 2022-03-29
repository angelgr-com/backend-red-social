const router = require("express").Router();
const PostsController = require('../controllers/PostsController');

// Posts
router.get("/id/:_id", PostsController.getPost);
router.post("/", PostsController.newPost);
router.put("/", PostsController.updatePost);
router.delete("/id/:_id", PostsController.deletePost);

// Threads
router.get("/:title", PostsController.getThreadByTitle);
router.get("/thread/:_id", PostsController.getThreadById);
router.delete("/:title", PostsController.deleteThread);

// Likes
router.get("/likes/:author", PostsController.totalLikesByAuthor);


module.exports = router;