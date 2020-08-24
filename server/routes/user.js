const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

// 토큰 유무로 로그인 여부 확인하기
let auth = (req, res, next) => {
  // 로그인 할 때 쿠키에 저장했던 토큰 가져오기
  let token = req.cookies.x_auth;
  // 토큰으로 유저 찾기 => req에 토큰과 user 저장
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    console.log(req.token, req.user);
    req.token = token;
    req.user = user;
    next();
  });
};

router.get("/", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//회원가입
router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    console.log(userInfo);
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 로그인
router.post("/login", (req, res) => {
  // 이메일 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다.",
      });
    }
    // 있으면 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          massage: "비밀번호가 틀렸습니다.",
        });
    });
    // 토큰 생성해서 쿠키에 저장
    user.generateToken((err, user) => {
      console.log(user.token);
      if (err) return res.status(400).send(err);
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
});

//로그아웃 - 로그인을 해야 로그아웃이 가능
router.get("/logout", auth, (req, res) => {
  console.log(req);
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
