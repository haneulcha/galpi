const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { Post } = require("../models/Post");

fs.readdir("galpi", (error) => {
  if (error) {
    console.error("galpi 폴더가 없어 galpi 폴더를 생성합니다");
    fs.mkdirSync("galpi");
  }
});

//미들웨어를 만드는 객체
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "galpi/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

//이미지 업로드 처리하는 라우터
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

//게시글 업로드를 처리하는 라우터
const upload2 = multer();
router.post("/", upload2.none(), async (req, res, next) => {
  try {
    const post = new Post({
      content: req.body.content,
      img: req.body.url,
      user: req.user.id, // 다시 확인
    });
    post = await post.save();

    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
