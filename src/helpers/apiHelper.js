import axios from "axios";
import config from "../../appConfig";

const endpoints = config.api.endpoints;
const key_randomId = config.sessionStorage.keys.randomId;
const key_searchResults = config.sessionStorage.keys.results;

// Random id ---------------------------------------------------------------------------------------------- //

export const getRandomIdRequestUrl = config => {
  const randomid = endpoints.randomid;
  const params = randomid.params;
  return `${endpoints.base}${randomid.url}?${params.key}=${config.api.apiKey}`;
};

export const getRandomId = async () => {
  const cachedRandomId = getCachedRandomId();
  if (cachedRandomId) return cachedRandomId;
  try {
    const url = getRandomIdRequestUrl(config);
    const resp = await axios.get(url);
    const id = ((resp.data || {}).data || {}).random_id || null;
    cacheRandomId(id);
    return id;
  } catch (error) {
    return null;
  }
};

const cacheRandomId = id => {
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

// Search ------------------------------------------------------------------------------------------------- //

export const searchGifsRequestUrl = ({ config, term, offset, randomid }) => {
  const endpoints = config.api.endpoints;
  const search = endpoints.search;
  const params = search.params;
  return `${endpoints.base}${search.url}?${params.key}=${config.api.apiKey}&${params.term}=${term}&${params.offset}=${offset}&${params.randomid}=${randomid}`;
};

export const searchGifs = async ({ term, offset, randomid }) => {
  try {
    const url = searchGifsRequestUrl({
      config,
      term,
      offset: offset || 0,
      randomid
    });
    const resp = await axios.get(url);
    const results = resp.data;
    cacheSearchResults(results);
    return results;
  } catch (error) {
    return null;
  }
};

const cacheSearchResults = results => {
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

// Autocomplete ------------------------------------------------------------------------------------------- //

export const getAutocompleteRequestUrl = ({ config, term }) => {
  const endpoints = config.api.endpoints;
  const autocomplete = endpoints.autocomplete;
  const params = autocomplete.params;
  return `${endpoints.base}${autocomplete.url}?${params.key}=${config.api.apiKey}&${params.term}=${term}`;
};

export const getAutocomplete = async term => {
  try {
    const url = getAutocompleteRequestUrl({
      config,
      term
    });
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    return [];
  }
};
