import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, ArrowLeft, Phone, MapPin } from "lucide-react";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";
import logoLightAsset from "@/assets/joseph-aziz-logo-light.png";
import prestigeLogo from "@/assets/prestige-property-group-logo.png";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | Joseph Aziz Real Estate" },
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
      <div className="relative mx-auto max-w-3xl px-5 py-12 sm:py-20 text-center flex-1 flex flex-col justify-center items-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
        </div>

        {/* Section Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="section-rule w-8 sm:w-12" />
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Request Confirmed
          </span>
          <span className="section-rule w-8 sm:w-12" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-foreground">
          Thank You! We’ve Received Your <span className="text-primary italic">Evaluation Request</span>.
        </h1>

        <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Before taking on costly renovations or listing your home, our tailored Stay-or-Move evaluation will give you complete clarity on your numbers.
        </p>

        {/* Next Steps Box */}
        <div className="mt-10 w-full text-left rounded-2xl border border-black/[0.08] bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">What Happens Next:</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Property & Neighborhood Review</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Joseph Aziz and our team will analyze your property specifications alongside recent Bergen County comps and renovation yields.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Stay vs. Move Analysis</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  We prepare a comparison of what your home could sell for today vs. its post-renovation value vs. what you could purchase instead.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Direct Conversation</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  We'll contact you within 24 hours to review the breakdown together and answer any questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Homepage Back Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/"
            className="evaluation-button inline-flex items-center justify-center gap-2 py-3 px-6 text-sm sm:text-base font-semibold"
          >
            <ArrowLeft className="size-4" />
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
