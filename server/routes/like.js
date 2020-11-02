import express from "express";
import { Post } from "../models/index.js";
import { catchAsync } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.post(
  "/api/like/:uuid/like", // TODO: auth
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
        if (err) console.error(err);
        console.log(doc);
      }
    );

    res.status(200).json({ message: "success" });
  })
);

router.post(
  "/api/like/:uuid/unlike",
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
        if (err) console.error(err);
        console.log(doc);
      }
    );

    res.status(200).json({ message: "success" });
  })
);

export default router;
