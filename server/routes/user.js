import express from "express";
import { BadRequest } from "../errors/index.js";
import { Sequence, User } from "../models/index.js";
import { validate, registerSchema } from "../validation/index.js";
import { catchAsync } from "../middleware/index.js";
import { logIn } from "../auth.js";
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
      res.json({ message: "Invalid Email" });
      // throw new BadRequest("Invalid Email");
    }

    const user = await User.create({
      email,
      username,
      name,
      password,
    });

    await Sequence.create({ user: user._id });

    logIn(req, user._id);

    res.json({ message: "OK", userId: user._id, username: user.username });
  })
);

router.get(
  "/api/user/:username",
  catchAsync(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      res.json({ message: "not Found" });
    }
    res.json({ user, message: "success" });
  })
);

export default router;
