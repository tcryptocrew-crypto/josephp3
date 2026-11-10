import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import thumb1 from "@/assets/story-thumb-1.jpg";
import thumb2 from "@/assets/story-thumb-2.jpg";
import thumb3 from "@/assets/story-thumb-3.jpg";

interface Story {
  id: string;
  video: string;
  thumb: string;
  aspectRatio: string;
  modalMaxWidth: string;
}

const stories: Story[] = [
  {
    id: "1xfdqQBR0NwkXVi4GQ6TOnQ-20Iw7OWZl",
    video: "https://drive.google.com/file/d/1xfdqQBR0NwkXVi4GQ6TOnQ-20Iw7OWZl/preview",
    thumb: thumb1,
    aspectRatio: "3 / 4",
    modalMaxWidth: "max-w-2xl",
  },
  {
    id: "1KutRfXHznPrM-B1W29caQ7jNNToOSn7h",
    video: "https://drive.google.com/file/d/1KutRfXHznPrM-B1W29caQ7jNNToOSn7h/preview",
    thumb: thumb2,
    aspectRatio: "9 / 16",
    modalMaxWidth: "max-w-md",
  },
  {
    id: "1veii6vEZsMbOlbQ6vwnStxRJqfbBGmwr",
    video: "https://drive.google.com/file/d/1veii6vEZsMbOlbQ6vwnStxRJqfbBGmwr/preview",
    thumb: thumb3,
    aspectRatio: "9 / 16",
    modalMaxWidth: "max-w-md",
  },
];

// duplicated track so the centred video always has a neighbour on both sides
const track = [...stories, ...stories];

export function StoriesCarousel() {
  const [ref, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
  });
  const [sel, setSel] = useState(0);
  const [modalStoryIndex, setModalStoryIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const on = () => {
      setSel(api.selectedScrollSnap());
    };
    api.on("select", on);
    on();
    return () => {
      api.off("select", on);
    };
  }, [api]);

  // Handle ESC key and arrows inside modal
  useEffect(() => {
    if (modalStoryIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalStoryIndex(null);
      } else if (e.key === "ArrowLeft") {
        setModalStoryIndex((prev) =>
          prev !== null ? (prev - 1 + stories.length) % stories.length : 0,
        );
      } else if (e.key === "ArrowRight") {
        setModalStoryIndex((prev) =>
          prev !== null ? (prev + 1) % stories.length : 0,
        );
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalStoryIndex]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const active = sel % stories.length;

  const currentModalStory =
    modalStoryIndex !== null ? stories[modalStoryIndex] : null;

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-5xl">
      {/* Soft halo behind the centred video */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] h-[62%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--contrast-ground)]/10 blur-3xl"
      />

      <div ref={ref} className="story-viewport relative overflow-hidden px-4 py-2 sm:px-6">
        <div className="flex">
          {track.map((s, i) => {
            const isActive = active === i % stories.length;

            return (
              <div
                key={i}
                className="min-w-0 shrink-0 basis-[70%] px-2 sm:basis-[34%] sm:px-3"
              >
                <div
                  onClick={() => setModalStoryIndex(i % stories.length)}
                  className={`group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-safe:transition-[scale,opacity] motion-safe:duration-300 ${
                    isActive
                      ? "media-frame scale-100 opacity-100"
                      : "scale-[0.85] border border-border opacity-40 hover:opacity-75"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setModalStoryIndex(i % stories.length);
                    }
                  }}
                >
                  {/* Poster thumbnail image */}
                  <img
                    src={s.thumb}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025] motion-safe:group-focus-visible:scale-[1.025]"
                  />

                  {/* Clean dark tint */}
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-12 items-center justify-center rounded-full border border-white/65 bg-foreground/85 text-white shadow-lg backdrop-blur-sm transition-colors motion-safe:transition-[background-color,scale] motion-safe:duration-200 motion-safe:group-hover:scale-[1.035] group-hover:bg-primary group-hover:text-primary-foreground sm:size-16">
                      <Play className="ml-0.5 size-5 fill-current sm:ml-1 sm:size-7" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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

      {/* VIDEO POPUP MODAL - Plays video in TRUE Original Size & Aspect Ratio */}
      {modalStoryIndex !== null && currentModalStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
          onClick={() => setModalStoryIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative flex w-full flex-col items-center justify-center ${currentModalStory.modalMaxWidth}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button top-right */}
            <div className="mb-2 flex w-full justify-end">
              <button
                onClick={() => setModalStoryIndex(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground transition hover:border-primary hover:text-primary cursor-pointer shadow-lg"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player in Original Size / Aspect Ratio with Full Player Controls */}
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-white/25 bg-black shadow-2xl"
              style={{
                aspectRatio: currentModalStory.aspectRatio,
                maxHeight: "84vh",
              }}
            >
              <iframe
                src={`${currentModalStory.video}?autoplay=1`}
                title="Case Study Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
