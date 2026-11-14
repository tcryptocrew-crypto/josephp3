import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, ArrowLeft, Phone, MapPin } from "lucide-react";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";
import logoLightAsset from "@/assets/joseph-aziz-logo-light.png";
import prestigeLogo from "@/assets/prestige-property-group-logo.png";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Request Received | Joseph Aziz Real Estate" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

export function ThankYouPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const alreadyTracked = sessionStorage.getItem("meta_lead_tracked");
        if (!alreadyTracked) {
          sessionStorage.setItem("meta_lead_tracked", "true");
          const win = window as unknown as { fbq?: (...args: unknown[]) => void };
          if (typeof win.fbq === "function") {
            win.fbq("track", "Lead", {
              content_name: "Lead Form Submission",
              content_category: "Lead Generation",
            });
          }
        }
      } catch {
        const win = window as unknown as { fbq?: (...args: unknown[]) => void };
        if (typeof win.fbq === "function") {
          win.fbq("track", "Lead");
        }
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFBF7] text-foreground flex flex-col justify-between">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[#FFFBF7]/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between px-5">
          <a href="/" aria-label="Joseph Aziz Real Estate" className="flex items-center">
            <span
              role="img"
              aria-label="Joseph Aziz Real Estate"
              className="h-7 sm:h-8 brand-logo block bg-primary"
              style={{ maskImage: `url(${logoDarkAsset})` }}
            />
          </a>
          <a
            href="tel:9738607595"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            <span>973-860-7595</span>
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="relative mx-auto max-w-2xl px-5 py-12 sm:py-20 text-center flex-1 flex flex-col justify-center items-center">
        {/* Brand Eyebrow */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary/80 mb-4">
          JOSEPH AZIZ · REAL ESTATE
        </p>

        {/* Request Received Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-800 mb-6">
          <Check className="h-4 w-4 stroke-[2.5]" />
          <span>REQUEST RECEIVED</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-foreground">
          Your next move starts here.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
          Joseph’s team will contact you to arrange your free home evaluation.
        </p>

        {/* What We'll Talk Through Section */}
        <div className="mt-10 w-full text-left rounded-2xl border border-black/[0.08] bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="section-rule w-6 sm:w-10" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              WHAT WE’LL TALK THROUGH
            </span>
            <span className="section-rule w-6 sm:w-10" />
          </div>

          <div className="space-y-6">
            {/* Item 01 */}
            <div className="flex items-start gap-4">
              <span className="text-sm font-bold tracking-wider text-primary shrink-0 pt-0.5">
                01
              </span>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Your options.
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Whether renovating, adding space, or buying a different home makes the most sense for you.
                </p>
              </div>
            </div>

            {/* Item 02 */}
            <div className="flex items-start gap-4">
              <span className="text-sm font-bold tracking-wider text-primary shrink-0 pt-0.5">
                02
              </span>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Your numbers and next steps.
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  What your home could be worth, the costs to compare, and how the timing could work around your plans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Call Box */}
        <div className="mt-8 w-full rounded-2xl border border-primary/20 bg-primary/[0.03] p-6 text-center">
          <p className="text-sm sm:text-base font-medium text-foreground">
            Want to speak with Joseph directly?
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1 mb-3">
            Call him now
          </p>
          <a
            href="tel:9738607595"
            className="evaluation-button inline-flex items-center justify-center gap-2 py-3 px-6 text-base sm:text-lg font-bold"
          >
            <Phone className="size-4" />
            <span>973-860-7595</span>
          </a>
        </div>

        {/* Free valuation note */}
        <p className="mt-5 text-xs sm:text-sm text-muted-foreground/90 font-medium">
          Free valuation. No obligation to list.
        </p>

        {/* Return to Homepage Link */}
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Homepage</span>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative border-t border-primary bg-primary px-5 py-12 text-background mt-auto">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-base md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src={prestigeLogo}
              alt="Prestige Property Group Montclair"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <img
              src={logoLightAsset}
              alt="Joseph Aziz Real Estate"
              className="h-5 sm:h-5.5 w-auto object-contain opacity-90"
            />
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-5 w-5 text-accent shrink-0" />
            <span>151 Forest St, Unit H<br />Montclair, NJ 07042</span>
          </div>
          <a href="tel:9738607595" className="flex items-center gap-2 hover:text-white hover:underline transition-colors text-white">
            <Phone className="h-5 w-5 text-accent shrink-0" />
            973-860-7595
          </a>
          <div className="flex gap-2 text-sm text-secondary">
            <a href="/" className="hover:text-white hover:underline transition-colors">Home</a>
            <span className="text-secondary/60">|</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        <p className="mt-8 text-center text-sm italic text-secondary/85">
          Property values are estimates, not guarantees of a future sale price. Individual client outcomes vary.
        </p>
      </footer>
    </main>
  );
}
