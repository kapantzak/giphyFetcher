export const buildAutocompleteOptions = (data) => {
  if (data) {
    return data
      .reduce((acc, val) => {
        if (val.hasOwnProperty("name")) {
          acc.push(`<option value="${val.name}"></option>`);
        }
        return acc;
      }, [])
      .join("");
  }
  return "";
};

export const buildGifHolder = (data) => {};
