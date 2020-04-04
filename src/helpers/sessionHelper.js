import config from "../../appConfig";

const key_randomId = config.sessionStorage.keys.randomId;
const key_searchResults = config.sessionStorage.keys.results;
const key_term = config.sessionStorage.keys.term;

export const cacheRandomId = (id) => {
  if (sessionStorage) {
    sessionStorage.setItem(key_randomId, id);
  }
};

export const getCachedRandomId = () => {
  if (sessionStorage) {
    return sessionStorage.getItem(key_randomId);
  }
  return null;
};

export const cacheSearchTerm = (term) => {
  if (sessionStorage) {
    sessionStorage.setItem(key_term, term);
  }
};

export const getCachedSearchTerm = () => {
  if (sessionStorage) {
    return sessionStorage.getItem(key_term);
  }
  return null;
};

export const clearCachedSearchTerm = () => {
  if (sessionStorage) {
    sessionStorage.removeItem(key_term);
  }
};

export const cacheSearchResults = (results) => {
  if (sessionStorage) {
    sessionStorage.setItem(key_searchResults, JSON.stringify(results));
  }
};

export const getCachedSearchResults = () => {
  if (sessionStorage) {
    const results = sessionStorage.getItem(key_searchResults);
    try {
      return JSON.parse(results);
    } catch (e) {
      return null;
    }
  }
  return null;
};
