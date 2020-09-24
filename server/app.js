import express from "express";
import session from "express-session"; // req.session 객체를 생성, 현재 세션의 아이디는 req.sessionID
import { SESSION_OPTION } from "./config/index.js";
import { catchAsync, notFound, serverError } from "./middleware/index.js";
import { register, login, home, post } from "./routes/index.js";
import { active } from "./middleware/index.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      ...SESSION_OPTION,
      // store
    })
  );

  app.use(catchAsync(active));

  app.use(home);

  app.use(register);

  app.use(login);

  app.use(post);

  app.use(notFound);

  app.use(serverError);

  return app;
};
