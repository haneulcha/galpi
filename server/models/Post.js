const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Type: { ObjectId },
} = Schema;

const postSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
