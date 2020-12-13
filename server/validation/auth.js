import Joi from "joi";
import { BCRYPT_MAX_BYTES } from "../config/index.js";

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();
const username = Joi.string().min(3).max(128).trim().required();
const name = Joi.string().min(1).max(128).trim();
const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAX_BYTES, "utf8")
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '형식에 맞추어 입력해주세요.(영 대·소문자, 숫자 포함) \n "{#label}" must contain one uppercase letter, one lowercase letter, and one digit'
  )
  .required();

const passwordConfirmation = Joi.valid(Joi.ref("password")).required();

export const registerSchema = Joi.object({
  email,
  username,
  name,
  password,
  passwordConfirmation,
});

export const loginSchema = Joi.object({
  email,
  password,
});
