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

export const getResultsReport = (paginationData) => {
  if (paginationData) {
    const total = paginationData.total_count;
    const count = paginationData.count;
    if (
      total !== undefined &&
      total !== null &&
      count !== undefined &&
      count !== null
    )
      return `Displaying ${paginationData.count} of ${paginationData.total_count} results`;
    else return getNoResultsFeedback();
  }
  return getPromptSearch();
};

export const getNoResultsFeedback = () => {
  return `<div class="resuts-icon-holder">
            <i class="far fa-frown"></i>
            <p>We didn't find any results</p>  
          </div>`;
};

export const getPromptSearch = () => {
  return `<div class="resuts-icon-holder">
            <i class="fas fa-search"></i>
            <p>Type something to search!</p>  
          </div>`;
};

export const getImageElem = ({ imgSrc, title }) => {
  const img = getElem("img");
  img.src = imgSrc;
  img.title = title;
  return img;
};

export const getDeleteGifButton = (gifId) => {
  const btn = getElem("button", ["btn", "btn-outline-light"]);
  btn.setAttribute("type", "button");
  btn.setAttribute("title", "Delete this gif");
  btn.innerHTML = "Delete";
  btn.addEventListener("click", () => {
    console.log(gifId);
  });
  return btn;
};

export const getCopyLinkGifButton = (gifUrl) => {
  const btn = getElem("button", ["btn", "btn-outline-light"]);
  btn.setAttribute("type", "button");
  btn.setAttribute("title", "Copy link to clipboard");
  btn.innerHTML = "Copy link";
  btn.addEventListener("click", () => {
    console.log(gifUrl);
  });
  return btn;
};

export const buildGifHolder = (data) => {
  const gifHolder = getElem("div", ["gif-holder"]);
  const gifOverlay = getElem("div", ["gif-overlay"]);
  const gifTools = getElem("div", ["gif-tools"]);

  const img = getImageElem({
    imgSrc: data.imgSrc,
    title: data.title,
  });

  const btnGroup = getElem("div", ["btn-group", "btn-group-sm"]);
  btnGroup.setAttribute("role", "group");

  const btnDelete = getDeleteGifButton(data.id);
  const btnCopyLink = getCopyLinkGifButton(data.gifUrl);
  btnGroup.appendChild(btnDelete);
  btnGroup.appendChild(btnCopyLink);

  gifTools.appendChild(btnGroup);
  gifOverlay.appendChild(gifTools);
  gifHolder.appendChild(img);
  gifHolder.appendChild(gifOverlay);

  return gifHolder;
};

export const getElem = (elemType, classList) => {
  if (elemType) {
    const validHtmlTags = [
      "div",
      "span",
      "img",
      "button",
      "nav",
      "ul",
      "li",
      "a",
      "i",
    ];
    if (validHtmlTags.indexOf(elemType) !== -1) {
      const elem = document.createElement(elemType);
      const classes = classList || [];
      classes.forEach((className) => {
        elem.classList.add(className);
      });
      return elem;
    }
  }
  return null;
};
