import express from "express";
import { BadRequest } from "../errors/index.js";
import { Sequence, User, Post } from "../models/index.js";
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

    await Sequence.create({ user: user.id });

    logIn(req, user.id);

    res.json({ message: "OK", user: name });
  })
);

router.get(
  "/api/user/:username",
  catchAsync(async (req, res) => {
    const username = req.params.username;

    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "not Found" });
    }

    res.json({ user });
  })
);

export default router;
