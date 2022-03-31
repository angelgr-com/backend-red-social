const router = require("express").Router();
const ThreadsController = require('../controllers/ThreadsController');

// Threads
router.post("/", ThreadsController.newThread);
router.get("/:title", ThreadsController.getThread);
router.put("/:title", ThreadsController.editThread);
router.delete("/:title", ThreadsController.deleteThread);

// Posts
router.put("/newComment/:title", ThreadsController.newComment);
// router.get("/id/:_id", ThreadsController.getPost);
// router.put("/", ThreadsController.updatePost);
// router.delete("/id/:_id", ThreadsController.deletePost);

// Likes
// router.get("/likes/:author", ThreadsController.totalLikesByAuthor);
// router.get("/dislikes/:author", ThreadsController.totalDislikesByAuthor);


module.exports = router;