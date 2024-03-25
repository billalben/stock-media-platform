"use strict";

// Import
import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";

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

// Initial favorite object in local storage
if (!localStorage.getItem("favorites")) {
  const favoriteObj = {
    photos: {},
    videos: {},
  };
  localStorage.setItem("favorites", JSON.stringify(favoriteObj));
}
