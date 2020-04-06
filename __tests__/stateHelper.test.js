import * as st from "../src/helpers/stateHelper";

describe("Actions", () => {
  test("updateRandomId", () => {
    const randomid = "a_random_id";
    const actual = st.updateRandomId(randomid);
    const expected = {
      type: "UPDATE_RANDOM_ID",
      payload: {
        randomid,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("updateTerm", () => {
    const term = "a term";
    const actual = st.updateTerm(term);
    const expected = {
      type: "UPDATE_TERM",
      payload: {
        term,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("updateResults", () => {
    const results = {
      data: [],
      pagination: {},
    };
    const actual = st.updateResults(results);
    const expected = {
      type: "UPDATE_RESULTS",
      payload: {
        results,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("updateAutocomplete", () => {
    const autocomplete = ["one", "two"];
    const actual = st.updateAutocomplete(autocomplete);
    const expected = {
      type: "UPDATE_AUTOCOMPLETE",
      payload: {
        autocomplete,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("deleteGif", () => {
    const gifId = "a_gif_id";
    const actual = st.deleteGif(gifId);
    const expected = {
      type: "DELETE_GIF",
      payload: {
        gifId,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("setTrending", () => {
    const trending = true;
    const actual = st.setTrending(trending);
    const expected = {
      type: "SET_TRENDING",
      payload: {
        trending,
      },
    };
    expect(actual).toEqual(expected);
  });
});

describe("Reducer", () => {
  const initialState = {
    randomid: null,
    trending: true,
    term: null,
    results: null,
    autocomplete: [],
  };

  test("Returns the initial state", () => {
    const actual = st.appReducer(initialState, {});
    expect(actual).toEqual(initialState);
  });

  test("Updates random id", () => {
    const action = {
      type: "UPDATE_RANDOM_ID",
      payload: {
        randomid: "a_random_id",
      },
    };
    const actual = st.appReducer(initialState, action);
    const expected = {
      randomid: "a_random_id",
      trending: true,
      term: null,
      results: null,
      autocomplete: [],
    };
    expect(actual).toEqual(expected);
  });

  test("Updates term", () => {
    const action = {
      type: "UPDATE_TERM",
      payload: {
        term: "a term",
      },
    };
    const actual = st.appReducer(initialState, action);
    const expected = {
      randomid: null,
      trending: true,
      term: "a term",
      results: null,
      autocomplete: [],
    };
    expect(actual).toEqual(expected);
  });

  test("Updates results", () => {
    const action = {
      type: "UPDATE_RESULTS",
      payload: {
        results: {
          data: [],
          pagination: {},
        },
      },
    };
    const actual = st.appReducer(initialState, action);
    const expected = {
      randomid: null,
      trending: true,
      term: null,
      results: {
        data: [],
        pagination: {},
      },
      autocomplete: [],
    };
    expect(actual).toEqual(expected);
  });

  test("Updates autocomplete", () => {
    const action = {
      type: "UPDATE_AUTOCOMPLETE",
      payload: {
        autocomplete: ["one", "two"],
      },
    };
    const actual = st.appReducer(initialState, action);
    const expected = {
      randomid: null,
      trending: true,
      term: null,
      results: null,
      autocomplete: ["one", "two"],
    };
    expect(actual).toEqual(expected);
  });

  test("Removes gif from results", () => {
    const thisState = {
      randomid: null,
      trending: true,
      term: null,
      results: {
        data: [
          {
            id: "1",
            title: "One",
          },
          {
            id: "2",
            title: "Two",
          },
        ],
      },
      autocomplete: [],
    };
    const action = {
      type: "DELETE_GIF",
      payload: {
        gifId: "1",
      },
    };
    const actual = st.appReducer(thisState, action);
    const expected = {
      randomid: null,
      trending: true,
      term: null,
      results: {
        data: [
          {
            id: "2",
            title: "Two",
          },
        ],
      },
      autocomplete: [],
    };
    expect(actual).toEqual(expected);
  });

  describe("SET_TRENDING", () => {
    test("Sets trending", () => {
      const action = {
        type: "SET_TRENDING",
        payload: {
          trending: false,
        },
      };
      const actual = st.appReducer(initialState, action);
      const expected = {
        randomid: null,
        trending: false,
        term: null,
        results: null,
        autocomplete: [],
      };
      expect(actual).toEqual(expected);
    });

    test.each([null, undefined, ""])(
      "Sets trending to false if payload.action.trending is %o",
      (value) => {
        const action = {
          type: "SET_TRENDING",
          payload: {
            trending: value,
          },
        };
        const actual = st.appReducer(initialState, action);
        const expected = {
          randomid: null,
          trending: false,
          term: null,
          results: null,
          autocomplete: [],
        };
        expect(actual).toEqual(expected);
      }
    );

    // test("Sets trending to false if payload.action.trending is null", () => {
    //   const action = {
    //     type: "SET_TRENDING",
    //     payload: {
    //       trending: null,
    //     },
    //   };
    //   const actual = st.appReducer(initialState, action);
    //   const expected = {
    //     randomid: null,
    //     trending: false,
    //     term: null,
    //     results: null,
    //     autocomplete: [],
    //   };
    //   expect(actual).toEqual(expected);
    // });
  });
});
