import { getImageSrcFromApiData } from "../src/helpers/transformationHelper";

describe("getImageSrcFromApiData()", () => {
  test("Returns fixed_height_downsampled by default if exists", () => {
    const apiData = {
      images: {
        fixed_height_downsampled: {
          url: "fixed_height_downsampled",
        },
        fixed_height_still: {
          url: "fixed_height_still",
        },
        fixed_height: {
          url: "fixed_height",
        },
        fixed_width_downsampled: {
          url: "fixed_width_downsampled",
        },
        fixed_width_still: {
          url: "fixed_width_still",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_height_downsampled";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_height_downsampled if exists in images object", () => {
    const apiData = {
      images: {
        fixed_height_downsampled: {
          url: "fixed_height_downsampled",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_height_downsampled";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_height_still if fixed_height_downsampled does not exist in api data", () => {
    const apiData = {
      images: {
        fixed_height_still: {
          url: "fixed_height_still",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_height_still";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_height if fixed_height_downsampled and fixed_height_still do not exist in api data", () => {
    const apiData = {
      images: {
        fixed_height: {
          url: "fixed_height",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_height";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_width_downsampled if fixed_height_downsampled, fixed_height_still and fixed_height do not exist in api data", () => {
    const apiData = {
      images: {
        fixed_width_downsampled: {
          url: "fixed_width_downsampled",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_width_downsampled";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_width_still if fixed_height_downsampled, fixed_height_still, fixed_height and fixed_width_downsampled do not exist in api data", () => {
    const apiData = {
      images: {
        fixed_width_still: {
          url: "fixed_width_still",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_width_still";
    expect(actual).toBe(expected);
  });
});
