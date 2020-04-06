import { getElem } from "./markupHelper";

export const getPaginationObject = (elem, options) => {
  if (elem && options) {
    const ul = getPaginationUl({
      offset: options.offset,
      count: options.count,
      totalCount: options.totalCount,
      pageNum: options.pageNum,
      callback: options.callback,
    });
    const _paginationObj = getPaginationElement(ul);
    const _activePageElement = _paginationObj.querySelector(
      `[data-page="${options.offset}"]`
    );
    if (_activePageElement) {
      _activePageElement.classList.add("active");
    }

    const _replaceUl = ({ offset, count, totalCount, pageNum }) => {
      if (_paginationObj) {
        const updatedUl = getPaginationUl({
          offset,
          count,
          totalCount,
          pageNum,
          callback: options.callback,
        });
        _paginationObj.innerHTML = "";
        _paginationObj.appendChild(updatedUl);
      }
    };

    if (_paginationObj) {
      elem.appendChild(_paginationObj);

      return {
        updatePages: ({ offset, count, totalCount, pageNum }) => {
          _replaceUl({
            offset,
            count,
            totalCount,
            pageNum,
            callback: options.callback,
          });
        },
      };
    } else {
      throw new Error("Could not build pagination object");
    }
  } else {
    throw new Error("Could not initialize pagination without elem or options");
  }
};

export const getPaginationElement = (ul) => {
  const nav = getElem("nav");
  nav.setAttribute("aria-label", "Pagination controls");
  nav.appendChild(ul);
  return nav;
};

export const getPaginationUl = (obj) => {
  const num = getNumberOfPages({
    count: obj.count,
    totalCount: obj.totalCount,
  });
  if (!isNaN(num)) {
    const ul = getElem("ul", ["pagination"]);

    if (obj.pageNum > 0) {
      const prev = getPaginationItemArrow("left", obj.callback);
      ul.appendChild(prev);
    }

    appendPaginationPages(ul, num, obj);

    if (obj.pageNum < num - 1) {
      const next = getPaginationItemArrow("right", obj.callback);
      ul.appendChild(next);
    }
    return ul;
  }
  return null;
};

export const appendPaginationPages = (
  ul,
  numberOfPages,
  { pageNum, callback }
) => {
  const arrayOfPages = getArrayOfPages(numberOfPages, pageNum);
  arrayOfPages.forEach((x, index) => {
    let item = null;
    if (x !== -1) {
      const p = x + 1;
      const isActive = x === pageNum;
      item = getPaginationItem(p, callback, isActive);
    } else {
      item = getPaginationItemRest();
    }
    if (item) {
      ul.appendChild(item);
    }
  });
};

export const getArrayOfPages = (num, pageNum) => {
  if (num > 10) {
    if (pageNum <= 2) {
      return [0, 1, 2, 3, -1, num - 1];
    } else if (pageNum >= num - 3) {
      return [0, -1, num - 4, num - 3, num - 2, num - 1];
    } else {
      const middleIndexes = [pageNum - 1, pageNum, pageNum + 1];
      return [0, -1, ...middleIndexes, -1, num - 1];
    }
  } else {
    return [...Array(num).keys()];
  }
};

export const getNumberOfPages = ({ count, totalCount }) => {
  if (totalCount > 0) {
    // API limit [https://github.com/Giphy/GiphyAPI/issues/88]
    const totalAvailable = totalCount <= 5000 ? totalCount : 5000;
    return Math.ceil(totalAvailable / count);
  }
  return 0;
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
  anchor.setAttribute("data-page", pageNum - 1);
  anchor.innerHTML = pageNum;
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    paginationCallback(pageNum);
  });
  li.appendChild(anchor);
  return li;
};
