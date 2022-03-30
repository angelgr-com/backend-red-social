const Post = require('../models/post.js');
const PostsController = {};

const formatString = (string) => {
    let result = string;
    if (result != undefined) {
        result = result.replace(/[.*+?^${}()|[\]\\]/g, ''); // removes special characters
        result = result.replace(/ /gi, '-') // replace spaces by dashes
        result = result.toLowerCase();
    };
    return result;
}

PostsController.newPost = async (req, res) => {
    let author = formatString(req.body.author);
    let title_url = formatString(req.body.title);

    Post
    .create({
        author: author, // author == nickname
        title: req.body.title,
        title_url: title_url,
        content: req.body.content,
        likes: req.body.likes,
        // date: req.body.date,
        thread_id: req.body.thread_id
            // thread_id if new post is a comment
            // otherwise thread_id will be blank
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

PostsController.getPost = async (req, res) => {
    Post
    .findById({
        _id: req.params._id,
    })
    .then(post => {
        if (post) {
            res.status(201).send(post);
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

PostsController.updatePost = async (req, res) => {
    Post
    .findById({
        _id: req.body._id,
    })
    .then(post => {
        if (post) {
            post.title = req.body.title;
            post.content = req.body.content;
            post.thread_id = req.body.thread_id;
            post.save();
            res
            .status(201)
            .send(`Post successfully updated`);
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

PostsController.deletePost = async (req, res) => {
    Post
    .findByIdAndDelete({
        _id: req.params._id,
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

PostsController.getThreadByTitle = async (req, res) => {
    Post
    .find({
        title_url: req.params.title,
    })
    .then(posts => {
        if (posts) {
            res.status(200).send(posts);
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

PostsController.getThreadById = async (req, res) => {
    Post
    .find({
        'thread_id': req.params._id
    })
    .then(posts => {
        if (posts) {
            res.status(200).send(posts);
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

PostsController.deleteThread = async (req, res) => {
    Post
    .deleteMany({
        title_url: req.params.title,
    })
    .then(posts => {
        if (posts) {
            res.status(200).send("Thread deleted.");
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

PostsController.totalLikesByAuthor = async (req, res) => {
    Post
    .find({
        author: req.params.author,
    })
    .then(posts => {
        if (posts) {
            console.log(posts);
            let sum = 0;
            posts.map((post) => {
                sum += post.likes.length;
            });
            res.status(200).send(`${req.params.author}'s total likes: ${sum}`);
        } else {
            res.status(400).send(
                "No posts found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

PostsController.totalDislikesByAuthor = async (req, res) => {
    Post
    .find({
        author: req.params.author,
    })
    .then(posts => {
        if (posts) {
            console.log(posts);
            let sum = 0;
            posts.map((post) => {
                sum += post.dislikes.length;
            });
            res.status(200).send(`${req.params.author}'s total dislikes: ${sum}`);
        } else {
            res.status(400).send(
                "No posts found."
            );
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}

module.exports = PostsController;