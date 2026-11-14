import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LeadForm } from "@/components/landing/LeadForm";
import { Route as ThankYouRoute } from "@/routes/thank-you";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

describe("Meta Pixel Lead Tracking & Thank-You Route", () => {
  let fbqMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    sessionStorage.clear();
    fbqMock = vi.fn();
    (window as any).fbq = fbqMock;
  });

  describe("LeadForm Component", () => {
    it("does NOT fire Lead event on form load, resize, or raw form ID messages", () => {
      render(<LeadForm />);

      // Simulate GHL iframe initialization / resize / raw form ID messages
      window.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({ action: "resize", height: 750 }),
        }),
      );
      window.dispatchEvent(
        new MessageEvent("message", {
          data: "068Tat3aDkIti56tSHoO",
        }),
      );
      window.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({ formId: "068Tat3aDkIti56tSHoO" }),
        }),
      );

      expect(fbqMock).not.toHaveBeenCalled();
      expect(sessionStorage.getItem("meta_lead_tracked")).toBeNull();
    });

    it("fires Lead event and sets sessionStorage only on genuine form submit", () => {
      render(<LeadForm />);

      // Simulate genuine submit
      act(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: { type: "form-submitted" },
          }),
        );
      });

      expect(fbqMock).toHaveBeenCalledTimes(1);
      expect(fbqMock).toHaveBeenCalledWith("track", "Lead", {
        content_name: "Lead Form Submission",
        content_category: "Lead Generation",
      });
      expect(sessionStorage.getItem("meta_lead_tracked")).toBe("true");

      // Verify double submission in same session does not re-fire
      act(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: { action: "form_submit" },
          }),
        );
      });

      expect(fbqMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Thank-You Page", () => {
    it("has noindex, nofollow in its route meta tags", () => {
      const meta = (ThankYouRoute.options.head as any)?.().meta;
      expect(meta).toEqual(
        expect.arrayContaining([
          { name: "robots", content: "noindex, nofollow" },
        ]),
      );
    });

    it("matches /thank-you route in the router", () => {
      const router = createRouter({
        routeTree,
        context: { queryClient: new QueryClient() },
      });
      const matches = router.matchRoutes("/thank-you");
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
      expect(matches.at(-1)?.routeId).toBe("/thank-you");
    });

    it("fires fallback Lead event if not already tracked, and sets sessionStorage", () => {
      const ThankYouComponent = ThankYouRoute.options.component!;
      render(<ThankYouComponent />);

      expect(fbqMock).toHaveBeenCalledTimes(1);
      expect(fbqMock).toHaveBeenCalledWith("track", "Lead", {
        content_name: "Lead Form Submission",
        content_category: "Lead Generation",
      });
      expect(sessionStorage.getItem("meta_lead_tracked")).toBe("true");
    });

    it("does NOT double-count Lead event if already tracked (e.g. on page refresh or after form redirect)", () => {
      sessionStorage.setItem("meta_lead_tracked", "true");

      const ThankYouComponent = ThankYouRoute.options.component!;
      render(<ThankYouComponent />);

      expect(fbqMock).not.toHaveBeenCalled();
    });
  });
});
