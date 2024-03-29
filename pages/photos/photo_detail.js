"use strict";

// Import
import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";

// Add ripple effect to all elements with the attribute "data-ripple"

const $rippleElements = document.querySelectorAll("[data-ripple]");
$rippleElements.forEach((el) => ripple(el));

// Page transition

window.addEventListener("loadstart", () => {
  document.body.style.opacity = 0;
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 1;
});

// Menu toggle

const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");
$menuWrappers.forEach(($menuWrapper) => {
  menu($menuWrapper);
});

// Add to favorites

const favoritePhotos = JSON.parse(localStorage.getItem("favorites")).photos;
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const photoId = window.location.search.split("=")[1];

$favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active");

favorite($favoriteBtn, "photos", photoId);

// Render detail data

const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(photoId, (data) => {
  const { avg_color, height, width, photographer, alt, src } = data;

  $downloadLink.href = src.original;

  Object.entries(src).forEach((item) => {
    const [key, value] = item;

    $downloadMenu.innerHTML += `
      <a
        href="${value}"
        target="_blank"
        download
        class="menu-item"
        data-ripple
        data-menu-item
      >
        <span class="label-large text">${key}</span>
        <div class="state-layer"></div>
      </a>
    `;
  });

  $detailWrapper.innerHTML = `
    <figure
      class="detail-banner"
      style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color}"
    >
      <img
        src="${src.large2x}"
        width="${width}"
        height="${height}"
        alt="${alt}"
        class="img-cover"
      />
    </figure>

    <p class="title-small">
      Photograph by
      <span class="color-primary">${photographer}</span>
    </p>
  `;

  const $detailImg = $detailWrapper.querySelector("img");

  $detailImg.addEventListener("load", function () {
    this.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 400,
      fill: "forwards",
    });

    if (alt) {
      client.photos.search({ query: alt, page: 1, per_page: 30 }, (data) => {
        loadSimilarPhotos(data);
      });
    } else {
      $loader.style.display = "none";
      $photoGrid.innerHTML = `<p class="title-medium">
        No similar photos found.
      </p>`;
    }
  });
});

// Load similar photos
const $photoGrid = document.querySelector("[data-photo-grid]");
const photoGrid = gridInit($photoGrid);

const $loader = document.querySelector("[data-loader]");

/**
 * Load similar photos
 * @param {object} data - Photo data
 */

const loadSimilarPhotos = function (data) {
  data.photos.forEach((photo) => {
    const $card = photoCard(photo);

    updateGrid($card, photoGrid);
    $loader.style.display = "none";
  });
};
