import express from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import { SESSION_OPTION } from "./config/index.js";
import {
  notFound,
  serverError,
  active,
  catchAsync,
} from "./middleware/index.js";
import { user, login, home, post, like, comment } from "./routes/index.js";

export const createApp = (store) => {
  const __dirname = path.resolve();
  const app = express();

  app.use(cors());
  // app.use(express.static(path.join(__dirname, "public")));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      ...SESSION_OPTION,
      store,
    })
  );

  app.use("/api/img", express.static(path.join(__dirname, "uploads")));

  app.use(catchAsync(active));

  app.use(home);

  app.use(user);

  app.use(login);

  app.use(post);

  app.use(like);

  app.use(comment);

  // app.get("/*", function (req, res) {
  //   res.sendFile(path.join(__dirname, "public", "index.html"));
  // });

  app.use(notFound);

  app.use(serverError);

  return app;
};
