"use strict";

// Import
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";
import { hoverOnPlay } from "./utils/hoverOnPlay.js";

/**
 * Create a video card
 * @param {object} video - Video object
 * @returns {HTMLElement} - Video card element
 */

export const videoCard = (video) => {
  const root = window.location.origin;
  const { width, height, id, image, video_files } = video;

  const /** {Object} */ sdVideo = video_files.find(
      (item) => item.quality === "sd" && item.width < 1000
    );
  const { file_type, link } = sdVideo;

  const $card = document.createElement("div");
  $card.classList.add("card", "grid-item", "video");

  const favoriteObj = JSON.parse(localStorage.getItem("favorites"));

  $card.innerHTML = `
    <div class="card-banner" style="--width: ${width}; --height: ${height}">
      <video
        poster="${image}"
        muted
        loop
        preload="none"
        class="img-cover"
        data-video
      >
        <source src="${link}" type="${file_type}" />
      </video>
    </div>
    <div class="card-content">
      <button
        class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""}"
        aria-label="Add to favorite"
        data-ripple
        data-favorite-btn
      >
        <span class="material-symbols-outlined" aria-hidden="true">
          favorite
        </span>
        <div class="state-layer"></div>
      </button>
    </div>
    <div class="card-badge" data-card-badge>
      <span class="material-symbols-outlined" aria-hidden="true">
        play_arrow
      </span>
    </div>
    <a
      href="${root}/pages/videos/video_detail.html?id=${id}"
      class="state-layer"
    ></a>
  `;

  const $rippleElements = [$card, ...$card.querySelectorAll("[data-ripple]")];
  $rippleElements.forEach(($rippleElement) => ripple($rippleElement));

  const $favoriteBtn = $card.querySelector("[data-favorite-btn]");
  favorite($favoriteBtn, "videos", id);

  hoverOnPlay($card);

  return $card;
};
