"use strict";

const /** {HTMLElement} */ $HTML = document.documentElement;

let /** {Bool} */ isDark = matchMedia("(prefers-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = () => {
  isDark = !isDark;
  sessionStorage.setItem("theme", isDark ? "light" : "dark");

  // $HTML.dataset.theme = isDark ? "light" : "dark";
  $HTML.dataset.theme = sessionStorage.getItem("theme");
};

window.addEventListener("load", () => {
  const $themeBtn = document.querySelector("[data-theme-toggler]");
  $themeBtn.addEventListener("click", changeTheme);
});
