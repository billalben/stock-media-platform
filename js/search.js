"use strict";

// Import
import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";

// Search view toggle in small screens
const $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const $searchView = document.querySelector("[data-search-view]");

addEventOnElements($searchTogglers, "click", () =>
  $searchView.classList.toggle("show")
);

// Search clear
const $searchField = document.querySelector("[data-search-field]");
const $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn.addEventListener("click", () => {
  $searchField.value = "";
  $searchField.focus();
});

// Search type
const $searchSegment = document.querySelector("[data-segment='search']");
const $activeSegmentBtn = document.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, (segmentValue) => (window.searchType = segmentValue));

// Search submit
const $searchBtn = document.querySelector("[data-search-btn]");
$searchBtn.addEventListener("click", () => {
  const searchValue = $searchField.value.trim();

  if (searchValue) {
    updateSearchHistory(searchValue);
    window.filterObj.query = searchValue;
    updateUrl(window.filterObj, window.searchType);
  }
});

// Search on enter key press
$searchField.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && $searchField.value.trim()) $searchBtn.click();
});

//! Search History

// Initial search history
let searchHistory = { items: [] };

if (window.localStorage.getItem("search_history")) {
  searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
} else {
  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

// Update search history
const updateSearchHistory = (searchValue) => {
  /**
   * if searchValue is already in the searchHistory.items,
   * remove it from the array and add it to the beginning.
   * this ensures that the latest search is always at the top.
   */

  if (searchHistory.items.includes(searchValue)) {
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
  }

  searchHistory.items.unshift(searchValue);

  window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
};

// Render search history items in search view
const $searchList = document.querySelector("[data-search-list]");
const historyLength = searchHistory.items.length;

for (let i = 0; i < historyLength && i <= 5; i++) {
  const $listItem = document.createElement("button");
  $listItem.classList.add("list-item");

  $listItem.innerHTML = `
    <span class="material-symbols-outlined leading-icon" aria-hidden="true">
      history
    </span>
    <span class="body-large text">${searchHistory.items[i]}</span>
    <div class="state-layer"></div>
  `;

  ripple($listItem);

  $listItem.addEventListener("click", function () {
    $searchField.value = this.children[1].textContent;
    $searchBtn.click();
  });

  $searchList.appendChild($listItem);
}

// Show searched value in search field after reload
const search = urlDecode(window.location.search.slice(1));

if (search.query) $searchField.value = search.query;
