import mongoose from "mongoose";

const { Schema, model } = mongoose;
import shortid from "shortid";

const postSchema = new Schema(
  {
    content: String,
    url: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    uuid: {
      type: String,
      default: shortid.generate(),
    },
    index: Number,
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);
postSchema.post("findOne", async function (doc, next) {
  await doc.populate("user", "username").execPopulate();
  await doc.populate("likes", "username").execPopulate();
  next();
});
postSchema.post("find", async function (docs) {
  for (let doc of docs) {
    await doc.populate("user", "username").execPopulate();
    await doc.populate("likes", "username").execPopulate(); //TODO: arrays can be populated ?
  }
});

export const Post = model("Post", postSchema);
