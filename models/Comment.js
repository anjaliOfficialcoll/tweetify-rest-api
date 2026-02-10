const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
