import express from "express";
import { BadRequest } from "../errors/index.js";
import { Post, Sequence, User } from "../models/index.js";
import { validate, registerSchema } from "../validation/index.js";
import { auth, catchAsync } from "../middleware/index.js";
import { logIn, logOut } from "../auth.js";
import { guest } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.post(
  "/api/user",
  guest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { email, username, name, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
      throw new BadRequest("다른 이메일로 가입해주세요 \n Invalid Email");
    }

    const user = await User.create({
      email,
      username,
      name,
      password,
    });

    await Sequence.create({ user: user._id });

    logIn(req, user._id);

    res.status(200).json({ message: "ok", user });
  })
);

router.get(
  "/api/user/:username",
  catchAsync(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      throw new BadRequest("해당 유저를 찾을 수 없습니다 \n User Not Found");
    }
    res.json({ message: "ok", user });
  })
);

router.delete(
  "api/user",
  auth,
  catchAsync(async (req, res) => {
    const _id = req.session.userId;
    const { password } = req.body;
    const user = await User.findById(_id);
    if (!user || !(await user.matchesPassword(password))) {
      throw new Unauthorized(
        "잘못된 이메일 혹은 비밀번호 입니다 \n Incorrect email or password"
      );
    }
    await User.findByIdAndDelete(user._id);
    await Post.deleteMany({ user: user._id });
    await logOut(req, res);
    res.json({ message: "ok" });
  })
);
export default router;
