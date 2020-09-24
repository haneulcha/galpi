import express from "express";
import { BadRequest } from "../errors/index.js";
import { User } from "../models/index.js";
import { validate, registerSchema } from "../validation/index.js";
import { catchAsync } from "../middleware/index.js";
import { logIn } from "../auth.js";
import { guest } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.post(
  "/api/register",
  guest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { email, username, name, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
      throw new BadRequest("Invalid Email");
    }

    const user = await User.create({
      email,
      username,
      name,
      password,
    });

    logIn(req, user.id);

    res.json({ message: "OK" });
  })
);

export default router;
