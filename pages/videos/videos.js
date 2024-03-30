"use strict";

// Import
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { videoCard } from "../../js/video_card.js";
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
    updateUrl(newObj, "videos");
  });
});

/**
 * Render popular or searched videos
 * If searched something then render searched videos
 * Otherwise render popular videos
 */

const $videoGrid = document.querySelector("[data-video-grid]");
const $title = document.querySelector("[data-title]");
const videoGrid = gridInit($videoGrid);

const perPage = 30;
let currentPage = 1,
  totalPages = 1;

const searchUrl = window.location.search.slice(1);
let /** {object} */ searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} videos` : "Curated videos";

$title.textContent = title;
document.title = title;

let isLoaded = true;

/**
 * Render videos
 * @param {number} currentPage - Current page number
 */

const renderVideos = function (currentPage) {
  // only 10 pages allowed or less to reduce API requests
  if (currentPage > 10) {
    $loader.style.display = "none";
    return;
  }

  client.videos[searchObj ? "search" : "popular"](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPages = Math.ceil(data.total_results / perPage);

      data.videos.forEach((video) => {
        const $videoCard = videoCard(video);

        updateGrid($videoCard, videoGrid);
      });

      // when video loader
      isLoaded = true;

      // When no more video found, hider loader
      if (currentPage >= totalPages) {
        $loader.style.display = "none";
      }
    }
  );
};

renderVideos(currentPage);

// Load more videos
const $loader = document.querySelector("[data-loader]");

window.addEventListener("scroll", () => {
  if (
    $loader.getBoundingClientRect().top <= window.innerHeight &&
    currentPage < totalPages &&
    isLoaded
  ) {
    currentPage++;
    isLoaded = false;
    renderVideos(currentPage);
  }
});
