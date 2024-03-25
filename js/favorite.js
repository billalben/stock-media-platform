"use strict";

// Import
import { client } from "./api_configure.js";

/**
 * Add to favorite or remove from favorite
 * @param {Element} $element - The button element
 * @param {string} type - Item type eg. photos, videos
 * @param {number} id - Item id
 */

export const favorite = ($element, type, id) => {
  $element.addEventListener("click", () => {
    $element.setAttribute("disabled", "");
    const favoritesObj = JSON.parse(localStorage.getItem("favorites"));

    if (favoritesObj[type][id]) {
      $element.classList.toggle("active");
      $element.removeAttribute("disabled");

      delete favoritesObj[type][id];
      window.localStorage.setItem("favorites", JSON.stringify(favoritesObj));
    } else {
      client[type].detail(id, (data) => {
        $element.classList.toggle("active");
        $element.removeAttribute("disabled");

        favoritesObj[type][id] = data;

        window.localStorage.setItem("favorites", JSON.stringify(favoritesObj));
      });
    }
  });
};
