"use strict";

// Import
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

// Show filter bar if searched anything

const $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * Init filter
 */

const $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach(($filterWrapper) => {
  filter($filterWrapper, window.filterObj, (newObj) => {
    window.filterObj = newObj;
    updateUrl(newObj, "photos");
  });
});

/**
 * Render curated or searched photos
 * If searched something then render searched photos
 * Otherwise render curated photos
 */

const $photoGrid = document.querySelector("[data-photo-grid]");
const $title = document.querySelector("[data-title]");
const photoGrid = gridInit($photoGrid);

const perPage = 30;
let currentPage = 1,
  totalPages = 1;

const searchUrl = window.location.search.slice(1);
let /** {object} */ searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} photos` : "Curated photos";

$title.textContent = title;
document.title = title;

let isLoaded = true;

/**
 * Render photos
 * @param {number} currentPage - Current page number
 */

const renderPhotos = function (currentPage) {
  // only 12 pages allowed or less to reduce API requests
  if (currentPage > 12) {
    $loader.style.display = "none";
    return;
  }

  client.photos[searchObj ? "search" : "curated"](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPages = Math.ceil(data.total_results / perPage);

      data.photos.forEach((photo) => {
        const $photoCard = photoCard(photo);

        updateGrid($photoCard, photoGrid);
      });

      // when photos loader
      isLoaded = true;

      // When no more photos found, hider loader
      currentPage >= totalPages && ($loader.style.display = "none");
    }
  );
};

renderPhotos(currentPage);

// Load more photos
const $loader = document.querySelector("[data-loader]");

const loadMore = function () {
  if (
    $loader.getBoundingClientRect().top <= window.innerHeight &&
    currentPage < totalPages &&
    isLoaded
  ) {
    currentPage++;
    isLoaded = false;
    renderPhotos(currentPage);
  }
};

window.addEventListener("scroll", loadMore);
