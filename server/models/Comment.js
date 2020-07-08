const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Type: { ObjectId },
} = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: ObjectId,
    required: true,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
