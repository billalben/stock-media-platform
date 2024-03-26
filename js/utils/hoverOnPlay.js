"use strict";

export const hoverOnPlay = ($card) => {
  const $cardVideo = $card.querySelector("[data-video]");
  const $cardBadge = $card.querySelector("[data-card-badge]");

  let isPlaying = false;
  let playTimeout = null;

  $card.addEventListener("pointerover", function () {
    playTimeout = setTimeout(() => {
      $cardBadge.style.display = "none";
      $cardVideo
        .play()
        .then((res) => {
          isPlaying = true;
        })
        .catch((err) => {
          isPlaying = false;
        });
    }, 500);
  });

  $card.addEventListener("pointerout", function () {
    playTimeout && clearTimeout(playTimeout);

    $cardBadge.style.display = "grid";
    if (isPlaying) $cardVideo.pause();
  });
};
