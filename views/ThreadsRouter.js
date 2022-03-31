const router = require("express").Router();
const ThreadsController = require('../controllers/ThreadsController');

// Threads
router.post("/", ThreadsController.newThread);
router.get("/:title", ThreadsController.getThread);
router.put("/:title", ThreadsController.editThread);
router.delete("/:title", ThreadsController.deleteThread);

// Posts
router.get("/comments/all/:title", ThreadsController.getComments);
router.put("/comments/new/:title", ThreadsController.newComment);
router.put("/comments/edit/:title", ThreadsController.editComment);
router.delete("/comments/delete/:index/:title", ThreadsController.deleteComment)
// router.put("/", ThreadsController.updatePost);
// router.delete("/id/:_id", ThreadsController.deletePost);

// Likes
router.put("/likes/:title", ThreadsController.newLike);
// router.get("/likes/:author", ThreadsController.totalLikesByAuthor);
// router.get("/dislikes/:author", ThreadsController.totalDislikesByAuthor);


module.exports = router;