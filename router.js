const router = require('express').Router();

const UsersRouter = require('./views/UsersRouter');
const PostsRouter = require('./views/PostsRouter');

router.use('/users', UsersRouter);
router.use('/posts', PostsRouter);

module.exports = router;