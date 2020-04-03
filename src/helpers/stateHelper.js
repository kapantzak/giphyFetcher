export const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RANDOM_ID":
      return Object.assign({}, state, {
        randomid: action.payload.randomid
      });
    case "UPDATE_TERM":
      return Object.assign({}, state, {
        term: action.payload.term
      });
    default:
      return state;
  }
};

export const updateRandomId = randomid => ({
  type: "UPDATE_RANDOM_ID",
  payload: {
    randomid
  }
});

export const updateTerm = term => ({
  type: "UPDATE_TERM",
  payload: {
    term
  }
});
