import { getRandomIdRequestUrl } from "../src/helpers/apiHelper";
import config from "./apiHelper/apiHelperConfig.json";

describe("getRandomIdRequestUrl", () => {
  test("Returns the expected url based on provided config", () => {
    const actual = getRandomIdRequestUrl(config);
    const expected = "api.giphy.com/v1/randomid?api_key=API_KEY";
    expect(actual).toBe(expected);
  });
});
