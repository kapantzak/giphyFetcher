import {
  transformApiImageToStateData,
  getImageSrcFromApiData,
} from "../src/helpers/transformationHelper";

describe("getImageSrcFromApiData()", () => {
  test("Returns fixed_height_downsampled as first option", () => {
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

  test("Returns fixed_height_still as second option", () => {
    const apiData = {
      images: {
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
    const expected = "fixed_height_still";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_height as third option", () => {
    const apiData = {
      images: {
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
    const expected = "fixed_height";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_width_downsampled as fouth option", () => {
    const apiData = {
      images: {
        fixed_width_downsampled: {
          url: "fixed_width_downsampled",
        },
        fixed_width_still: {
          url: "fixed_width_still",
        },
      },
    };
    const actual = getImageSrcFromApiData(apiData);
    const expected = "fixed_width_downsampled";
    expect(actual).toBe(expected);
  });

  test("Returns fixed_width_still as fifth option", () => {
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

  test("Returns null if any of the required properties is found", () => {
    const apiData = {
      images: {},
    };
    const actual = getImageSrcFromApiData(apiData);
    expect(actual).toBeNull();
  });

  test("Returns null if images is null", () => {
    const apiData = {
      images: null,
    };
    const actual = getImageSrcFromApiData(apiData);
    expect(actual).toBeNull();
  });

  test("Returns null if images is undefined", () => {
    const apiData = {
      images: undefined,
    };
    const actual = getImageSrcFromApiData(apiData);
    expect(actual).toBeNull();
  });

  test("Returns null if apiData is null", () => {
    const apiData = null;
    const actual = getImageSrcFromApiData(apiData);
    expect(actual).toBeNull();
  });

  test("Returns null if apiData is undefined", () => {
    const actual = getImageSrcFromApiData();
    expect(actual).toBeNull();
  });
});

describe("transformApiImageToStateData()", () => {
  const apiImage = {
    type: "gif",
    id: "gif_id",
    url: "https://path/to/item.gif",
    title: "Gif title",
    images: {
      fixed_height_downsampled: {
        url: "fixed_height_downsampled",
      },
    },
  };

  test("Returns the expected transformed object", () => {
    const data = Object.assign({}, apiImage);
    const actual = transformApiImageToStateData(data);
    const expected = {
      type: "gif",
      id: "gif_id",
      gifUrl: "https://path/to/item.gif",
      title: "Gif title",
      imgSrc: "fixed_height_downsampled",
    };
    expect(actual).toEqual(expected);
  });

  test("Returns the transformed object with null type", () => {
    const data = Object.assign({}, apiImage, {
      type: undefined,
    });
    const actual = transformApiImageToStateData(data);
    const expected = {
      type: null,
      id: "gif_id",
      gifUrl: "https://path/to/item.gif",
      title: "Gif title",
      imgSrc: "fixed_height_downsampled",
    };
    expect(actual).toEqual(expected);
  });

  test("Returns null if id is undefined", () => {
    const data = Object.assign({}, apiImage, {
      id: undefined,
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if id is null", () => {
    const data = Object.assign({}, apiImage, {
      id: null,
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if url is undefined", () => {
    const data = Object.assign({}, apiImage, {
      url: undefined,
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if url is null", () => {
    const data = Object.assign({}, apiImage, {
      url: null,
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if url is empty string", () => {
    const data = Object.assign({}, apiImage, {
      url: "",
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if images is empty object", () => {
    const data = Object.assign({}, apiImage, {
      images: {},
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if images is null", () => {
    const data = Object.assign({}, apiImage, {
      images: null,
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if images is undefined", () => {
    const data = Object.assign({}, apiImage, {
      images: undefined,
    });
    const actual = transformApiImageToStateData(data);
    expect(actual).toBeNull();
  });
});
