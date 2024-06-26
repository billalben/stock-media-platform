"use strict";

import { menu } from "./menu.js";

/**
 * Add filter functionality
 * @param {Node} $filterWrapper - Filter wrapper
 * @param {object} filterObj - Filter object
 * @param {Function} callback - Callback function
 */

export const filter = ($filterWrapper, filterObj, callback) => {
  const $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
  const $filterValue = $filterWrapper.querySelector("[data-filter-value]");
  const $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
  const $filterColorField = $filterWrapper.querySelector("[data-color-field]");
  const filterKey = $filterWrapper.dataset.filter;
  const newObj = filterObj;

  menu($filterWrapper, (filterValue) => {
    $filterValue.textContent = filterValue;
    $filterChip.classList.add("selected");

    newObj[filterKey] = filterValue;
    callback(newObj);
  });

  $filterClearBtn.addEventListener("click", () => {
    $filterChip.classList.remove("selected");
    $filterValue.textContent = $filterValue.dataset.filterValue;

    delete newObj[filterKey];
    callback(newObj);
  });

  $filterColorField?.addEventListener("change", function () {
    const filterValue = this.value.toLowerCase();

    $filterValue.textContent = filterValue;
    $filterChip.classList.add("selected");

    newObj[filterKey] = filterValue;
    callback(newObj);
  })
};
