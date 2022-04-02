const router = require("express").Router();
const ThreadsController = require('../controllers/ThreadsController');
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Threads
router.post("/", ThreadsController.newThread);
router.get("/", ThreadsController.getAllThreads);
router.get("/:title", ThreadsController.getThread);
router.get("/theme/:theme", ThreadsController.getThreadsByTheme);
router.put("/:title", ThreadsController.editThread);
router.delete("/:id", ThreadsController.deleteThread);
// router.post("/", auth, ThreadsController.newThread);
// router.get("/", auth, isAdmin, ThreadsController.getAllThreads);
// router.get("/:title", auth, ThreadsController.getThread);
// router.get("/theme/:theme", auth, ThreadsController.getThreadsByTheme);
// router.put("/:title", auth, isAdmin, ThreadsController.editThread);
// router.delete("/:title", auth, isAdmin, ThreadsController.deleteThread);

// Posts
router.get("/comments/all/:title", ThreadsController.getComments);
router.put("/comments/new/:title", ThreadsController.newComment);
router.put("/comments/edit/:title", ThreadsController.editComment);
router.delete("/comments/delete/:index/:title", ThreadsController.deleteComment)
// router.get("/comments/all/:title", auth, ThreadsController.getComments);
// router.put("/comments/new/:title", auth, ThreadsController.newComment);
// router.put("/comments/edit/:title", auth, ThreadsController.editComment);
// router.delete("/comments/delete/:index/:title", auth, ThreadsController.deleteComment)

// Likes
router.put("/likes/:index/:title", ThreadsController.newLike);
router.get("/likes/:index/:title", ThreadsController.likesFromComment);
// router.put("/likes/:index/:title", auth, ThreadsController.newLike);
// router.get("/likes/:index/:title", auth, ThreadsController.likesFromComment);
// router.get("/likes/:author", ThreadsController.totalLikesByAuthor);
// router.get("/dislikes/:author", ThreadsController.totalDislikesByAuthor);


module.exports = router;