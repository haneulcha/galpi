import { ERROR_HANDLE, ERROR_HIDE } from "../_actions/types";

const initState = {
  name: null,
  status: null,
  message: null,
  isOpen: false,
};

export default function (state = initState, action) {
  const { error } = action;
  console.log(error);
  switch (action.type) {
    case ERROR_HANDLE:
      if (!error.statusText) error.statusText = null;
      return {
        name: error.statusText,
        status: error.status,
        message: error.data.message,
        isOpen: true,
      };

    case ERROR_HIDE:
      return {
        name: null,
        status: null,
        message: null,
        isOpen: false,
      };

    default:
      return state;
  }
}
