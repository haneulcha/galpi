const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  console.log("프로필");
});

router.get("/join", (req, res) => console.log(회원가입));

router.get("/", (req, res, next) => {
  console.log("main");
});

module.exports = router;
