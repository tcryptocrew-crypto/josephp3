import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WistiaVideo } from "./WistiaVideo";

const stories = [
  { id: "s0jsdzilad", aspect: "0.5625" },
  { id: "s0cb5zf8yx", aspect: "0.5625" },
  { id: "26kunyl0qb", aspect: "0.75" },
];

// Keep neighbours on both sides of the centred card at every viewport width.
const track = [...stories, ...stories];

type StoryPlayer = HTMLElement & { pause: () => void };

export function StoriesCarousel() {
  const [ref, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: (_api, event) => !(event.target instanceof Element && event.target.closest("wistia-player, button")),
    breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
  });
  const [sel, setSel] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSel(api.selectedScrollSnap());
      // Stop off-screen audio without resetting or replacing any player's media.
      sectionRef.current?.querySelectorAll<StoryPlayer>("wistia-player").forEach((player) => {
        if (typeof player.pause === "function") player.pause();
      });
    };
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const active = sel % stories.length;

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-5xl">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] h-[62%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--contrast-ground)]/10 blur-3xl"
      />
      <div ref={ref} className="story-viewport relative overflow-hidden px-4 py-2 sm:px-6">
        <div className="flex items-center">
          {track.map((story, i) => (
            <div key={i} className="min-w-0 shrink-0 basis-[70%] px-2 sm:basis-[34%] sm:px-3">
              <div
                className={`relative w-full overflow-hidden rounded-2xl bg-black motion-safe:transition-[scale,opacity] motion-safe:duration-300 ${
                  active === i % stories.length
                    ? "media-frame scale-100 opacity-100"
                    : "scale-[0.85] border border-border opacity-40 hover:opacity-75"
                }`}
              >
                <WistiaVideo
                  mediaId={story.id}
                  aspect={story.aspect}
                  label={`Homeowner testimonial ${(i % stories.length) + 1}`}
                  compactPlayButton
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Navigation */}
      <div className="mt-5 flex items-center justify-center gap-2 sm:mt-7 sm:gap-4">
        <button
          onClick={prev}
          aria-label="Previous story"
          className="grid size-11 place-items-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center">
          {stories.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to story ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => api?.scrollTo(i)}
              className="grid size-11 place-items-center rounded-full"
            >
              <span aria-hidden="true" className={`h-2 rounded-full transition-[width,background-color] ${active === i ? "w-5 bg-primary" : "w-2 bg-border"}`} />
            </button>
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next story"
          className="grid size-11 place-items-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
