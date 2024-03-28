"use strict";

// Import
import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";

// HEADER ON SCROLL
const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

// Add ripple effect to all elements with the attribute "data-ripple"
const $rippleElements = document.querySelectorAll("[data-ripple]");
$rippleElements.forEach((el) => ripple(el));

// Navbar toggle for mobile screens
const $navTogglers = document.querySelectorAll("[data-nav-toggler]");
const $navbar = document.querySelector("[data-navigation]");
const $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navTogglers, "click", () => {
  $navbar.classList.toggle("show");
  $scrim.classList.toggle("active");
});

// Filter functionality
window.filterObj = {};

// Show all filtered options after reload
if (window.location.search.slice(1)) {
  const /** {object} */ search = urlDecode(window.location.search.slice(1));

  console.log("search", search);

  Object.entries(search).forEach((item) => {
    const filterKey = item[0];
    const filterValue = item[1];

    console.log("item", item);

    window.filterObj[filterKey] = filterValue;

    if (filterKey !== "query") {
      const $filterItem = document.querySelector(
        `[data-filter="${filterKey}"]`
      );

      $filterItem
        ?.querySelector("[data-filter-chip]")
        .classList.add("selected");

      if ($filterItem) {
        $filterItem.querySelector("[data-filter-value]").textContent =
          filterValue;
      }
    }

    console.log("window.filterObj", window.filterObj);
  });
}

// Initial favorite object in local storage
if (!localStorage.getItem("favorites")) {
  const favoriteObj = {
    photos: {},
    videos: {},
  };
  localStorage.setItem("favorites", JSON.stringify(favoriteObj));
}

// Page transition

window.addEventListener("loadstart", () => {
  document.body.style.opacity = 0;
});

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1;
});
