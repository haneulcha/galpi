import { IN_PROD } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const ONE_HOUR = 1000 * 60 * 60;

const HALF_HOUR = ONE_HOUR / 2;

const SIX_HOURS = ONE_HOUR * 6;

const { env } = process;

export const {
  SESSION_SECRET = `secret`,
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = ONE_HOUR,
} = env;

export const SESSION_ABSOLUTE_TIMEOUT = +(
  env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS
);

export const SESSION_OPTION = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD, // 프로덕션 모드 일때
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
