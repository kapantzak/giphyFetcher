import {
  getPaginationItemRest,
  getPaginationItem,
  getNumberOfPages,
  getPaginationItemArrow,
  getPaginationArrow,
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
