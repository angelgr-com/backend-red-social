const Post = require('../models/post.js');
const PostsController = {};

PostsController.new = async (req, res) => {
    Post
    .create({
        user_id: req.body.user_id,
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
        date: req.body.date,
        related_post: req.body.date
    })
    .then(post => {
        res
        .status(201)
        .send(`Post successfully registered`);
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

PostsController.update = async (req, res) => {
    Post
    .findById({
        _id: req.params.id,
    })
    .then(post => {
        if (post) {
            // modify author only on backend
            // in case author deletes his or her user 
            post.user_id = req.body.user_id;
            post.author = req.body.author;
            post.title = req.body.title;
            post.content = req.body.content;
            post.related_post = req.body.related_post;
            post.save();
            res
            .status(201)
            .send(`Post successfully registered`);
        } else {
            res.status(401).send(
                'Post not found.'
            )
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

PostsController.delete = async (req, res) => {
    Post
    .findByIdAndDelete({
        _id: req.params.id,
    })
    .then(post => {
        if (post) {
            res.status(201).send(
                "Post deleted."
            );
        } else {
            res.status(400).send(
                "Post not found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}




module.exports = PostsController;