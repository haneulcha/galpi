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

    res.json(comments);
  })
);

router.post(
  "/api/comment/:uuid",
  catchAsync(async (req, res) => {
    //TODO: VALIDATE
    const user = req.session.userId;
    const uuid = req.params.uuid;
    const comment = req.body.comment;

    const post = await Post.findOne({ uuid });

    const body = {
      post: post._id,
      user,
      comment,
    };

    const savedComment = await Comment.create(body);

    res.json({ message: "OK", savedComment });
  })
);

router.delete(
  "/api/comment/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
  })
);

export default router;
