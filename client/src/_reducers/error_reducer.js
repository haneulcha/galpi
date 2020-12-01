const initState = {
  error: null,
};

export default function (state = initState, action) {
  const { error } = action;

  if (error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return state;
}
