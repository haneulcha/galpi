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

export const Post = model("Post", postSchema);
