import express from "express";
import { Post, User } from "../models/index.js";
import { auth, catchAsync } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.get(
  "/api/dashboard",
  auth,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    const posts = await Post.countDocuments({ user: req.session.userId });
    console.log(user, posts);
    res.status(200).json({ user, posts, message: "ok" });
  })
);

router.get(
  "/api/auth",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    if (!user)
      return res.json({
        message: "not logged in",
        isAuth: false,
        user: {
          _id: {},
          username: {},
        },
      });
    res.status(200).json({ isAuth: true, user, message: "ok" });
  })
);

export default router;
