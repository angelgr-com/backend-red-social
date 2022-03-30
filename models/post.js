const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    thread_id: {
        type: String,
        default: "",
    },
    title: {
        type: String,
    },
    title_url: {
        type: String,
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{ type: String }],
    dislikes: [{ type: String }],
});

const toJSONConfig = {
    // transform and ret are mongoose methods
    // ret encrypts passwords
    transform: (doc, ret, opt) => {
        delete ret['password']
        return ret
    }
}
postSchema.set('toJSON', toJSONConfig);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;