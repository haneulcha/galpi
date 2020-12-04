import { ERROR_HANDLE, ERROR_HIDE } from "./types";

export const errorHandle = (err) => {
  return {
    type: ERROR_HANDLE,
    error: err,
  };
};

export const errorHide = () => {
  return {
    type: ERROR_HIDE,
  };
};
