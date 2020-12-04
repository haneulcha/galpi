import mongoose from "mongoose";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { createApp } from "./app.js";
import {
  REDIS_URL,
  REDIS_PASSWORD,
  MONGO_URI,
  APP_PORT,
  MONGO_OPTION,
} from "./config/index.js";

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTION);

  // const RedisStore = connectRedis(session);

  // const client = new Redis(REDIS_URL, {
  //   password: REDIS_PASSWORD,
  // });

  // const store = new RedisStore({ client });

  // const app = createApp(store);

  const app = createApp();

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
})();
