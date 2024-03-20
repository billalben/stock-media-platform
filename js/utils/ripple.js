"use strict";

/**
 * Add ripple effect to the element
 * @param {Node} $rippleElement - Element to add the ripple effect
 */

export const ripple = function ($rippleElement) {
  $rippleElement.addEventListener("pointerdown", function (e) {
    e.stopImmediatePropagation();

    const $ripple = document.createElement("div");
    $ripple.classList.add("ripple");
    this.appendChild($ripple);

    const removeRipple = () => {
      $ripple.animate({ opacity: 0 }, { fill: "forwards", duration: 200 });

      setTimeout(() => {
        $ripple.remove();
      }, 200);
    };

    this.addEventListener("pointerup", removeRipple);
    this.addEventListener("pointerleave", removeRipple);

    if (!this.classList.contains("icon-btn")) {
      const rippleSize = Math.max(this.clientWidth, this.clientHeight);
      $ripple.style.top = `${e.layerY}px`;
      $ripple.style.left = `${e.layerX}px`;
      $ripple.style.width = `${rippleSize}px`;
      $ripple.style.height = `${rippleSize}px`;
    }
  });
};
