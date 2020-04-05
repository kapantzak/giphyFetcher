import { getElem } from "./markupHelper";

export const getPaginationObject = (elem, options) => {
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
    anchor.appendChild(getPaginationArrow(direction));
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
