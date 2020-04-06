import { createStore } from "redux";
import {
  appReducer,
  updateTerm,
  updateResults,
  updateAutocomplete,
} from "./helpers/stateHelper";
import { getRandomId, searchGifs, getAutocomplete } from "./helpers/apiHelper";
import {
  buildAutocompleteOptions,
  getResultsReport,
  buildGifHolder,
} from "./helpers/markupHelper";
import {
  getCachedSearchResults,
  cacheSearchTerm,
  clearCachedSearchTerm,
  getCachedSearchTerm,
} from "./helpers/sessionHelper";
import { getPaginationObject } from "./helpers/paginationHelper";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

let store = null;
let paginationObj = null;

const init = async () => {
  await initStore();
  addEventListeners();
  updateMarkup();
};

// State ----------------------------------------------------------------------- //

const getInitialState = async () => {
  const randomid = await getRandomId();
  return {
    randomid,
    term: getInitialSearchTerm(),
    autocomplete: [],
    results: getInitialResults(),
  };
};

const getInitialSearchTerm = () => {
  const cachedSearchTerm = getCachedSearchTerm();
  return cachedSearchTerm || null;
};

const getInitialResults = () => {
  const cachedResults = getCachedSearchResults();
  return cachedResults || null;
};

const initStore = async () => {
  const initialState = await getInitialState();
  store = createStore(appReducer, initialState);
};

const getStateTerm = () => {
  const state = store.getState();
  return state.term;
};

const getStateRandomid = () => {
  const state = store.getState();
  return state.randomid;
};

const getStateResults = () => {
  const state = store.getState();
  return state.results;
};

const getStatePaginationData = () => {
  return (getStateResults() || {}).pagination || {};
};

const updateAutocompleteState = async (term) => {
  const optionsData = await getAutocomplete(term);
  if (optionsData) {
    store.dispatch(updateAutocomplete(optionsData.data || []));
  }
};

// API calls ------------------------------------------------------------------- //

const getGifs = async (offset = 0) => {
  const term = getStateTerm();
  const randomid = getStateRandomid();
  const gifs = await searchGifs({
    term,
    offset,
    randomid,
  });
  if (gifs) {
    store.dispatch(updateResults(gifs));
  }
};

const getGifsAndUpdateResults = async (offset = 0) => {
  console.log(offset);
  await getGifs(offset);
  updateMarkup();
};

// Markup ---------------------------------------------------------------------- //

const updateAutocompleteMarkup = () => {
  const state = store.getState();
  const autocompleteData = state.autocomplete || [];
  const autocompleteOptions = buildAutocompleteOptions(autocompleteData);
  const dtlSearch = document.getElementById("dtlSearch");
  if (dtlSearch) {
    dtlSearch.innerHTML = autocompleteOptions;
  }
};

const updateMarkup = () => {
  const state = store.getState();
  updateSearchTermValue(state);
  updateResultsMarkup(state);
  updatePaginationMarkup(state);
};

const updateSearchTermValue = (state) => {
  const term = state.term;
  if (term) {
    const txtSearch = document.getElementById("txtSearch");
    if (txtSearch) {
      txtSearch.value = term;
    }
  }
};

const updateResultsMarkup = (state) => {
  const gifs = (state.results || {}).data || null;
  const resultsHolderElem = document.getElementById("resultsHolder");
  if (resultsHolderElem) {
    resultsHolderElem.innerHTML = "";
    (gifs || []).forEach((x) => {
      const gifHolder = buildGifHolder(x);
      resultsHolderElem.appendChild(gifHolder);
    });
  }
};

const updatePaginationMarkup = (state) => {
  const pagination = (state.results || {}).pagination || null;
  updateResultsResportMarkup(pagination);
  updatePaginationElement(pagination);
};

const updateResultsResportMarkup = (pagination) => {
  const resultsReport = getResultsReport(pagination);
  const resultsReportElem = document.getElementById("resultsReport");
  if (resultsReportElem) {
    resultsReportElem.innerHTML = resultsReport;
  }
};

// Pagination ------------------------------------------------------------------ //

const pageNavigationHandler = async (pageNumOrAction) => {
  const statePagination = getStatePaginationData();
  const offset = Number(statePagination.offset);
  const count = Number(statePagination.count);
  let requestOffset = 0;
  if (pageNumOrAction === "left") {
    requestOffset = offset - count;
  } else if (pageNumOrAction === "right") {
    requestOffset = offset + count;
  } else {
    const num = Number(pageNumOrAction);
    if (!isNaN(num)) {
      requestOffset = (num - 1) * count;
    }
  }
  await getGifsAndUpdateResults(requestOffset);
};

const updatePaginationElement = (paginationData) => {
  if (paginationData) {
    if (!paginationObj) {
      const paginationHolder = document.getElementById("paginationHolder");
      if (paginationHolder) {
        paginationObj = getPaginationObject(paginationHolder, {
          offset: paginationData.offset,
          count: paginationData.count,
          totalCount: paginationData.total_count,
          pageNum: paginationData.pageNum,
          callback: pageNavigationHandler,
        });
      }
    } else {
      paginationObj.updatePages({
        offset: paginationData.offset,
        count: paginationData.count,
        totalCount: paginationData.total_count,
        pageNum: paginationData.pageNum,
      });
    }
  }
};

// Event listeners ------------------------------------------------------------- //

const txtSearchChangeHandler = async (e) => {
  const val = e.currentTarget.value;
  store.dispatch(updateTerm(val));
  cacheSearchTerm(val);
  await getGifsAndUpdateResults();
};

const txtSearchKeyPressHandler = (e) => {
  if (e.key === "Enter") {
    e.currentTarget.blur();
  }
};

let inputCounter = null;
const txtSearchInputHandler = async (e) => {
  const val = e.currentTarget.value;
  if (val.length >= 2) {
    if (inputCounter) {
      clearTimeout(inputCounter);
      inputCounter = null;
    }
    setTimeout(async () => {
      await updateAutocompleteState(val);
      updateAutocompleteMarkup();
    }, 250);
  }
};

const btnGetTrendingClickHandler = () => {
  alert("Get trending");
};

const btnClearClickHandler = () => {
  const txtSearch = document.getElementById("txtSearch");
  if (txtSearch) {
    txtSearch.value = "";
  }
  store.dispatch(updateTerm(null));
  clearCachedSearchTerm();
};

const addEventListeners = () => {
  // Text input
  const txtSearch = document.getElementById("txtSearch");
  if (txtSearch) {
    txtSearch.addEventListener("input", txtSearchInputHandler);
    txtSearch.addEventListener("change", txtSearchChangeHandler);
    txtSearch.addEventListener("keypress", txtSearchKeyPressHandler);
  }

  // Get trending button
  const btnGetTrending = document.getElementById("btnGetTrending");
  if (btnGetTrending) {
    btnGetTrending.addEventListener("click", btnGetTrendingClickHandler);
  }

  // Clear button
  const btnClear = document.getElementById("btnClear");
  if (btnClear) {
    btnClear.addEventListener("click", btnClearClickHandler);
  }
};

// Document content loaded
document.addEventListener("DOMContentLoaded", init);
