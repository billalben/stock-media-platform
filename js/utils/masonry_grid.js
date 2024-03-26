"use strict";

/**
 * Initial columns.
 * @param {Node} $gridContainer - Grid container.
 * @returns {object} - Columns & columns height array.
 */

export const gridInit = ($gridContainer) => {
  const $columns = [];
  const $columnsHeight = [];

  const columnCount = Number(
    getComputedStyle($gridContainer).getPropertyValue("--column-count")
  );

  for (let i = 0; i < columnCount; i++) {
    const $column = document.createElement("div");
    $column.classList.add("column");
    $gridContainer.appendChild($column);
    $columns.push($column);
    $columnsHeight.push(0);
  }

  return { $columns, $columnsHeight };
};

/**
 * Update masonry grid.
 * @param {Node} $card - Grid item.
 * @param {Array} columnsHeight - Heights of all columns.
 * @param {NodeList} $columns - All columns.
 */

export const updateGrid = function ($card, columnsHeight, $columns) {
  const minColumnHeight = Math.min(...columnsHeight);
  const minColumnIndex = columnsHeight.indexOf(minColumnHeight);

  $columns[minColumnIndex].appendChild($card);
  columnsHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight;
};
