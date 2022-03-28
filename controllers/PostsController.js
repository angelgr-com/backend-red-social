const Post = require('../models/post.js');
const PostsController = {};

PostsController.new = async (req, res) => {
    Post
    .create({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        links: req.body.links,
        date: req.body.date,
        likes: req.body.likes
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
            post.author = req.body.author;
            post.title = req.body.title;
            post.content = req.body.content;
            post.links = req.body.links;
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