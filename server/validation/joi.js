import { BadRequest } from "../errors/index.js";

export const validate = async (schema, payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (e) {
    throw new BadRequest(`요청한 형식에 맞지 않습니다 \n ${e}`);
  }
};
