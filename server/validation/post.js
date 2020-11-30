import Joi from "joi";

const content = Joi.string().max(2200);
const url = Joi.string().required();
const user = Joi.string().required();
const index = Joi.number().required();

export const postSchema = Joi.object({
  content,
  url,
  user,
  index,
});
