import express from "express";

import { User } from "../models/index.js";

import { auth, catchAsync } from "../middleware/index.js";

const { Router } = express;
const router = Router();

router.get(
  "/api/home",
  auth,
  catchAsync(async (req, res) =>
    res.json(await User.findById(req.session.userId))
  )
);

export default router;
