"use strict";

// Import
import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";

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

const favoriteVideos = JSON.parse(localStorage.getItem("favorites")).videos;
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const videoId = window.location.search.split("=")[1];

$favoriteBtn.classList[favoriteVideos[videoId] ? "add" : "remove"]("active");

favorite($favoriteBtn, "videos", videoId);

// Render detail data

const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");

client.videos.detail(videoId, (data) => {
  const {
    width,
    height,
    image,
    user: { name: author },
    video_files,
  } = data;

  const /** {Object} */ hdVideo = video_files.find(
      (item) => item.quality === "hd"
    );
  const { file_type, link } = hdVideo;

  $downloadLink.href = link;

  video_files.forEach((item) => {
    const { width, height, quality, link } = item;

    $downloadMenu.innerHTML += `
      <a href="${link}" target="_blank" download class="menu-item">
        <span class="label-large text">${quality.toUpperCase()}</span>
        <span class="label-large text trailing-text">${width}x${height}</span>
        <div class="state-layer"></div>
      </a>
    `;
  });

  $detailWrapper.innerHTML = `
    <div class="detail-banner" style="aspect-ratio: ${width} / ${height}">
      <video poster="${image}" controls class="img-cover" data-video>
        <source src="${link}" type="${file_type}" />
      </video>
    </div>

    <p class="title-small">
      Video by <span class="color-primary">${author}</span>
    </p>
  `;
});
