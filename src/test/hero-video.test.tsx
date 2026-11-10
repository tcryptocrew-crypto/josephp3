import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WistiaVideo } from "@/components/landing/WistiaVideo";
const HeroVideo = () => <WistiaVideo mediaId="m0m8e6gfb6" aspect="1.7777777777777777" label="Hero video" />;

afterEach(cleanup);

describe("Hero video playback", () => {
  it("resumes the same video at its existing position on every pause", () => {
    const { container } = render(<HeroVideo />);
    const player = container.querySelector("wistia-player")!;
    const play = vi.fn();
    Object.assign(player, { play, currentTime: 42 });

    expect(player).toHaveAttribute("media-id", "m0m8e6gfb6");
    expect(player).toHaveAttribute("fullscreen-control", "false");
    expect(player).toHaveAttribute("play-bar-control", "true");
    expect(screen.queryByRole("button", { name: "Resume video" })).not.toBeInTheDocument();

    for (let cycle = 0; cycle < 3; cycle++) {
      fireEvent(player, new Event("pause"));
      fireEvent.click(screen.getByRole("button", { name: "Resume video" }));
      expect(play).toHaveBeenCalledTimes(cycle + 1);
      // Keep the affordance until the player confirms playback started.
      expect(screen.getByRole("button", { name: "Resume video" })).toBeInTheDocument();
      fireEvent(player, new Event("play"));
      expect(screen.queryByRole("button", { name: "Resume video" })).not.toBeInTheDocument();
      expect(container.querySelector("wistia-player")).toBe(player);
      expect(Reflect.get(player, "currentTime")).toBe(42);
    }
    fireEvent(player, new Event("pause"));
    fireEvent(player, new Event("ended"));
    expect(screen.queryByRole("button", { name: "Resume video" })).not.toBeInTheDocument();
  });

  it("allows retry after rejected playback without replacing the player", async () => {
    const { container } = render(<HeroVideo />);
    const player = container.querySelector("wistia-player")!;
    const play = vi.fn().mockRejectedValueOnce(new Error("Playback blocked")).mockResolvedValue(undefined);
    Object.assign(player, { play });
    fireEvent(player, new Event("pause"));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Resume video" })));
    fireEvent.click(screen.getByRole("button", { name: "Resume video" }));
    expect(play).toHaveBeenCalledTimes(2);
    fireEvent(player, new Event("play"));
    expect(screen.queryByRole("button", { name: "Resume video" })).not.toBeInTheDocument();
    expect(container.querySelector("wistia-player")).toBe(player);
  });

  it("removes the player event listeners when unmounted", () => {
    const { container, unmount } = render(<HeroVideo />);
    const remove = vi.spyOn(container.querySelector("wistia-player")!, "removeEventListener");
    unmount();
    for (const event of ["pause", "play", "ended"]) {
      expect(remove).toHaveBeenCalledWith(event, expect.any(Function));
    }
  });
});
