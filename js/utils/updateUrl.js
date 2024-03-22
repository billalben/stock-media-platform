"use strict";

// Import
import { urlEncode } from "./urlEncode.js";

/**
 * Update the URL
 * @param {object} filterObj - Filter object
 * @param {string} searchType - Search type eg. "videos" or "photos"
 */

export const updateUrl = (filterObj, searchType) => {
  setTimeout(() => {
    const root = window.location.origin;
    const searchQuery = urlEncode(filterObj);
    const url = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
    window.location.href = url;
  }, 500);
};
