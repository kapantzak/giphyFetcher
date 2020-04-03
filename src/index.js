import { createStore } from "redux";
import {
  appReducer,
  updateTerm,
  updateResults,
  updateAutocomplete
} from "./helpers/stateHelper";
import { getRandomId, searchGifs, getAutocomplete } from "./helpers/apiHelper";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

let store = null;

const init = async () => {
  await initStore();
  addEventListeners();
};

const getInitialState = async () => {
  const randomid = await getRandomId();
  return {
    randomid,
    term: null,
    autocomplete: [],
    results: null
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

const txtSearchChangeHandler = e => {
  const val = e.currentTarget.value;
  store.dispatch(updateTerm(val));
};

let inputCounter = null;
const txtSearchInputHandler = async e => {
  const val = e.currentTarget.value;
  if (val.length >= 2) {
    if (inputCounter) {
      clearTimeout(inputCounter);
      inputCounter = null;
    }
    setTimeout(() => {
      updateAutocompleteState(val);
      updateAutocompleteMarkup();
    }, 500);
  }
};

const updateAutocompleteState = async term => {
  const optionsData = await getAutocomplete(term);
  if (optionsData) {
    store.dispatch(updateAutocomplete(optionsData.data || []));
  }
};

const updateAutocompleteMarkup = () => {
  const state = store.getState();
  const autocompleteData = state.autocomplete || [];
  const autocompleteOptions = buildAutocompleteOptions(autocompleteData);
  const dtlSearch = document.getElementById("dtlSearch");
  if (dtlSearch) {
    dtlSearch.innerHTML = autocompleteOptions;
    dtlSearch.style.display = "block";
  }
};

const buildAutocompleteOptions = data => {
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

const btnGetTrendingClickHandler = () => {
  alert("Get trending");
};

const btnSearchClickHandler = async () => {
  await getGifs();
  console.log(getStateResults());
};

const getGifs = async () => {
  const term = getStateTerm();
  const randomid = getStateRandomid();
  const gifs = await searchGifs({
    term,
    offset: 0,
    randomid
  });
  if (gifs) {
    store.dispatch(updateResults(gifs));
  }
};

const btnClearClickHandler = () => {
  const txtSearch = document.getElementById("txtSearch");
  if (txtSearch) {
    txtSearch.value = "";
  }
  store.dispatch(updateTerm(null));
};

const addEventListeners = () => {
  const txtSearch = document.getElementById("txtSearch");
  if (txtSearch) {
    txtSearch.addEventListener("input", txtSearchInputHandler);
    txtSearch.addEventListener("change", txtSearchChangeHandler);
  }

  const btnGetTrending = document.getElementById("btnGetTrending");
  if (btnGetTrending) {
    btnGetTrending.addEventListener("click", btnGetTrendingClickHandler);
  }

  const btnSearch = document.getElementById("btnSearch");
  if (btnSearch) {
    btnSearch.addEventListener("click", btnSearchClickHandler);
  }

  const btnClear = document.getElementById("btnClear");
  if (btnClear) {
    btnClear.addEventListener("click", btnClearClickHandler);
  }
};

document.addEventListener("DOMContentLoaded", init);
