import express from "express";
import { Post } from "../models/index.js";
import { auth, catchAsync } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.post(
  "/api/like/:uuid/like",
  auth,
  catchAsync(async (req, res) => {
    const user = req.session.userId;
    const uuid = req.params.uuid;

    await Post.findOneAndUpdate(
      { uuid, likes: { $ne: user } },
      {
        $inc: { likeCount: 1 },
        $push: { likes: user },
      },
      (err, doc) => {
        if (err) throw err;
      }
    );

    res.status(200).json({ message: "ok" });
  })
);

router.post(
  "/api/like/:uuid/unlike",
  auth,
  catchAsync(async (req, res) => {
    const user = req.session.userId;
    const uuid = req.params.uuid;

    await Post.findOneAndUpdate(
      { uuid, likes: user },
      {
        $inc: { likeCount: -1 },
        $pull: { likes: user },
      },
      (err, doc) => {
        if (err) throw err;
      }
    );

    res.status(200).json({ message: "ok" });
  })
);

export default router;
