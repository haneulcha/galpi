const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  commenter: {
    type: mongoose.isValidObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
