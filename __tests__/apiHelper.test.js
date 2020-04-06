import {
  getRandomIdRequestUrl,
  searchGifsRequestUrl,
  trendingRequestUrl,
  getAutocompleteRequestUrl,
} from "../src/helpers/apiHelper";

const config = {
  api: {
    apiKey: "API_KEY",
    endpoints: {
      base: "http://api.giphy.com/v1/",
      search: {
        url: "gifs/search",
        params: {
          key: "api_key",
          term: "q",
          offset: "offset",
          randomid: "random_id",
        },
      },
      randomid: {
        url: "randomid",
        params: {
          key: "api_key",
        },
      },
      autocomplete: {
        url: "gifs/search/tags",
        params: {
          key: "api_key",
          term: "q",
        },
      },
      trending: {
        url: "gifs/trending",
        params: {
          key: "api_key",
          offset: "offset",
          randomid: "random_id",
        },
      },
    },
  },
};

describe("getRandomIdRequestUrl()", () => {
  test("Returns the expected random id url based on provided config", () => {
    const actual = getRandomIdRequestUrl(config);
    const expected = "http://api.giphy.com/v1/randomid?api_key=API_KEY";
    expect(actual).toBe(expected);
  });
});

describe("searchGifsRequestUrl()", () => {
  test("Returns the expected search url based on provided config", () => {
    const actual = searchGifsRequestUrl({
      config,
      term: "cat",
      offset: 0,
      randomid: "a_random_id",
    });
    const expected =
      "http://api.giphy.com/v1/gifs/search?api_key=API_KEY&q=cat&offset=0&random_id=a_random_id";
    expect(actual).toBe(expected);
  });
});

describe("trendingRequestUrl()", () => {
  test("Returns the expected trending url based on provided config", () => {
    const actual = trendingRequestUrl({
      config,
      offset: 0,
      randomid: "a_random_id",
    });
    const expected =
      "http://api.giphy.com/v1/gifs/trending?api_key=API_KEY&offset=0&random_id=a_random_id";
    expect(actual).toBe(expected);
  });
});

describe("getAutocompleteRequestUrl()", () => {
  test("Returns the expected autocomplete url based on provided config", () => {
    const actual = getAutocompleteRequestUrl({
      config,
      term: "cat",
    });
    const expected =
      "http://api.giphy.com/v1/gifs/search/tags?api_key=API_KEY&q=cat";
    expect(actual).toBe(expected);
  });
});
