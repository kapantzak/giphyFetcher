import {
  getPaginationItemRest,
  getPaginationItem,
  getNumberOfPages,
  getPaginationItemArrow,
  getPaginationArrow,
  getArrayOfPages,
} from "../src/helpers/paginationHelper";

describe("getPaginationItemRest()", () => {
  test("Renders correctly", () => {
    const actual = getPaginationItemRest();
    expect(actual).toMatchSnapshot();
  });
});

describe("getPaginationItem()", () => {
  test("Renders correctly", () => {
    const callback = () => {};
    const actual = getPaginationItem(1, callback);
    expect(actual).toMatchSnapshot();
  });

  test("Active page rendered correctly", () => {
    const callback = () => {};
    const actual = getPaginationItem(1, callback, true);
    expect(actual).toMatchSnapshot();
  });
});

describe("getNumberOfPages()", () => {
  test.each([
    [1, 25, 25],
    [2, 25, 50],
    [2, 25, 26],
    [1, 25, 1],
  ])(
    "Returns %d pages for count %d of total %d",
    (expected, count, totalCount) => {
      const actual = getNumberOfPages({ count, totalCount });
      expect(actual).toBe(expected);
    }
  );

  test("Return zero if totalCount is zero", () => {
    const actual = getNumberOfPages({ count: 10, totalCount: 0 });
    const expected = 0;
    expect(actual).toBe(expected);
  });
});

describe("getPaginationItemArrow()", () => {
  const callback = () => {};

  test("Left item renders correctly", () => {
    const actual = getPaginationItemArrow("left", callback);
    expect(actual).toMatchSnapshot();
  });

  test("Right item renders correctly", () => {
    const actual = getPaginationItemArrow("right", callback);
    expect(actual).toMatchSnapshot();
  });

  test("Returns null for invalid direction parameter", () => {
    const actual = getPaginationItemArrow("up", callback);
    expect(actual).toBeNull();
  });
});

describe("getPaginationArrow()", () => {
  test("Prev arrow renders correctly", () => {
    const actual = getPaginationArrow("left");
    expect(actual).toMatchSnapshot();
  });

  test("Next arrow renders correctly", () => {
    const actual = getPaginationArrow("right");
    expect(actual).toMatchSnapshot();
  });
});

describe("getArrayOfPages()", () => {
  test.each([
    [
      [0, 1],
      {
        pageNum: 0,
        count: 5,
        totalCount: 10,
      },
    ],
    [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      {
        pageNum: 0,
        count: 5,
        totalCount: 50,
      },
    ],
    [
      [0, 1, 2, 3, -1, 99],
      {
        pageNum: 0,
        count: 10,
        totalCount: 1000,
      },
    ],
    [
      [0, -1, 96, 97, 98, 99],
      {
        pageNum: 99,
        count: 10,
        totalCount: 1000,
      },
    ],
    [
      [0, -1, 39, 40, 41, -1, 99],
      {
        pageNum: 40,
        count: 10,
        totalCount: 1000,
      },
    ],
    [
      [0, -1, 49, 50, 51, -1, 99],
      {
        pageNum: 50,
        count: 10,
        totalCount: 1000,
      },
    ],
    [
      [0, -1, 59, 60, 61, -1, 99],
      {
        pageNum: 60,
        count: 10,
        totalCount: 1000,
      },
    ],
    [
      [],
      {
        pageNum: 60,
        count: 10,
        totalCount: 0,
      },
    ],
  ])("Returns %j for object %j", (expected, obj) => {
    const actual = getArrayOfPages(obj);
    expect(actual).toEqual(expected);
  });
});
