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
import { transformApiResponseObject } from "./helpers/transformationHelper";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

let store = null;

const init = async () => {
  await initStore();
  addEventListeners();
};

// State ----------------------------------------------------------------------- //

const getInitialState = async () => {
  const randomid = await getRandomId();
  return {
    randomid,
    term: null,
    autocomplete: [],
    results: null,
  };
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

const updateAutocompleteState = async (term) => {
  const optionsData = await getAutocomplete(term);
  if (optionsData) {
    store.dispatch(updateAutocomplete(optionsData.data || []));
  }
};

// API calls ------------------------------------------------------------------- //

const getGifs = async () => {
  const term = getStateTerm();
  const randomid = getStateRandomid();
  const gifs = await searchGifs({
    term,
    offset: 0,
    randomid,
  });
  if (gifs) {
    const stateApiResponseObject = transformApiResponseObject(gifs);
    store.dispatch(updateResults(stateApiResponseObject));
  }
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
  updateResultsMarkup(state);
  updatePaginationMarkup(state);
};

const updateResultsMarkup = (state) => {
  const gifs = state.results.data;
  const resultsHolderElem = document.getElementById("resultsHolder");
  if (resultsHolderElem) {
    resultsHolderElem.innerHTML = "";
    (gifs || []).forEach((x) => {
      const gifHolder = buildGifHolder(x);
      resultsHolderElem.appendChild(gifHolder);
    });
  }
  console.log(gifs);
};

const updatePaginationMarkup = (state) => {
  const pagination = state.results.pagination;
  updateResultsResportMarkup(pagination);
};

const updateResultsResportMarkup = (pagination) => {
  const resultsReport = getResultsReport(pagination);
  const resultsReportElem = document.getElementById("resultsReport");
  if (resultsReportElem) {
    resultsReportElem.innerHTML = resultsReport;
  }
};

// Event listeners ------------------------------------------------------------- //

const txtSearchChangeHandler = async (e) => {
  const val = e.currentTarget.value;
  store.dispatch(updateTerm(val));
  await getGifs();
  updateMarkup();
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
