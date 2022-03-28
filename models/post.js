const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    author: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        unique: true,
        required: true
    },
    links: {
        type: [String]
    },
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    likes: {
        type: [String], // array of nicknames
    }
});

const toJSONConfig = {
    transform: (doc,ret,opt) => {//transform es un metodo de mongoose
           delete ret['password']//ret es un metodo encripta la password para enviarla con mas seguridad
           return ret
    }
}


postSchema.set('toJSON', toJSONConfig);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;