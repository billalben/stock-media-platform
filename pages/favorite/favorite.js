"use strict";

// Import

import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { segment } from "../../js/segment_btn.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";

// Favorite segment button

const $favoriteSegment = document.querySelector("[data-segment='favorite']");
let favoriteType = "photos";

segment($favoriteSegment, (value) => {
  favoriteType = value;

  $favoriteGrid.innerHTML = "";
  favoriteGrid = gridInit($favoriteGrid);

  loadFavorite(favoriteType, favoriteGrid);
});

// Load favorite items

const $favoriteGrid = document.querySelector("[data-fav-grid]");
let favoriteGrid = gridInit($favoriteGrid);

const favoriteData = JSON.parse(localStorage.getItem("favorites"));

const loadFavorite = function (type, favoriteGridItem) {
  Object.values(favoriteData[type]).forEach((item) => {
    const $card = type === "photos" ? photoCard(item) : videoCard(item);

    updateGrid($card, favoriteGridItem);
  });
};

loadFavorite(favoriteType, favoriteGrid);
