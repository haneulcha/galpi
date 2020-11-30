const initState = {
  error: null,
};

export default function (state = initState, action) {
  const { error } = action;

  if (error) {
    return {
      error: error,
    };
  }

  return state;
}
