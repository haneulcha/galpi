import { IN_PROD } from "./app.js";

const ONE_HOUR = 1000 * 60 * 60;

const DAY = ONE_HOUR * 24;

const { env } = process;

export const {
  SESSION_SECRET = `secret`,
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = DAY,
} = env;

export const SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || DAY);

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
