import axios from "axios";
import config from "../../appConfig";
import {
  cacheRandomId,
  getCachedRandomId,
  cacheSearchResults,
} from "./sessionHelper";
import { transformApiResponseObject } from "./transformationHelper";

const endpoints = config.api.endpoints;

// Random id ---------------------------------------------------------------------------------------------- //

export const getRandomIdRequestUrl = (config) => {
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
      randomid,
    });
    const resp = await axios.get(url);
    const results = resp.data;
    const stateApiResponseObject = transformApiResponseObject(results);
    cacheSearchResults(stateApiResponseObject);
    return stateApiResponseObject;
  } catch (error) {
    return null;
  }
};

// Trending ----------------------------------------------------------------------------------------------- //

export const trendingRequestUrl = ({ config, offset, randomid }) => {
  const endpoints = config.api.endpoints;
  const trending = endpoints.trending;
  const params = trending.params;
  return `${endpoints.base}${trending.url}?${params.key}=${config.api.apiKey}&${params.offset}=${offset}&${params.randomid}=${randomid}`;
};

export const trendingGifs = async ({ offset, randomid }) => {
  try {
    const url = trendingRequestUrl({
      config,
      offset: offset || 0,
      randomid,
    });
    const resp = await axios.get(url);
    const results = resp.data;
    const stateApiResponseObject = transformApiResponseObject(results);
    cacheSearchResults(stateApiResponseObject);
    return stateApiResponseObject;
  } catch (error) {
    return null;
  }
};

// Autocomplete ------------------------------------------------------------------------------------------- //

export const getAutocompleteRequestUrl = ({ config, term }) => {
  const endpoints = config.api.endpoints;
  const autocomplete = endpoints.autocomplete;
  const params = autocomplete.params;
  return `${endpoints.base}${autocomplete.url}?${params.key}=${config.api.apiKey}&${params.term}=${term}`;
};

export const getAutocomplete = async (term) => {
  try {
    const url = getAutocompleteRequestUrl({
      config,
      term,
    });
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    return [];
  }
};
