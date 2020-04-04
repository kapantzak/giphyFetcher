/**
 * Transforms the search endpoint response object to contain only the required information
 * @param {SearchEndpointObject} apiResponseObject
 * @returns {StateObject}
 */
export const transformApiResponseObject = (apiResponseObject) => {
  if (
    apiResponseObject &&
    apiResponseObject.data &&
    apiResponseObject.pagination
  ) {
    const apiDataCollection = apiResponseObject.data.slice();
    const stateData = apiDataCollection.map(transformGifObjectStateData);
    return {
      data: stateData,
      pagination: Object.assign({}, apiResponseObject.pagination),
    };
  }
  return null;
};

/**
 * Transforms the gif object to contain only the required information
 * @param {GifObject} apiData
 * @returns {StateGifObject}
 */
export const transformGifObjectStateData = (apiData) => {
  if (apiData && apiData.id && apiData.url) {
    const imgSrc = getImageSrcFromApiData(apiData);
    if (imgSrc) {
      return {
        id: apiData.id,
        type: apiData.type || null,
        gifUrl: apiData.url,
        title: apiData.title,
        imgSrc,
      };
    }
  }
  return null;
};

export const getImageSrcFromApiData = (apiData) => {
  const images = (apiData || {}).images;
  if (images) {
    if ((images.fixed_height_downsampled || {}).url)
      return images.fixed_height_downsampled.url;

    if ((images.fixed_height_still || {}).url)
      return images.fixed_height_still.url;

    if ((images.fixed_height || {}).url) return images.fixed_height.url;

    if ((images.fixed_width_downsampled || {}).url)
      return images.fixed_width_downsampled.url;

    if ((images.fixed_width_still || {}).url)
      return images.fixed_width_still.url;
  }
  return null;
};
