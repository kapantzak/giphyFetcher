import {
  transformApiResponseObject,
  getPaginationPageNum,
  transformGifObjectStateData,
  getImageSrcFromApiData,
} from "../src/helpers/transformationHelper";

describe("transformApiResponseObject()", () => {
  test("Returns the expected object", () => {
    const apiRespObj = {
      data: [
        {
          type: "gif",
          id: "mlvseq9yvZhba",
          url: "https://giphy.com/gifs/funny-cat-mlvseq9yvZhba",
          slug: "funny-cat-mlvseq9yvZhba",
          bitly_gif_url: "https://gph.is/2d8adKP",
          bitly_url: "https://gph.is/2d8adKP",
          embed_url: "https://giphy.com/embed/mlvseq9yvZhba",
          username: "",
          source: "https://photobucket.com/images/funny%20cat%20gifs",
          title: "bored cat GIF",
          rating: "g",
          content_url: "",
          source_tld: "photobucket.com",
          source_post_url: "https://photobucket.com/images/funny%20cat%20gifs",
          is_sticker: 0,
          import_datetime: "2016-09-22 23:30:56",
          trending_datetime: "2017-07-31 14:30:02",
          images: {
            downsized_large: {
              height: "200",
              size: "126878",
              url:
                "https://media0.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=giphy.gif",
              width: "200",
            },
            fixed_height_small_still: {
              height: "100",
              size: "7427",
              url:
                "https://media0.giphy.com/media/mlvseq9yvZhba/100_s.gif?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=100_s.gif",
              width: "100",
            },
            original: {
              frames: "13",
              hash: "7c08112815394b0aa23dbe818b44dab1",
              height: "200",
              mp4:
                "https://media0.giphy.com/media/mlvseq9yvZhba/giphy.mp4?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=giphy.mp4",
              mp4_size: "296526",
              size: "126878",
              url:
                "https://media0.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=giphy.gif",
              webp:
                "https://media0.giphy.com/media/mlvseq9yvZhba/giphy.webp?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=giphy.webp",
              webp_size: "139154",
              width: "200",
            },
            fixed_height_downsampled: {
              height: "200",
              size: "70950",
              url:
                "https://media0.giphy.com/media/mlvseq9yvZhba/200_d.gif?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=200_d.gif",
              webp:
                "https://media0.giphy.com/media/mlvseq9yvZhba/200_d.webp?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=200_d.webp",
              webp_size: "70012",
              width: "200",
            },
          },
        },
      ],
      pagination: {
        total_count: 93688,
        count: 25,
        offset: 0,
      },
      meta: {
        status: 200,
        msg: "OK",
        response_id: "a1aaacd34cfb35a6384f62dc4abfd9f18e05cc09",
      },
    };
    const actual = transformApiResponseObject(apiRespObj);
    const expected = {
      data: [
        {
          type: "gif",
          id: "mlvseq9yvZhba",
          gifUrl: "https://giphy.com/gifs/funny-cat-mlvseq9yvZhba",
          title: "bored cat GIF",
          imgSrc:
            "https://media0.giphy.com/media/mlvseq9yvZhba/200_d.gif?cid=2c15220aa1aaacd34cfb35a6384f62dc4abfd9f18e05cc09&rid=200_d.gif",
        },
      ],
      pagination: {
        total_count: 93688,
        count: 25,
        offset: 0,
        pageNum: 0,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("Returns the expected object with empty data", () => {
    const apiRespObj = {
      data: [],
      pagination: {
        total_count: 93688,
        count: 25,
        offset: 0,
      },
      meta: {
        status: 200,
        msg: "OK",
        response_id: "a1aaacd34cfb35a6384f62dc4abfd9f18e05cc09",
      },
    };
    const actual = transformApiResponseObject(apiRespObj);
    const expected = {
      data: [],
      pagination: {
        total_count: 93688,
        count: 25,
        offset: 0,
        pageNum: 0,
      },
    };
    expect(actual).toEqual(expected);
  });

  test("Returns null if data array is null", () => {
    const apiRespObj = {
      data: null,
      pagination: {
        total_count: 93688,
        count: 25,
        offset: 0,
      },
    };
    const actual = transformApiResponseObject(apiRespObj);
    expect(actual).toBeNull();
  });

  test("Returns null if data array is undefined", () => {
    const apiRespObj = {
      pagination: {
        total_count: 93688,
        count: 25,
        offset: 0,
      },
    };
    const actual = transformApiResponseObject(apiRespObj);
    expect(actual).toBeNull();
  });

  test("Returns null if pagination object is null", () => {
    const apiRespObj = {
      data: [],
      pagination: null,
    };
    const actual = transformApiResponseObject(apiRespObj);
    expect(actual).toBeNull();
  });

  test("Returns null if pagination object is undefined", () => {
    const apiRespObj = {
      data: [],
    };
    const actual = transformApiResponseObject(apiRespObj);
    expect(actual).toBeNull();
  });

  test("Returns null if the api response object is null", () => {
    const actual = transformApiResponseObject(null);
    expect(actual).toBeNull();
  });

  test("Returns null if the api response object is undefined", () => {
    const actual = transformApiResponseObject();
    expect(actual).toBeNull();
  });
});

describe("getPaginationPageNum()", () => {
  test.each([
    [
      0,
      {
        offset: 0,
        count: 25,
      },
    ],
    [
      0,
      {
        offset: 10,
        count: 25,
      },
    ],
    [
      1,
      {
        offset: 25,
        count: 25,
      },
    ],
    [
      1,
      {
        offset: 30,
        count: 25,
      },
    ],
    [
      2,
      {
        offset: 50,
        count: 25,
      },
    ],
  ])("Returns %d for object %j", (expected, obj) => {
    const actual = getPaginationPageNum(obj);
    expect(actual).toBe(expected);
  });
});

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

describe("transformGifObjectStateData()", () => {
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
    const actual = transformGifObjectStateData(data);
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
    const actual = transformGifObjectStateData(data);
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
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if id is null", () => {
    const data = Object.assign({}, apiImage, {
      id: null,
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if url is undefined", () => {
    const data = Object.assign({}, apiImage, {
      url: undefined,
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if url is null", () => {
    const data = Object.assign({}, apiImage, {
      url: null,
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if url is empty string", () => {
    const data = Object.assign({}, apiImage, {
      url: "",
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if images is empty object", () => {
    const data = Object.assign({}, apiImage, {
      images: {},
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if images is null", () => {
    const data = Object.assign({}, apiImage, {
      images: null,
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });

  test("Returns null if images is undefined", () => {
    const data = Object.assign({}, apiImage, {
      images: undefined,
    });
    const actual = transformGifObjectStateData(data);
    expect(actual).toBeNull();
  });
});
