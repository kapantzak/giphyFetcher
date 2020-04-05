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

export const pagination = (elem, options) => {
  if (elem && options) {
    let _activePage = (options.offset || 0) + 1;
    const _callback = options.callback;
    const _paginationObj = getPaginationElement(options);

    if (_paginationObj) {
      elem.appendChild(_paginationObj.obj);

      return {
        setActivePage: (pageNumber) => {
          _activePage = pageNumber;
        },
        prev: () => {
          _callback(_activePage - 1);
        },
        next: () => {
          _callback(_activePage + 1);
        },
      };
    } else {
      throw new Error("Could not build pagination object");
    }
  } else {
    throw new Error("Could not initialize pagination without elem or options");
  }
};

export const getPaginationElement = ({
  offset,
  count,
  totalCount,
  callback,
}) => {
  const nav = getElem("nav");
  nav.setAttribute("aria-label", "Pagination controls");
  const ul = getElem("ul", ["pagination"]);
  const prev = getPaginationItemArrow("left", callback);
  const next = getPaginationItemArrow("right", callback);
  const pages = [];

  ul.appendChild(prev);

  // Append pages
  const numberOfPages = getNumberOfPages({ count, totalCount });
  [...Array(numberOfPages).keys()].forEach((index) => {
    const p = index + 1;
    const isActive = index === offset;
    const item = getPaginationItem(p, callback, isActive);
    pages.push(item);
    ul.appendChild(item);
  });

  ul.appendChild(next);
  nav.appendChild(ul);

  return {
    obj: nav,
    prev,
    next,
    pages,
  };
};

/**
 * Calculate the number of pages available based on the total number of items and items per page number
 * @param {object} param0
 * @returns {number}
 */
export const getNumberOfPages = ({ count, totalCount }) => {
  return Math.ceil(totalCount / count);
};

export const getPaginationItemArrow = (direction, callback) => {
  if (["left", "right"].indexOf(direction) !== -1) {
    const li = getElem("li", ["page-item"]);
    const anchor = getElem("a", ["page-link"]);
    anchor.setAttribute("href", "#");
    anchor.innerHTML = getPaginationArrow(direction);
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      callback(direction);
    });
    li.appendChild(anchor);
    return li;
  }
  return null;
};

export const getPaginationArrow = (direction) => {
  const classList =
    direction === "left" ? ["fas", "fa-angle-left"] : ["fas", "fa-angle-right"];
  return getElem("i", classList);
};

export const getPaginationItemRest = () => {
  const li = getElem("li", ["page-item"]);
  const span = getElem("span", ["page-link"]);
  span.innerHTML = "...";
  li.appendChild(span);
  return li;
};

export const getPaginationItem = (
  pageNum,
  paginationCallback,
  isActive = false
) => {
  const li = getElem("li", ["page-item"]);
  const anchorClassList = ["page-link"];
  if (isActive) {
    anchorClassList.push("active");
  }
  const anchor = getElem("a", anchorClassList);
  anchor.setAttribute("href", "#");
  anchor.innerHTML = pageNum;
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    paginationCallback(pageNum);
  });
  li.appendChild(anchor);
  return li;
};
