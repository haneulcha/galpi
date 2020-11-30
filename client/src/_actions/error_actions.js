import { ERROR_HANDLE } from "./types";

export const errorHandle = (err) => {
  return {
    type: ERROR_HANDLE,
    payload: null,
    error: err,
  };
};
