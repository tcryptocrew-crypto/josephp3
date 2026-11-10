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
      "s0jsdzilad", "s0cb5zf8yx", "26kunyl0qb",
    ]);
    expect(players.slice(0, 3).map((p) => p.getAttribute("aspect"))).toEqual(["0.5625", "0.5625", "0.75"]);
    expect(container.querySelector("iframe, img")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    players.forEach((p) => expect(p).toHaveAttribute("fullscreen-control", "false"));
    players.forEach((p) => {
      expect(p).toHaveAttribute("big-play-button", "false");
      expect(p.parentElement?.parentElement?.className).not.toContain("aspect-[9/16]");
    });
  });

  it("starts and resumes a testimonial with the same compact button and player", () => {
    const { container } = render(
      <WistiaVideo mediaId="26kunyl0qb" aspect="0.75" label="Testimonial" compactPlayButton />,
    );
    const player = container.querySelector("wistia-player")!;
    const play = vi.fn();
    Object.assign(player, { play, currentTime: 0 });
    const button = screen.getByRole("button", { name: "Play Testimonial" });
    expect(button).toBeDisabled();
    fireEvent(player, new Event("api-ready"));
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(play).toHaveBeenCalledTimes(1);
    fireEvent(player, new Event("play"));
    expect(screen.queryByRole("button", { name: "Play Testimonial" })).not.toBeInTheDocument();
    Object.assign(player, { currentTime: 23 });
    fireEvent(player, new Event("pause"));
    fireEvent.click(screen.getByRole("button", { name: "Play Testimonial" }));
    expect(play).toHaveBeenCalledTimes(2);
    expect(Reflect.get(player, "currentTime")).toBe(23);
    expect(container.querySelector("wistia-player")).toBe(player);
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
