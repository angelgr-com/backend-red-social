const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: {
        type: String,
    },
    title_url: {
        type: String,
    },
    theme: {
        type: String,
    },
    posts: [{
        author: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        content: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
    }]
});

const toJSONConfig = {
    // transform and ret are mongoose methods
    // ret encrypts passwords
    transform: (doc, ret, opt) => {
        delete ret['password']
        return ret
    }
}
threadSchema.set('toJSON', toJSONConfig);

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;