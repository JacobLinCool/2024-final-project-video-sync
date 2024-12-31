(function () {
    'use strict';

    const TARGET_SYNC_TIME = '2025-01-01T00:00:00';
    const DESIRED_VIDEO_TIME_SECONDS = 18 * 60 + 35;
    const TOLERANCE_S = 0.5;

    function getVideo(): HTMLVideoElement | null {
        return document.querySelector('video');
    }

    const targetTime = new Date(TARGET_SYNC_TIME).getTime();

    requestAnimationFrame(trySyncVideo);

    function trySyncVideo(): void {
        const currentTime = Date.now();

        if (currentTime >= targetTime) {
            console.warn('The target time has already passed.');
            return;
        }

        const timeUntilTarget = (targetTime - currentTime) / 1000;
        const desiredTimeOffset = DESIRED_VIDEO_TIME_SECONDS - timeUntilTarget;
        const video = getVideo();

        if (video && desiredTimeOffset >= 0) {
            if (Math.abs(video.currentTime - desiredTimeOffset) > TOLERANCE_S) {
                console.log('Syncing video ...');
                video.currentTime = desiredTimeOffset;
            }
        }

        requestAnimationFrame(trySyncVideo);
    }
})();
