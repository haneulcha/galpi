const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pageRouter = require("./routes/page");

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

app.listen(port, () =>
  console.log(`This App listening at http://localhost:${port}`)
);
