"use strict";

/**
 * Add event on multiple elements
 * @param {NodeList} elements - Elements to add the event
 * @param {string} evenType - Event type eg. click, mouseover
 * @param {Function} callback - Function to execute
 */

export const addEventOnElements = function (elements, evenType, callback) {
  for (const element of elements) {
    element.addEventListener(evenType, callback);
  }
};
