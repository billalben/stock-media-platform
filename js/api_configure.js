"use strict";

// Import
import { urlEncode } from "./utils/urlEncode.js";

// API Configuration

// const headers = new Headers();
// headers.append("Authorization", API_KEY);
// const requestOptions = { headers };

const mediaProxyURL = "https://my-proxy-server-da7c.onrender.com/stock-media";

/**
 * Fetch data from the API
 * @param {string} url - The URL to fetch data from
 * @param {function} successCallback - The callback function to execute if the fetch is successful
 */

const fetchData = async (url, successCallback) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  } else {
    console.error(data);
  }
};

let requestUrl = "";

// const root = {
//   default: "https://api.pexels.com/v1/",
//   videos: "https://api.pexels.com/videos/",
// };

export const client = {
  photos: {
    /**
     * Search for photos
     * @param {object} parameters - Url object
     * @param {function} callback - The callback function
     */
    search(parameters, callback) {
      requestUrl = `${mediaProxyURL}/photos/search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Curated photos
     * @param {object} parameters - Url object
     * @param {function} callback - The callback function
     */
    curated(parameters, callback) {
      fetchData(`${mediaProxyURL}/photos/curated?${urlEncode(parameters)}`, callback);
    },

    /**
     * Get single photo detail
     * @param {string} id - Photo ID
     * @param {function} callback - The callback function
     */
    detail(id, callback) {
      fetchData(`${mediaProxyURL}/photos/detail/${id}`, callback);
    },
  },

  videos: {
    /**
     * Search for videos
     * @param {object} parameters - Url object
     * @param {function} callback - The callback function
     */
    search(parameters, callback) {
      requestUrl = `${mediaProxyURL}/videos/search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Get popular videos
     * @param {object} parameters - Url object
     * @param {function} callback - The callback function
     */
    popular(parameters, callback) {
      fetchData(`${mediaProxyURL}/videos/popular?${urlEncode(parameters)}`, callback);
    },

    /**
     * Get single videos detail
     * @param {string} id - Videos ID
     * @param {function} callback - The callback function
     */
    detail(id, callback) {
      fetchData(`${mediaProxyURL}/videos/detail/${id}`, callback);
    },
  },

  collections: {
    /**
     * Get featured collections
     * @param {object} parameters - Url object
     * @param {function} callback - The callback function
     */
    featured(parameters, callback) {
      requestUrl = `${mediaProxyURL}/collections/featured?${urlEncode(
        parameters
      )}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Get Collection medias
     * @param {string} id - Collection ID
     * @param {object} parameters - Url object
     * @param {function} callback - The callback function
     */
    detail(id, parameters, callback) {
      requestUrl = `${mediaProxyURL}/collections/detail/${id}?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
  },
};
