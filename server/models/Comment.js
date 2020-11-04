import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.post("find", async function (docs) {
  for (let doc of docs) {
    await doc.populate("user", "username").execPopulate();
  }
});

commentSchema.post("save", function (doc, next) {
  doc
    .populate("user", "username")
    .execPopulate()
    .then(function () {
      next();
    });
});

export const Comment = model("Comment", commentSchema);
