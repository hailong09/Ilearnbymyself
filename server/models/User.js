const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;