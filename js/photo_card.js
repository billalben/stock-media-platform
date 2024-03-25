"use strict";

// Import
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";

/**
 * create a photo card
 * @param {object} photo - photo object
 * @returns {HTMLDivElement} - photo card
 */

export const photoCard = (photo) => {
  const root = window.location.origin;
  const {
    alt,
    avg_color: backdropColor,
    width,
    height,
    id,
    src: { large },
  } = photo;

  const $card = document.createElement("div");
  $card.classList.add("card", "grid-item");
  $card.style.backgroundColor = backdropColor;

  const favoriteObj = JSON.parse(localStorage.getItem("favorites"));

  $card.innerHTML = `
    <figure class="card-banner" style="--width: ${width}; --height: ${height}">
      <img
        src="${large}"
        width="${width}"
        height="${height}"
        alt="${alt}"
        loading="lazy"
        class="img-cover"
      />
    </figure>
    <div class="card-content">
      <button
        class="icon-btn small ${favoriteObj.photos[id] ? "active" : ""}"
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
    <a
      href="${root}/pages/photos/photo_detail.html?id=${id}"
      class="state-layer"
    ></a>
  `;

  const $cardBanner = $card.querySelector("img");
  $cardBanner.style.opacity = 0;

  $cardBanner.addEventListener("load", function () {
    this.animate(
      {
        opacity: 1,
      },
      { duration: 400, fill: "forwards" }
    );
  });

  const $rippleElements = [$card, ...$card.querySelectorAll("[data-ripple]")];
  $rippleElements.forEach(($rippleElement) => ripple($rippleElement));

  const $favoriteBtn = $card.querySelector("[data-favorite-btn]");
  favorite($favoriteBtn, "photos", id);

  return $card;
};
