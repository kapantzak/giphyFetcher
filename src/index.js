import { createStore } from "redux";
import { appReducer, updateTerm } from "./helpers/stateHelper";
import { getRandomId, searchGifs } from "./helpers/apiHelper";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

let store = null;

const init = async () => {
  await initStore();
  addEventListeners();
  // const randomid = await getRandomId();
  // if (randomid) {
  //   const gifs = await searchGifs({
  //     term: "cat",
  //     offset: 0,
  //     randomid
  //   });
  //   console.log(gifs);
  // }
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

const getTerm = () => {
  const state = store.getState();
  return state.term;
};

const txtSearchChangeHandler = e => {
  const term = e.currentTarget.value;
  store.dispatch(updateTerm(term));
};

const btnGetTrendingClickHandler = () => {
  alert("Get trending");
};

const btnSearchClickHandler = () => {
  const term = getTerm();
  alert(term);
};

const btnClearClickHandler = () => {
  alert("Clear");
};

const addEventListeners = () => {
  const txtSearch = document.getElementById("txtSearch");
  if (txtSearch) {
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
