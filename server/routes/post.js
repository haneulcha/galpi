import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Post, Sequence } from "../models/index.js";
import { auth, catchAsync } from "../middleware/index.js";
import { validate, postSchema } from "../validation/index.js";

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
      cb(null, "uploads/"); //
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

//이미지 업로드 처리하는 라우터; 하나의 이미지 -> req.file, 나머지 -> req.body
router.post("/api/post/img", upload.single("img"), (req, res) => {
  res.json({ url: `/api/img/${req.file.filename}` });
});

//게시글 업로드를 처리하는 라우터; 데이터만 multipart 형식으로 -> req.body
const upload2 = multer();
router.post(
  "/api/post",
  auth,
  upload2.none(),
  catchAsync(async (req, res) => {
    const { content, url } = req.body;
    const user = req.session.userId;
    //TODO: VALIDATE
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

    await Post.create(data);
    res.json({ message: "uploaded" });
  })
);

router.get(
  "/api/post",
  catchAsync(async (req, res) => {
    const { username = false, page = 1, limit = 10 } = req.query;

    let posts, count;
    if (username) {
      console.log("username exists");
      posts = await Post.find({ username })
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      count = await Post.countDocuments({ username });
    } else {
      console.log("no username");
      posts = await Post.find()
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      count = await Post.countDocuments();
    }

    res.json({
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

    if (!post) {
      res.status(404).json({ message: "not Found" });
    }
    res.json({ post });
  })
);

export default router;
