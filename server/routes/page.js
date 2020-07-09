const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("메인 페이지");
});

router.get("/profile", (req, res) => {
  res.send("프로필 화면");
});

router.get("/join", (req, res) => {
  res.send("회원가입");
});

module.exports = router;
