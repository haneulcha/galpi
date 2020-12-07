import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Post, Sequence, User } from "../models/index.js";
import { auth, catchAsync } from "../middleware/index.js";
import { validate, postSchema } from "../validation/index.js";
import { BadRequest } from "../errors/index.js";

const { Router } = express;
const router = Router();

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다");
    fs.mkdirSync("uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/api/post/img", upload.single("img"), (req, res) => {
  res.json({ url: `/api/img/${req.file.filename}` });
});

const upload2 = multer();
router.post(
  "/api/post",
  auth,
  upload2.none(),
  catchAsync(async (req, res) => {
    const { content, url } = req.body;
    const user = req.session.userId;

    const index = await Sequence.findOneAndUpdate(
      { user },
      { $inc: { uid: 1 } },
      { new: true }
    );

    const number = JSON.stringify(index.uid);
    const data = {
      content,
      url,
      user,
      index: +number,
    };
    await validate(postSchema, data);
    await Post.create(data);
    res.status(200).json({ message: "ok" });
  })
);

router.get(
  "/api/post",
  catchAsync(async (req, res) => {
    const { username = false, page = 1, limit = 10 } = req.query;
    let posts, count;
    if (username) {
      const user = await User.findOne({ username });
      posts = await Post.find({ user: user._id })
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      count = await Post.countDocuments({ user: user._id });
    } else {
      posts = await Post.find()
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      count = await Post.countDocuments();
    }

    res.status(200).json({
      message: "ok",
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  })
);

// 개별 포스트
router.get(
  "/api/post/:uuid",
  catchAsync(async (req, res) => {
    const uuid = req.params.uuid;

    const post = await Post.findOne({ uuid });

    if (!post) throw new BadRequest("Post Not Found");

    res.status(200).json({ message: "ok", post });
  })
);

router.delete(
  "/api/post/:uuid",
  auth,
  catchAsync(async (req, res) => {
    const user = req.session.userId;
    const uuid = req.params.uuid;
    const post = await Post.findOne({ uuid });
    const id = post.user._id.toString();

    if (!post)
      throw new BadRequest("해당 포스트를 찾을 수 없습니다 \n Post Not Found");
    if (id === user) {
      console.log();
      await Post.findByIdAndDelete(post._id);
      res.status(200).json({ message: "ok" });
    } else throw new BadRequest("삭제에 실패했습니다 \n Delete faild");
  })
);
export default router;
