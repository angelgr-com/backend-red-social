const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new Schema({
    user_id: {
        type: String,
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [String],
    date: {
        type: Date,
        default: new Date()
    },
    thread_id: {
        type: String,
        default: "",
    }
});

const toJSONConfig = {
    transform: (doc, ret, opt) => { //transform es un metodo de mongoose
        delete ret['password'] //ret es un metodo encripta la password para enviarla con mas seguridad
        return ret
    }
}


postSchema.set('toJSON', toJSONConfig);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;