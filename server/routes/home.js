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

    res.json({ user, posts, message: "success" });
  })
);

router.get(
  "/api/auth",
  auth,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.json({ isAuth: true, user });
  })
);

export default router;
