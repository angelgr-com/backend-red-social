const Thread = require('../models/thread.js');
const ThreadsController = {};
const jwt = require('jsonwebtoken');
const isAccessGranted = require("../middlewares/isAccessGranted");
 
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

ThreadsController.getAllThreads = async (req, res) => {
    Thread
        .find()
        .then(threads => {
            if (threads) {
                res.status(200).send(threads);
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

ThreadsController.getThreadsByTheme = async (req, res) => {
    Thread
        .find({
            theme: req.params.theme,
        })
        .then(thread => {
            // console.log('thread: ', thread);
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
    // let author = formatString(req.body.posts[0].author);
    let title_url = formatString(req.body.title);
    // console.log('req.body.posts.author', req.body.posts[0].author);
    // console.log('author: ', author);
    if (isAccessGranted(req)) {
        Thread
            .find({
                title_url: req.params.title,
            })
            .then(thread => {
                if (thread) {
                    thread[0].title = req.body.title;
                    thread[0].title_url = title_url;
                    thread[0].theme = thread[0].theme;
                    thread[0].posts = [{
                        title: req.body.title,
                        title_url: req.body.title_url,
                        author: thread[0].posts[0].author,
                        date: thread[0].posts[0].date,
                        content: thread[0].posts[0].content,
                        likes: thread[0].posts[0].likes,
                        dislikes: thread[0].posts[0].dislikes,
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
    } else {
        res.status(401).send('Unauthorized access. Users can only update their own threads or comments.');
    }
}

ThreadsController.deleteThread = async (req, res) => {
    if (isAccessGranted(req)) {
        Thread
            .deleteOne({ title_url: req.params.id })
            .then(thread => {
                // console.log('deleted thread: ', thread);
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
    } else {
        res.status(401).send('Unauthorized access. Users can only update their own threads or comments.');
    }
}

ThreadsController.getComments = async (req, res) => {
    Thread
    .find({
        title_url: req.params.title,
    })
    .then(thread => {
        if (thread) {
            res.status(200).send(thread[0].posts);
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

ThreadsController.newComment = async (req, res) => {
    let author = formatString(req.body.posts[0].author);

    Thread
    .find({
        title_url: req.params.title,
    })
    .then(thread => {
        if (thread) {
            const newComment = {
                author: author, // author == nickname
                // date: req.body.date,
                content: req.body.posts[0].content,
                // likes: req.body.likes,
                // dislikes: req.body.dislikes,
            };
            thread[thread.length-1].posts.push(newComment);
            thread[thread.length-1].save();
            res
                .status(201)
                .send(`New comment successfully added`);
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

ThreadsController.editComment = async (req, res) => {
    if (isAccessGranted(req)) {
        Thread
        .find({
            title_url: req.params.title,
        })
        .then(thread => {
            if (thread) {
                let index;
                // console.log('thread: ', thread);
                // console.log('posts length: ', thread[0].posts.length);
                for(let i=0;i<thread[0].posts.length;i++){
                    if(thread[0].posts[i]._id.toString() === req.params.id)
                        // console.log('thread[0].posts[i]._id: ', thread[0].posts[i]._id.toString());
                        index = i;
                }
                let post = thread[0].posts[index];
                post.content = req.body.content;
                thread[0].save();
                res
                    .status(201)
                    .send(`Comment successfully edited`);
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
    } else {
        res.status(401).send('Unauthorized access. Users can only update their own threads or comments.');
    }
}

ThreadsController.deleteComment = async (req, res) => {
    if (isAccessGranted(req)) {
        Thread
        .find({
            title_url: req.params.title,
        })
        .then(thread => {
            if (thread) {
                let index;
                // console.log('thread: ', thread);
                // console.log('posts length: ', thread[0].posts.length);
                for(let i=0;i<thread[0].posts.length;i++){
                    if(thread[0].posts[i]._id.toString() === req.params.id)
                        // console.log('thread[0].posts[i]._id: ', thread[0].posts[i]._id.toString());
                        index = i;
                }
                thread[0].posts.splice(index, 1);
                thread[0].save();
                res
                    .status(201)
                    .send(`Comment successfully deleted`);
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
    } else {
        res.status(401).send('Unauthorized access. Users can only delete their own threads or comments.');
    }
}

ThreadsController.newLike = async (req, res) => {
    Thread
    .find({
        title_url: req.params.title,
    })
    .then(thread => {
        if (thread) {
            let index;
            // console.log('thread: ', thread);
            // console.log('posts length: ', thread[0].posts.length);
            for(let i=0;i<thread[0].posts.length;i++){
                if(thread[0].posts[i]._id.toString() === req.params.id)
                    // console.log('thread[0].posts[i]._id: ', thread[0].posts[i]._id.toString());
                    index = i;
            }
            // console.log('index', index);
            thread[0].posts[index].likes++;
            thread[0].save();
            res
                .status(201)
                .send(`Like successfully added. Total likes: ${thread[0].posts[index].likes}`);
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

ThreadsController.likesFromComment = async (req, res) => {
    Thread
    .find({
        title_url: req.params.title,
    })
    .then(thread => {
        if (thread) {
            res
                .status(200)
                .send(`${thread[0].posts[req.params.index].likes} likes`);
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

module.exports = ThreadsController;