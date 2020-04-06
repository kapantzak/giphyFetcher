import {
  buildAutocompleteOptions,
  getResultsReport,
  getNoResultsFeedback,
  getPromptSearch,
  buildGifHolder,
  getElem,
  getImageElem,
  getDeleteGifButton,
  getCopyLinkGifButton,
} from "../src/helpers/markupHelper";

describe("buildAutocompleteOptions()", () => {
  test.each`
    data         | expected
    ${[]}        | ${""}
    ${null}      | ${""}
    ${undefined} | ${""}
  `("Returns $expected if provided with $data", ({ data, expected }) => {
    const actual = buildAutocompleteOptions(data);
    expect(actual).toBe(expected);
  });

  test("Returns the expected string", () => {
    const data = [
      {
        name: "item 1",
      },
      {
        name: "item 2",
      },
    ];
    const actual = buildAutocompleteOptions(data);
    const expected = `<option value="item 1"></option><option value="item 2"></option>`;
    expect(actual).toBe(expected);
  });

  test("Ignores items that do not have a 'name' property", () => {
    const data = [
      {
        name: "item 1",
      },
      {
        prop: "item 2",
      },
    ];
    const actual = buildAutocompleteOptions(data);
    const expected = `<option value="item 1"></option>`;
    expect(actual).toBe(expected);
  });
});

describe("getResultsReport()", () => {
  test("Returns the expected text", () => {
    const paginationData = {
      total_count: 93688,
      count: 25,
      offset: 0,
    };
    const actual = getResultsReport(paginationData);
    const expected = "Displaying 25 of 93688 results";
    expect(actual).toBe(expected);
  });

  test("Renders correct icon if total_count is null", () => {
    const paginationData = {
      total_count: null,
      count: 25,
      offset: 0,
    };
    const actual = getResultsReport(paginationData);
    expect(actual).toMatchSnapshot();
  });

  test("Renders correct icon if total_count is undefined", () => {
    const paginationData = {
      count: 25,
      offset: 0,
    };
    const actual = getResultsReport(paginationData);
    expect(actual).toMatchSnapshot();
  });

  test("Renders correct icon if count is null", () => {
    const paginationData = {
      total_count: 93688,
      count: null,
      offset: 0,
    };
    const actual = getResultsReport(paginationData);
    expect(actual).toMatchSnapshot();
  });

  test("Renders correct icon if count is undefined", () => {
    const paginationData = {
      total_count: 93688,
      offset: 0,
    };
    const actual = getResultsReport(paginationData);
    expect(actual).toMatchSnapshot();
  });

  test("Renders correct icon if paginationData is null", () => {
    const actual = getResultsReport(null);
    expect(actual).toMatchSnapshot();
  });

  test("Renders correct icon if paginationData is undefined", () => {
    const actual = getResultsReport();
    expect(actual).toMatchSnapshot();
  });
});

describe("getNoResultsFeedback()", () => {
  test("Renders correctly", () => {
    const item = getNoResultsFeedback();
    expect(item).toMatchSnapshot();
  });
});

describe("getPromptSearch()", () => {
  test("Renders correctly", () => {
    const item = getPromptSearch();
    expect(item).toMatchSnapshot();
  });
});

describe("buildGifHolder()", () => {
  test("Renders correctly", () => {
    const gifHolder = buildGifHolder({
      id: "img_id",
      type: "gif",
      gifUrl: "https://path/to/image.html",
      title: "img_title",
      imgSrc: "https://path/to/image.gif",
    });
    expect(gifHolder).toMatchSnapshot();
  });
});

describe("getElem()", () => {
  test.each(["div", "span", "img", "button"])("Returns a %s", (elemType) => {
    const elem = getElem(elemType);
    expect(elem.nodeName).toBe(elemType.toUpperCase());
  });

  test("Returns null for invalid html tag", () => {
    const elem = getElem("test");
    expect(elem).toBeNull();
  });

  test("Returns html element with the correct class list", () => {
    const elem = getElem("div", ["test-class-1", "test-class-2"]);
    expect(elem.className).toBe("test-class-1 test-class-2");
  });

  test.each([
    ["null", null],
    ["undefined", undefined],
    ["empty string", ""],
  ])("Returns null if element type is %s", (descr, elemType) => {
    const elem = getElem(elemType);
    expect(elem).toBeNull();
  });
});

describe("getImageElem()", () => {
  const imgData = {
    imgSrc: "https://path/to/img.gif",
    title: "img_title",
  };

  test("Renders corectly", () => {
    const img = getImageElem(imgData);
    expect(img).toMatchSnapshot();
  });

  test("Returns image element with expected src and title attrinutes", () => {
    const img = getImageElem(imgData);
    expect(img.src).toBe("https://path/to/img.gif");
    expect(img.getAttribute("title")).toBe("img_title");
  });
});

describe("getDeleteGifButton()", () => {
  test("Renders corectly", () => {
    const btn = getDeleteGifButton("img_id");
    expect(btn).toMatchSnapshot();
  });

  test("Returns button with text 'Delete'", () => {
    const btn = getDeleteGifButton("img_id");
    expect(btn.innerHTML).toBe("Delete");
  });
});

describe("getCopyLinkGifButton()", () => {
  test("Renders corectly", () => {
    const btn = getCopyLinkGifButton("https://path/to/img.html");
    expect(btn).toMatchSnapshot();
  });

  test("Returns button with text 'Copy link'", () => {
    const btn = getCopyLinkGifButton("https://path/to/img.html");
    expect(btn.querySelector(".btn-gif-action-text").innerText).toBe(
      "Copy link"
    );
  });
});
