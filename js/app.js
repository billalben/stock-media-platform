"use strict";

// Import
import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";

// Render curated photos in home page
const $photoGrid = document.querySelector("[data-photo-grid]");
$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, per_page: 10 }, (data) => {
  $photoGrid.innerHTML = "";

  data.photos.forEach((photo) => {
    const $photoCard = photoCard(photo);
    $photoGrid.appendChild($photoCard);
  });
});
