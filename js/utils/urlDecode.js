"use strict";

/**
 * Convert url search string to object
 * @param {string} urlString - url search string
 * @returns {object} - url search object
 */

export const urlDecode = (urlString) => {
  return Object.fromEntries(
    urlString
      .replaceAll(/%23/g, "#")
      .replaceAll(/%20/g, " ")
      .split("&")
      .map((i) => i.split("="))
  );
};
