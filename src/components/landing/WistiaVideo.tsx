import { createElement, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type WistiaPlayerElement = HTMLElement & {
  play: () => Promise<void> | void;
  pause: () => void;
};

interface WistiaVideoProps {
  mediaId: string;
  aspect: string;
  label: string;
  className?: string;
  compactPlayButton?: boolean;
}

export function WistiaVideo({ mediaId, aspect, label, className = "", compactPlayButton = false }: WistiaVideoProps) {
  const playerRef = useRef<WistiaPlayerElement | null>(null);
  const [paused, setPaused] = useState(compactPlayButton);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    let playing = false;
    const onPause = () => { playing = false; setPaused(true); };
    const onPlay = () => { playing = true; setPaused(false); };
    const onEnded = () => { playing = false; setPaused(compactPlayButton); };
    const onReady = () => setReady(true);
    if (typeof player.play === "function") setReady(true);
    const onOtherPlay = (event: Event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.tagName === "WISTIA-PLAYER" &&
        event.target !== player &&
        playing
      ) {
        player.pause();
      }
    };
    document.addEventListener("play", onOtherPlay, true);
    player.addEventListener("pause", onPause);
    player.addEventListener("play", onPlay);
    player.addEventListener("ended", onEnded);
    player.addEventListener("api-ready", onReady);
    return () => {
      document.removeEventListener("play", onOtherPlay, true);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("ended", onEnded);
      player.removeEventListener("api-ready", onReady);
    };
  }, [compactPlayButton]);

  function resume() {
    const player = playerRef.current;
    if (!player) return;

    // Stay in the click gesture for mobile playback. Reuse the same player and
    // position; only its confirmed play event hides the resume button.
    try {
      void Promise.resolve(player.play()).catch(() => {
        // Keep the button available if playback is blocked, so it can be retried.
      });
    } catch {
      // The resume button remains available if the player cannot resume yet.
    }
  }

  return (
    <div className={`wistia-video relative w-full ${className}`} style={{ aspectRatio: aspect }}>
      {createElement("wistia-player", {
        ref: playerRef,
        "media-id": mediaId,
        aspect,
        "player-color": "#191919",
        autoplay: "false",
        "fullscreen-control": "false",
        "play-bar-control": "true",
        "play-pause-control": "true",
        "play-pause-notifier": "false",
        ...(compactPlayButton ? { "big-play-button": "false" } : {}),
        "aria-label": label,
        style: { backgroundImage: `url(https://fast.wistia.com/embed/medias/${mediaId}/swatch)` },
      })}
      {paused && (
        <button
          type="button"
          className={`video-resume${compactPlayButton ? " video-play-compact" : ""}`}
          aria-label={compactPlayButton ? `Play ${label}` : "Resume video"}
          disabled={compactPlayButton && !ready}
          onClick={resume}
        >
          <Play aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
