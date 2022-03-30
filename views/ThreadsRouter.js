const router = require("express").Router();
const ThreadsController = require('../controllers/ThreadsController');

// Posts
router.get("/id/:_id", ThreadsController.getPost);
router.post("/", ThreadsController.newPost);
router.put("/", ThreadsController.updatePost);
router.delete("/id/:_id", ThreadsController.deletePost);

// Threads
router.get("/:title", ThreadsController.getThreadByTitle);
router.get("/thread/:_id", ThreadsController.getThreadById);
router.delete("/:title", ThreadsController.deleteThread);

// Likes
router.get("/likes/:author", ThreadsController.totalLikesByAuthor);
router.get("/dislikes/:author", ThreadsController.totalDislikesByAuthor);


module.exports = router;