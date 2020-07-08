const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/profile", (req, res) => {
  console.log("프로필");
});

router.post("/join", (req, res) => {
  //필요한 정보 가져오기 -> DB에 넣기
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
