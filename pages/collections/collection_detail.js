"use strict";

// Import
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";
import { urlDecode } from "../../js/utils/urlDecode.js";

// Render collection medias

const $collectionGrid = document.querySelector("[data-collection-grid]");
const $title = document.querySelector("[data-title]");

const collectionGrid = gridInit($collectionGrid);

const perPage = 30;
let currentPage = 1,
  totalPages = 0;

const collectionObj = urlDecode(window.location.search.slice(1));

console.log(collectionObj);

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;

/**
 * @param {number} page - Current page number
 */

const loadCollection = function (page) {
  client.collections.detail(
    collectionObj.collectionId,
    { per_page: perPage, page: page },
    (data) => {
      console.log(data);

      totalPages = Math.ceil(data.total_results / perPage);

      console.log(totalPages);

      data.media.forEach((item) => {
        const $card = item.type === "Photo" ? photoCard(item) : videoCard(item);

        updateGrid($card, collectionGrid);
      });

      isLoaded = true;
      currentPage >= totalPages && ($loader.style.display = "none");
    }
  );
};

loadCollection(currentPage);

let isLoaded = true;
const $loader = document.querySelector("[data-loader]");

const loadMore = function () {
  if (
    $loader.getBoundingClientRect().top <= window.innerHeight &&
    currentPage < totalPages &&
    isLoaded
  ) {
    currentPage++;
    isLoaded = false;
    loadCollection(currentPage);
  }
};

window.addEventListener("scroll", loadMore);
