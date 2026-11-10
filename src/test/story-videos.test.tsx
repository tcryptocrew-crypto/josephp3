import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoriesCarousel } from "@/components/landing/StoriesCarousel";
import { WistiaVideo } from "@/components/landing/WistiaVideo";
const HeroVideo = () => <WistiaVideo mediaId="m0m8e6gfb6" aspect="1.7777777777777777" label="Hero video" />;

const carousel = vi.hoisted(() => ({
  selected: 0,
  select: undefined as (() => void) | undefined,
  api: {
    on: vi.fn((_event: string, cb: () => void) => { carousel.select = cb; }),
    off: vi.fn(),
    selectedScrollSnap: () => carousel.selected,
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
  },
}));
vi.mock("embla-carousel-react", () => ({ default: () => [vi.fn(), carousel.api] }));
afterEach(() => { cleanup(); carousel.selected = 0; vi.clearAllMocks(); });

describe("Inline testimonial videos", () => {
  it("uses all three supplied media IDs and original ratios without the old popup or posters", () => {
    const { container } = render(<StoriesCarousel />);
    const players = [...container.querySelectorAll("wistia-player")];
    expect([...new Set(players.map((p) => p.getAttribute("media-id")))]).toEqual([
      "26kunyl0qb", "s0jsdzilad", "s0cb5zf8yx",
    ]);
    expect(players.slice(0, 3).map((p) => p.getAttribute("aspect"))).toEqual(["0.75", "0.5625", "0.5625"]);
    expect(container.querySelector("iframe, img")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    players.forEach((p) => expect(p).toHaveAttribute("fullscreen-control", "false"));
  });

  it("pauses the previous video when another video starts, including the hero", () => {
    const { container } = render(<><HeroVideo /><StoriesCarousel /></>);
    const players = [...container.querySelectorAll("wistia-player")];
    const hero = players[0]!;
    const pause = vi.fn();
    Object.assign(hero, { state: "playing", pause, currentTime: 52 });
    fireEvent(hero, new Event("play"));
    fireEvent(players[1]!, new Event("play"));
    expect(pause).toHaveBeenCalledTimes(1);
    expect(Reflect.get(hero, "currentTime")).toBe(52);
  });

  it("pauses playback when navigating without remounting or resetting video positions", () => {
    const { container } = render(<StoriesCarousel />);
    const player = container.querySelector("wistia-player")!;
    const pause = vi.fn();
    Object.assign(player, { state: "playing", pause, currentTime: 31 });
    act(() => { carousel.selected = 1; carousel.select?.(); });
    expect(pause).toHaveBeenCalledTimes(1);
    expect(container.querySelector("wistia-player")).toBe(player);
    expect(Reflect.get(player, "currentTime")).toBe(31);
    expect(screen.getByRole("button", { name: "Go to story 2" })).toHaveAttribute("aria-current", "true");
  });
});
