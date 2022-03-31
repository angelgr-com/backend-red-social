const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    following: [{ type: String }],
    followers: [{ type: String }],
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const toJSONConfig = {
    transform: (doc,ret,opt) => {//transform es un metodo de mongoose
           delete ret['password']//ret es un metodo encripta la password para enviarla con mas seguridad
           return ret
    }
}


userSchema.set('toJSON', toJSONConfig);

const User = mongoose.model("User", userSchema);
module.exports = User;