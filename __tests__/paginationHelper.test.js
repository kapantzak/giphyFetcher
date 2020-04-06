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
    [200, 25, 5000],
    [200, 25, 10000],
    [200, 25, 100000],
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
    [[0, 1], 2, 0],
    [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 0],
    [[0, 1, 2, 3, -1, 99], 100, 0],
    [[0, -1, 96, 97, 98, 99], 100, 100],
    [[0, -1, 39, 40, 41, -1, 99], 100, 40],
    [[0, -1, 49, 50, 51, -1, 99], 100, 50],
    [[0, -1, 59, 60, 61, -1, 99], 100, 60],
    [[0, 1, 2, 3, -1, 199], 200, 0],
  ])("Returns %j for object %j", (expected, numberOfPages, pageNum) => {
    const actual = getArrayOfPages(numberOfPages, pageNum);
    expect(actual).toEqual(expected);
  });
});
