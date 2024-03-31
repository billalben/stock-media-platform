"use strict";

// Import
import { client } from "../../js/api_configure.js";
import { collectionCard } from "../../js/collection_card.js";

// Render Featured Collection

const $collectionGrid = document.querySelector("[data-collection-grid]");
const perPage = 36;
let currentPage = 1;
let totalPage = 0;

/**
 * @param {number} page - The page number
 */

const loadCollections = function (page) {
  client.collections.featured({ per_page: perPage, page }, (data) => {
    totalPage = Math.ceil(data.total_results / perPage);

    data.collections.forEach((collection) => {
      // $collectionGrid.appendChild(collectionCard(collection));

      const $collectionCard = collectionCard(collection);
      $collectionGrid.appendChild($collectionCard);
    });

    isLoaded = true;
    currentPage >= totalPage && ($loader.style.display = "none");
  });
};

loadCollections(currentPage);

// Load more collections
const $loader = document.querySelector("[data-loader]");
let isLoaded = false;

const loadMore = function () {
  if (
    $loader.getBoundingClientRect().top <= window.innerHeight &&
    currentPage <= totalPage &&
    isLoaded
  ) {
    currentPage++;
    isLoaded = false;
    loadCollections(currentPage);
  }
};

window.addEventListener("scroll", loadMore);
