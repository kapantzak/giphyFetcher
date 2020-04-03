import axios from "axios";

import config from "../../appConfig";

const apiKey = config.api.apiKey;
const key_randomId = config.sessionStorage.keys.randomId;

export const getRandomIdRequestUrl = config => {
  const endpoints = config.api.endpoints;
  return `${endpoints.base}${endpoints.randomid.url}?${endpoints.randomid.params.key}=${config.api.apiKey}`;
};

export const getRandomId = async () => {
  const cachedRandomId = getCachedRandomId();
  if (cachedRandomId) return cachedRandomId;
  try {
    const url = getRandomIdRequestUrl(config, apiKey);
    const resp = await axios.get(url);
    if (resp.status === 200) {
      const id = ((resp.data || {}).data || {}).random_id || null;
      cacheRandomId(id);
      return id;
    }
    return ((resp.data || {}).meta || {}).msg || `Error with request to ${url}`;
  } catch (e) {
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

export const getGifs = async term => {
  try {
    const resp = await axios.get("");
    return resp.data;
  } catch (e) {
    return null;
  }
};
