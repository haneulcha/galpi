import express from "express";
import { logIn, logOut } from "../auth.js";
import { User } from "../models/index.js";
import { validate, loginSchema } from "../validation/index.js";
import { auth, catchAsync, guest } from "../middleware/index.js";
// import { Unauthorized } from "../errors/index.js";

const { Router } = express;
const router = Router();

router.post(
  "/api/login",
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      return res.json({
        message: "failed",
      });
      // throw new Unauthorized("Incorrect email or password");
    }

    logIn(req, user._id);
    console.log(req.session);
    res.json({ message: "OK", userId: user._id, username: user.username });
  })
);

router.post(
  "/api/logout",
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res);
    res.json({ message: "OK" });
  })
);

export default router;
