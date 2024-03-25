"use strict";

// Import
import { ripple } from "./utils/ripple.js";

/**
 * 
 * @param {object} photo - object from API
 * @returns {HTMLDivElement} card div
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
        class="icon-btn small"
        aria-label="Add to favorite"
        data-ripple
        data-toggler-btn
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
  console.log($rippleElements);
  $rippleElements.forEach(($rippleElement) => ripple($rippleElement));

  return $card;
};
