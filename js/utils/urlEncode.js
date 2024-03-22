"use strict";

/**
 * Convert an object to a URL encoded string
 * @param {object} urlObj - URL object
 * @returns url String
 */

export const urlEncode = (urlObj) => {
  return Object.entries(urlObj)
    .join("&")
    .replace(/,/g, "=")
    .replace(/#/, "%23");
};
