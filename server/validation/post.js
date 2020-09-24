import Joi from "joi";

const content = Joi.string().max(2200);
const image = Joi.required();
const user = Joi.required();

export const postSchema = Joi.object({
  content,
  image,
  user,
});
