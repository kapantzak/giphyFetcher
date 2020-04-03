import { buildAutocompleteOptions } from "../src/helpers/markupHelper";

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
