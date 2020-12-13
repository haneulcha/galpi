import express from "express";
import { Comment, Post } from "../models/index.js";
import { auth, catchAsync } from "../middleware/index.js";
import { validate, commentSchema } from "../validation/index.js";
import { BadRequest } from "../errors/index.js";

const { Router } = express;
const router = Router();

router.get(
  "/api/comment/:uuid",
  catchAsync(async (req, res) => {
    const uuid = req.params.uuid;

    const post = await Post.findOne({ uuid });
    if (!post) throw BadRequest("Post Not Found");

    const comments = await Comment.find({ post: post._id });

    res.status(200).json({ message: "ok", comments });
  })
);

router.post(
  "/api/comment/:uuid",
  auth,
  catchAsync(async (req, res) => {
    const user = req.session.userId;
    const uuid = req.params.uuid;
    const comment = req.body.comment;

    const post = await Post.findOne({ uuid });
    if (!post) throw BadRequest("Post Not Found");
    const postId = post._id.toString();

    const body = {
      post: postId,
      user,
      comment,
    };

    await validate(commentSchema, body);

    const newComment = await Comment.create(body);

    res.status(200).json({ message: "ok", newComment });
  })
);

router.delete(
  "/api/comment/:id",
  auth,
  catchAsync(async (req, res) => {
    const user = req.session.userId;
    const id = req.params.id;
    const comment = await Comment.findById(id);
    const userId = comment.user._id.toString();
    if (!comment)
      throw new BadRequest("댓글을 찾을 수 없습니다 \n Comment Not Found");
    if (userId === user) {
      await Comment.findByIdAndDelete(id);
      return res.status(200).json({ message: "ok" });
    }
  })
);

export default router;
