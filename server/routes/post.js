import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Post } from "../models/index.js";
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

    const data = {
      content,
      url,
      user: req.session.userId,
    };

    await validate(postSchema, data);
    await Post.create(data);
    res.json({ message: "uploaded" });
  })
);

export default router;
