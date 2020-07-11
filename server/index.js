const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected ..."))
  .catch((err) => console.log(err));

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
//   res.send("error");
// });

app.listen(port, () =>
  console.log(`This App listening at http://localhost:${port}`)
);
