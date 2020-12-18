import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import sanitizeHtml from "sanitize-html";
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

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "galpi",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/api/post/img", auth, upload.single("img"), (req, res) => {
  return res.json({ url: req.file.location });
});

const upload2 = multer();
router.post(
  "/api/post",
  auth,
  upload2.none(),
  catchAsync(async (req, res) => {
    const { content, url } = req.body;
    const user = req.session.userId;
    const sanitizedContent = sanitizeHtml(content);

    const index = await Sequence.findOneAndUpdate(
      { user },
      { $inc: { uid: 1 } },
      { new: true }
    );

    const number = JSON.stringify(index.uid);
    const data = {
      content: sanitizedContent,
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
    const uuid = req.params.uuid;
    const post = await Post.findOne({ uuid });

    if (!post) {
      throw new BadRequest("해당 포스트를 찾을 수 없습니다 \n Post Not Found");
    }

    await Post.findOneAndDelete({ uuid });
    res.status(200).json({ message: "ok" });
  })
);
export default router;
