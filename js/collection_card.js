"use strict";

// Import
import { ripple } from "./utils/ripple.js";

/**
 * Create a collection card
 * @param {object} collection - Collection object
 * @returns {HTMLElement} - Collection card element
 */

export const collectionCard = (collection) => {
  const root = window.location.origin;
  const { id, title, media_count } = collection;

  const $card = document.createElement("div");
  $card.classList.add("list-item", "grid-card", "two-line");
  $card.setAttribute("title", title);

  $card.innerHTML = `
    <div>
      <h3 class="body-large">${title}</h3>
      <p class="body-medium label">${media_count} media</p>
    </div>
    <a
      href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}"
      class="state-layer"
    ></a>
  `;

  ripple($card);

  return $card;
};
