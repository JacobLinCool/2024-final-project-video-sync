// ==UserScript==
// @name         Real-Time Video Sync
// @namespace    http://tampermonkey.net/
// @version      2024-12-31
// @description  Sync Video by a given real world time.
// @author       Jacob Lin
// @match        https://ani.gamer.com.tw/animeVideo.php?sn=34714
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamer.com.tw
// @grant        none
// ==/UserScript==

// src/index.ts
(function() {
  "use strict";
  const TARGET_SYNC_TIME = "2025-01-01T00:00:00";
  const DESIRED_VIDEO_TIME_SECONDS = 18 * 60 + 35;
  const TOLERANCE_S = 0.5;
  function getVideo() {
    return document.querySelector("video");
  }
  const targetTime = new Date(TARGET_SYNC_TIME).getTime();
  requestAnimationFrame(trySyncVideo);
  function trySyncVideo() {
    const currentTime = Date.now();
    if (currentTime >= targetTime) {
      console.warn("The target time has already passed.");
      return;
    }
    const timeUntilTarget = (targetTime - currentTime) / 1e3;
    const desiredTimeOffset = DESIRED_VIDEO_TIME_SECONDS - timeUntilTarget;
    const video = getVideo();
    if (video && desiredTimeOffset >= 0) {
      if (Math.abs(video.currentTime - desiredTimeOffset) > TOLERANCE_S) {
        console.log("Syncing video ...");
        video.currentTime = desiredTimeOffset;
      }
    }
    requestAnimationFrame(trySyncVideo);
  }
})();
