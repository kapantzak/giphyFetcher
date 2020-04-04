export const transformApiImageToStateData = (apiData) => {
  if (apiData && apiData.url) {
    const imgSrc = getImageSrcFromApiData(apiData);
    if (imgSrc) {
      return {
        type: apiData.type || null,
        id: apiData.id || null,
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
