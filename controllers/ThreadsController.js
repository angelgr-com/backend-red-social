const Thread = require('../models/thread.js');
const ThreadsController = {};

const formatString = (string) => {
    let result = string;
    if (result != undefined) {
        // removes special characters
        result = result.replace(/[.*+¿?^${}()|[\]\\]/g, '');
        result = result.replace(/[á]/g, 'a');
        result = result.replace(/[é]/g, 'e');
        result = result.replace(/[í]/g, 'i');
        result = result.replace(/[ó]/g, 'o');
        result = result.replace(/[ú]/g, 'u');
        result = result.replace(/ /gi, '-') // replace spaces by dashes
        result = result.toLowerCase();
    };
    return result;
}

ThreadsController.newThread = async (req, res) => {
    let author = formatString(req.body.posts[0].author);
    let title_url = formatString(req.body.title);

    Thread
        .create({
            title: req.body.title,
            title_url: title_url,
            theme: req.body.theme,
            posts: [{
                author: author, // author == nickname
                // date: req.body.date,
                content: req.body.posts[0].content,
                // likes: req.body.likes,
                // dislikes: req.body.dislikes,
            }]
        })
        .then(post => {
            res
            .status(201)
            .send(`Thread successfully registered`);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

ThreadsController.getThread = async (req, res) => {
    Thread
        .find({
            title_url: req.params.title,
        })
        .then(thread => {
            if (thread) {
                res.status(200).send(thread);
            } else {
                res.status(400).send(
                    "Thread not found."
                );
            }
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

ThreadsController.editThread = async (req, res) => {
    let author = formatString(req.body.posts[0].author);
    let title_url = formatString(req.body.title);
    // console.log('req.body.posts.author', req.body.posts[0].author);
    // console.log('author: ', author);
    Thread
        .find({
            title_url: req.params.title,
        })
        .then(thread => {
            if (thread) {
                thread[0].title = req.body.title;
                thread[0].title_url = title_url;
                thread[0].theme = req.body.theme;
                thread[0].posts = [{
                    author: author, // author == nickname
                    // date: req.body.date,
                    content: req.body.posts[0].content,
                    // likes: req.body.likes,
                    // dislikes: req.body.dislikes,
                }];
                thread[0].save();
                res
                    .status(201)
                    .send(`Thread successfully updated`);
            } else {
                res.status(401).send(
                    'Thread not found.'
                )
            }
        })
        .catch(error => {
            res.status(400).send(error);
            console.log(error);
        });
}

ThreadsController.deleteThread = async (req, res) => {
    Thread
        .deleteOne({
            title_url: req.params.title,
        })
        .then(thread => {
            if (thread) {
                res.status(200).send("Thread deleted.");
            } else {
                res.status(400).send(
                    "Thread not found."
                );
            }
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

ThreadsController.newComment = async (req, res) => {
    let author = formatString(req.body.posts[0].author);

    Thread
    .find({
        title_url: req.params.title,
    })
    .then(thread => {
        if (thread) {
            const newObject = {
                author: author, // author == nickname
                // date: req.body.date,
                content: req.body.posts[0].content,
                // likes: req.body.likes,
                // dislikes: req.body.dislikes,
            };
            thread[thread.length-1].posts.push(newObject);
            thread[thread.length-1].save();
            res
                .status(201)
                .send(`Thread successfully updated`);
        } else {
            res.status(401).send(
                'Thread not found.'
            )
        }
    })
    .catch(error => {
        res.status(400).send(error);
        console.log(error);
    });
}

// PostsController.getPost = async (req, res) => {
//     Post
//     .findById({
//         _id: req.params._id,
//     })
//     .then(post => {
//         if (post) {
//             res.status(201).send(post);
//         } else {
//             res.status(401).send(
//                 'Post not found.'
//             )
//         }
//     })
//     .catch(error => {
//         res.status(400).send(error);
//     });
// }

// PostsController.updatePost = async (req, res) => {
//     Post
//     .findById({
//         _id: req.body._id,
//     })
//     .then(post => {
//         if (post) {
//             post.title = req.body.title;
//             post.content = req.body.content;
//             post.thread_id = req.body.thread_id;
//             post.save();
//             res
//             .status(201)
//             .send(`Post successfully updated`);
//         } else {
//             res.status(401).send(
//                 'Post not found.'
//             )
//         }
//     })
//     .catch(error => {
//         res.status(400).send(error);
//     });
// }

// PostsController.deletePost = async (req, res) => {
//     Post
//     .findByIdAndDelete({
//         _id: req.params._id,
//     })
//     .then(post => {
//         if (post) {
//             res.status(201).send(
//                 "Post deleted."
//             );
//         } else {
//             res.status(400).send(
//                 "Post not found."
//             );
//         }
//     })
//     .catch(error => {
//         res.status(400).send(error);
//     });
// }

// PostsController.totalLikesByAuthor = async (req, res) => {
//     Post
//     .find({
//         author: req.params.author,
//     })
//     .then(posts => {
//         if (posts) {
//             console.log(posts);
//             let sum = 0;
//             posts.map((post) => {
//                 sum += post.likes.length;
//             });
//             res.status(200).send(`${req.params.author}'s total likes: ${sum}`);
//         } else {
//             res.status(400).send(
//                 "No posts found."
//             );
//         }
//     })
//     .catch(error => {
//         res.status(400).send(error);
//     });
// }

// PostsController.totalDislikesByAuthor = async (req, res) => {
//     Post
//     .find({
//         author: req.params.author,
//     })
//     .then(posts => {
//         if (posts) {
//             console.log(posts);
//             let sum = 0;
//             posts.map((post) => {
//                 sum += post.dislikes.length;
//             });
//             res.status(200).send(`${req.params.author}'s total dislikes: ${sum}`);
//         } else {
//             res.status(400).send(
//                 "No posts found."
//             );
//         }
//     })
//     .catch(error => {
//         res.status(400).send(error);
//     });
// }

module.exports = ThreadsController;