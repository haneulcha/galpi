const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { Post } = require("../models/Post");

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
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/api/img/${req.file.filename}` });
});

//게시글 업로드를 처리하는 라우터; 데이터만 multipart 형식으로 -> req.body
const upload3 = multer();
router.post("/", upload3.none(), async (req, res, next) => {
  try {
    const post = new Post({
      content: req.body.content,
      image: req.body.url,
      user: req.user._id, // 다시 확인
    });
    await post.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
