import express from "express";
import { logIn, logOut } from "../auth.js";
import { User } from "../models/index.js";
import { validate, loginSchema } from "../validation/index.js";
import { auth, catchAsync, guest } from "../middleware/index.js";
import { Unauthorized } from "../errors/index.js";

const { Router } = express;
const router = Router();

router.post(
  "/api/login",
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(email, password);
    if (!user || !(await user.matchesPassword(password))) {
      throw new Unauthorized("Incorrect email or password");
    }

    logIn(req, user._id);

    res.json({ message: "ok", user });
  })
);

router.post(
  "/api/logout",
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res);
    res.json({ message: "ok" });
  })
);

export default router;
