import express from "express";
import { Comment, Post } from "../models/index.js";
import { catchAsync } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.get(
  "/api/comment/:uuid",
  catchAsync(async (req, res) => {
    const uuid = req.params.uuid;

    const post = await Post.findOne({ uuid });
    const comments = await Comment.find({ post: post._id });

    res.json({ message: "success", comments });
  })
);

router.post(
  "/api/comment/:uuid",
  catchAsync(async (req, res) => {
    //TODO: VALIDATE
    const user = req.session.userId || "5fa0c4faa37c946708ebc8dc";
    const uuid = req.params.uuid;
    const comment = req.body.comment;

    const post = await Post.findOne({ uuid });

    const body = {
      post: post._id,
      user,
      comment,
    };

    const savedComment = await Comment.create(body);
    console.log("saved comment", savedComment);
    res.json({ message: "success", savedComment });
  })
);

router.delete(
  "/api/comment/:id",
  catchAsync(async (req, res) => {
    const user = req.session.userId;
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (comment.user._id === user) {
      await Comment.findByIdAndDelete(id);
      res.status(200).json({ message: "success" });
    }
    res.status(400).json({ message: "failed" });
  })
);

export default router;
