export const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RANDOM_ID":
      return Object.assign({}, state, {
        randomid: action.payload.randomid,
      });
    case "UPDATE_TERM":
      return Object.assign({}, state, {
        term: action.payload.term,
      });
    case "UPDATE_RESULTS":
      return Object.assign({}, state, {
        results: action.payload.results,
      });
    case "UPDATE_AUTOCOMPLETE":
      return Object.assign({}, state, {
        autocomplete: action.payload.autocomplete,
      });
    case "DELETE_GIF":
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          data: state.results.data.filter((x) => x.id !== action.payload.gifId),
        }),
      });
    default:
      return state;
  }
};

export const updateRandomId = (randomid) => ({
  type: "UPDATE_RANDOM_ID",
  payload: {
    randomid,
  },
});

export const updateTerm = (term) => ({
  type: "UPDATE_TERM",
  payload: {
    term,
  },
});

export const updateResults = (results) => ({
  type: "UPDATE_RESULTS",
  payload: {
    results,
  },
});

export const updateAutocomplete = (autocomplete) => ({
  type: "UPDATE_AUTOCOMPLETE",
  payload: {
    autocomplete,
  },
});

export const deleteGif = (gifId) => ({
  type: "DELETE_GIF",
  payload: {
    gifId,
  },
});
