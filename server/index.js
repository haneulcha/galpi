import mongoose from "mongoose";
import { createApp } from "./app.js";
import { APP_PORT, MONGO_OPTION } from "./config/index.js";
import dotenv from "dotenv";

(async () => {
  dotenv.config();

  await mongoose.connect(process.env.MONGO_URI, MONGO_OPTION);

  const app = createApp();

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
})();
