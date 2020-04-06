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

export const getDeleteGifButton = (gifId, deleteGifItem) => {
  const btn = getElem("button", ["btn", "btn-outline-light"]);
  btn.setAttribute("type", "button");
  btn.setAttribute("title", "Delete this gif");
  btn.innerHTML = "Delete";
  btn.addEventListener("click", () => {
    deleteGifItem(gifId);
    btn.closest(".gif-holder").remove();
  });
  return btn;
};

export const getCopyLinkGifButton = (gifUrl) => {
  const btn = getElem("button", ["btn", "btn-outline-light"]);
  btn.setAttribute("type", "button");
  btn.setAttribute("title", "Copy link to clipboard");

  const btnText = getElem("span", ["btn-gif-action-text"]);
  btnText.innerText = "Copy link";

  const checkIcon = getElem("i", ["fas", "fa-check", "btn-gif-action-icon"]);

  btn.appendChild(btnText);
  btn.appendChild(checkIcon);
  btn.addEventListener("click", async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(gifUrl);
        checkIcon.classList.add("gif-action-icon-visible");
        setTimeout(() => {
          checkIcon.classList.remove("gif-action-icon-visible");
        }, 1000);
      } catch (e) {
        //
      }
    }
  });
  return btn;
};

export const buildGifHolder = (data, deleteGifItem) => {
  const gifHolder = getElem("div", ["gif-holder"]);
  const gifOverlay = getElem("div", ["gif-overlay"]);
  const gifTools = getElem("div", ["gif-tools"]);

  const img = getImageElem({
    imgSrc: data.imgSrc,
    title: data.title,
  });

  const btnGroup = getElem("div", ["btn-group", "btn-group-sm"]);
  btnGroup.setAttribute("role", "group");

  const btnDelete = getDeleteGifButton(data.id, deleteGifItem);
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
