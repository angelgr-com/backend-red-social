const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user_id: {
        type: String,
        required: true
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
    likes : [String],
    // comments: [
    //     {
    //         user_id_post: String,
    //         author_post: String,
    //         content_post: String,
    //         likes_post : Number,
    //         date_post: {
    //             type: Date,
    //             default: new Date()
    //         }
    //     }
    // ],
    date: {
        type: Date,
        default: new Date()
    }
    }
);

const toJSONConfig = {
    transform: (doc, ret, opt) => { //transform es un metodo de mongoose
        delete ret['password'] //ret es un metodo encripta la password para enviarla con mas seguridad
        return ret
    }
}


postSchema.set('toJSON', toJSONConfig);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;