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
  overlayText?: string;
}

export function WistiaVideo({
  mediaId,
  aspect,
  label,
  className = "",
  compactPlayButton = false,
  overlayText,
}: WistiaVideoProps) {
  const playerRef = useRef<WistiaPlayerElement | null>(null);
  const [paused, setPaused] = useState(compactPlayButton);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    let playing = false;
    const onPause = () => {
      playing = false;
      setPaused(true);
      setIsPlaying(false);
    };
    const onPlay = () => {
      playing = true;
      setPaused(false);
      setIsPlaying(true);
    };
    const onEnded = () => {
      playing = false;
      setPaused(compactPlayButton);
      setIsPlaying(false);
    };
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

    // Refine and scale the play button inside Wistia shadow DOM
    const refineButton = () => {
      try {
        const shadow = player.shadowRoot;
        if (shadow) {
          const bpbWrapper = shadow.querySelector(".w-bpb-wrapper") as HTMLElement | null;
          if (bpbWrapper && !bpbWrapper.dataset.refined) {
            bpbWrapper.dataset.refined = "true";
            bpbWrapper.style.transform = "scale(0.62)";
            bpbWrapper.style.transformOrigin = "center";
            bpbWrapper.style.borderRadius = "16px";
            bpbWrapper.style.border = "1px solid rgba(255, 255, 255, 0.35)";
            bpbWrapper.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.55)";
            bpbWrapper.style.transition = "transform 180ms ease, box-shadow 180ms ease";
          }
        }
      } catch {
        // Safe shadow DOM access fallback
      }
    };

    refineButton();
    const interval = setInterval(refineButton, 200);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
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

    try {
      void Promise.resolve(player.play()).catch(() => {
        // Keep button available if playback is blocked
      });
    } catch {
      // Resume button remains available
    }
  }

  return (
    <div className={`wistia-video relative w-full ${className}`} style={{ aspectRatio: aspect }}>
      {createElement("wistia-player", {
        ref: playerRef,
        "media-id": mediaId,
        aspect,
        "player-color": "#323644",
        autoplay: "false",
        "fullscreen-control": "false",
        "play-bar-control": "true",
        "play-pause-control": "true",
        "play-pause-notifier": "false",
        ...(compactPlayButton ? { "big-play-button": "false" } : {}),
        "aria-label": label,
        style: { backgroundImage: `url(https://fast.wistia.com/embed/medias/${mediaId}/swatch)` },
      })}

      {overlayText && !isPlaying && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-2 transition-opacity duration-300">
          <div className="h-20 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
          <div className="absolute top-3 sm:top-4 inset-x-0 flex justify-center px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs sm:text-[13px] font-semibold tracking-wide text-white shadow-xl backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span>{overlayText}</span>
            </div>
          </div>
        </div>
      )}

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
