import Joi from "joi";

const comment = Joi.string().max(2200).required();
const post = Joi.string().required();
const user = Joi.string().required();

export const commentSchema = Joi.object({
  user,
  post,
  comment,
});
