import { isLoggedIn, logOut } from "../auth.js";
import { SESSION_ABSOLUTE_TIMEOUT } from "../config/index.js";
import { BadRequest, Unauthorized } from "../errors/index.js";

export const guest = (req, res, next) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest("You are already logged in"));
  }
  next();
};

export const auth = (req, res, next) => {
  if (!isLoggedIn(req)) {
    res.json({ message: "You must be logged in" });
    // return next(new Unauthorized("You must be logged in")); //401
  }
  next();
};

export const who = (req, res, next) => {
  if (isLoggedIn(req)) {
    next();
  } else {
    return res.json({ isAuth: false, error: true });
  }
};

export const active = async (req, res, next) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;
    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);
      return next(new Unauthorized("Session expired"));
    }
  }
  next();
};
