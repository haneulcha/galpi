import express from "express";
import { Post, User } from "../models/index.js";
import { auth, catchAsync, who } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.get(
  "/api/dashboard",
  auth,
  catchAsync(async (req, res) =>{
    
    const user = await User.findById(req.session.userId)
    const posts = await Post.countDocuments({ user: req.session.userId })

    res.json({ user, posts })
  })
);

// router.get(
//   "/api/auth",
//   who,
//   catchAsync(async (req, res) => {
//     const { username, name } = await User.findById(req.session.userId);
//     res.json({ isAuth: true, username, name });
//   })
// );

// // 토큰 유무로 로그인 여부 확인하기
// let auth = (req, res, next) => {
//   // 로그인 할 때 쿠키에 저장했던 토큰 가져오기
//   let token = req.cookies.x_auth;
//   // 토큰으로 유저 찾기 => req에 토큰과 user 저장
//   User.findByToken(token, (err, user) => {
//     if (err) throw err;
//     // 로그인하지 않은 상태
//     if (!user) return res.json({ isAuth: false, error: true });

//     req.token = token;
//     req.user = user;
//     next();
//   });
// };

// router.get("/auth", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.username,
//     role: req.user.role,
//     image: req.user.image,
//   });
// });

export default router;
