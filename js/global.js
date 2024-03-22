"use strict";

// Import
import { ripple } from "./utils/ripple.js";

// HEADER ON SCROLL
const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

// Add ripple effect to all elements with the attribute "data-ripple"
const $rippleElements = document.querySelectorAll("[data-ripple]");
$rippleElements.forEach((el) => ripple(el));

// Filter functionality
window.filterObj = {};
