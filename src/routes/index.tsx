import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Play, Trophy, Layers, Home, Star, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import { StoriesCarousel } from "@/components/landing/StoriesCarousel";
import { StayOrMoveSection } from "@/components/landing/StayOrMoveSection";
import vsl from "@/assets/vsl-stock.jpg";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";
import logoLightAsset from "@/assets/joseph-aziz-logo-light.png";
import josephAsset from "@/assets/joseph-aziz-keys.png";
import formHouse from "@/assets/form-house-client.jpg";

const TITLE = "Stay-or-Move Evaluation | Joseph Aziz Real Estate, Bergen County";
const DESC =
  "Before you spend $250,000 on an addition, compare what your home could sell for, be worth after the work, and what you could buy instead. Free home evaluation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const faqs = [
  ["We love our location. What if staying makes more sense?", "Then that belongs in the comparison. We will look at what you want to change, whether the proposed work addresses it, and how the numbers compare with moving."],
  ["We already have an architect or construction estimate.", "Bring the plans and estimates you have. Joseph can evaluate the real-estate side of the decision while your architect and construction professionals address design, feasibility, and project costs."],
  ["We do not have plans or estimates yet.", "Start with the home you own and what is no longer working. We can discuss the alternatives and identify what information is still needed before making a meaningful cost comparison."],
  ["Is this an instant online valuation?", "No. The form starts a conversation with Joseph’s team. The evaluation considers your specific home and the changes you are considering, rather than returning an automated number."],
];

function CTA() {
  return (
    <a href="#evaluation" className="evaluation-button">
      <span>Request My Free Home Evaluation</span> <ChevronRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function Logo({ compact, light }: { compact?: boolean; light?: boolean }) {
  if (!light) {
    return (
      <span
        role="img"
        aria-label="Joseph Aziz Real Estate"
        className={`${compact ? "h-8" : "mx-auto h-5 sm:h-7"} brand-logo block bg-primary`}
        style={{ maskImage: `url(${logoDarkAsset})` }}
      />
    );
  }

  return (
    <img
      src={light ? logoLightAsset : logoDarkAsset}
      alt="Joseph Aziz Real Estate"
      className={`${compact ? "h-8" : "mx-auto h-5 sm:h-7"} w-auto`}
    />
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="section-rule w-16 sm:w-28" />
      <span className="section-eyebrow text-sm font-semibold uppercase tracking-[0.25em]">{children}</span>
      <span className="section-rule w-16 sm:w-28" />
    </div>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden text-foreground">
      <div className="relative z-10">
      {/* HERO */}
      <section className="relative bg-transparent">
        <div className="relative mx-auto max-w-5xl px-5 pb-10 pt-4 text-center fade-up sm:pb-12 sm:pt-6">
          <Logo />
          <div className="mt-3 inline-block rounded-full border border-border bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm sm:mt-4 sm:text-sm shadow-xs">
            <span className="text-primary font-bold">Bergen County homeowners</span>
          </div>
          <h1 className="hero-title mx-auto mt-3 max-w-4xl text-foreground sm:mt-4">
            Before You Spend{" "}
            <span className="hero-highlight headline-mark text-white shadow-md">$250,000</span>{" "}
            on an Addition, Find Out What It Would Take to{" "}
            <span className="hero-highlight headline-mark text-white shadow-md">Move</span>{" "}
            Into <em className="hero-outcome text-primary">the Home You Actually Want.</em>
          </h1>
          <button aria-label="Watch the video" className="group media-frame relative mx-auto mt-6 block aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl sm:mt-8">
            <img src={vsl} alt="Modern luxury architectural interior at dusk" loading="lazy" width={1280} height={720} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" />
            <span className="absolute inset-0 bg-black/35" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 sm:gap-4">
              <span className="flex size-12 items-center justify-center rounded-full border border-white/70 bg-foreground/85 text-white shadow-lg motion-safe:transition-transform motion-safe:group-hover:scale-[1.035] min-[380px]:size-14 sm:size-20">
                <Play className="ml-0.5 size-6 fill-current sm:ml-1 sm:size-9" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white sm:text-sm">Watch the video</span>
            </span>
          </button>
          <p className="landing-copy mx-auto mt-5 max-w-[46ch] text-lg text-foreground sm:mt-6 sm:max-w-3xl sm:text-xl font-normal leading-relaxed">
            Joseph Aziz’s Stay-or-Move Evaluation compares what your home could sell for today, what it could be worth after the work, and what you could buy instead, including the costs of selling and moving.
          </p>
          <div className="mt-6 sm:mt-8"><CTA /></div>
        </div>
      </section>

      {/* TRUST */}
      <section id="credentials" className="relative bg-transparent px-5 pb-14">
        <p className="mx-auto mb-6 max-w-md text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
          Free evaluation · No obligation to sell
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 lg:items-stretch lg:gap-5 lg:py-4">
          <p className="hidden self-center border-l-2 border-primary pl-4 text-base font-semibold uppercase leading-snug tracking-wide lg:block">
            Start with a free home evaluation. You do not have to decide to sell.
          </p>
          {[
            { Icon: Trophy, value: "#28", label: "In New Jersey" },
            { Icon: Layers, value: "$400M+", label: "Total Sales", featured: true },
            { Icon: Home, value: "Built", label: "His Own Home" },
          ].map(({ Icon, value, label, featured }) => (
            <div key={label} className={featured ? "trust-stat trust-stat-featured" : "trust-stat"}>
              <span className="trust-stat-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span>
              <div>
                <div className="trust-stat-value">{value}</div>
                <div className="trust-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full panel px-4 py-2 text-xs sm:text-lg">
          <span aria-hidden="true" className="flex text-rating">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-6 sm:w-6" />)}</span>
          <span><b>5.0</b> on Zillow · 100+ reviews</span>
        </div>
        <div className="mt-6 hidden text-center sm:block"><CTA /></div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative bg-transparent py-12 sm:py-16">
        <Eyebrow>Case Studies</Eyebrow>
        <h2 className="landing-section-title mt-3 mb-6 px-5 text-center text-4xl sm:mb-10 sm:text-[44px]">Real Homeowner Stories</h2>
        <StoriesCarousel />
      </section>

      {/* WRONG HOUSE */}
      <StayOrMoveSection />

      {/* AGENT */}
      <section className="relative bg-transparent px-5 py-12 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="landing-section-title mx-auto max-w-3xl text-center text-[32px] leading-[1.15] sm:text-[48px]">
            Work With an Agent Who Has Made Construction Decisions With <em className="text-primary">His Own Money.</em>
          </h2>
          <div className="mt-8 grid items-center gap-8 sm:mt-14 sm:gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_70%)]" />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-primary/40" />
              <img src={josephAsset} alt="Joseph Aziz handing house keys to new homeowners" loading="lazy" width={315} height={350} className="relative aspect-[9/10] w-full rounded-2xl object-cover" />
            </div>
            <div className="landing-copy space-y-4 text-center text-[17px] leading-[1.75] text-foreground/90 sm:space-y-6 sm:text-lg md:border-l md:border-primary/40 md:pl-12 md:text-left">
              <p>I’m Joseph Aziz. I’ve built <span className="text-primary">my own custom home</span>, helped homeowners sell and move into new construction, and worked directly with builders to negotiate purchase prices, finishes, and extras.</p>
              <p>That experience matters when you’re deciding whether to put more money into the house you own or buy something else.</p>
              <p className="text-muted-foreground">We need to consider more than an attractive floor plan or a listing price. We need to look at what the work would accomplish, what the finished property could be worth, and what else you could buy.</p>
              <p>If moving is the better fit, I can also help you <span className="text-primary">negotiate the next purchase</span> and coordinate it with the sale of your current home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section relative px-5 py-12 sm:py-16">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="landing-section-title mt-3 text-center text-4xl sm:text-[44px]">You Do Not Need to Decide to Sell Before We Talk.</h2>
        <Accordion type="single" collapsible className="mx-auto mt-7 max-w-4xl space-y-3 sm:mt-10">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="panel rounded-lg px-4 text-foreground transition-colors sm:px-6">
              <AccordionTrigger className="landing-copy min-h-11 gap-3 py-3 text-left font-sans text-lg font-semibold hover:no-underline sm:py-5">{q}</AccordionTrigger>
              <AccordionContent className="landing-copy pb-4 text-lg text-muted-foreground sm:pb-5">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FORM */}
      <section id="evaluation" className="relative scroll-mt-4 bg-transparent overflow-hidden">
        {/* Ambient image with smooth multi-directional fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden lg:block">
          <img
            src={formHouse}
            alt="White two-story home with illuminated windows at dusk"
            loading="lazy"
            width={1440}
            height={1440}
            className="h-full w-full object-cover object-center opacity-65"
          />
          {/* Smooth Right Fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--background) 50%, transparent) 35%, var(--background) 85%)",
            }}
          />
          {/* Smooth Top & Bottom Fades to melt into pure black background */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Subtle Left Edge Fade */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/50 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-5 py-12 sm:gap-10 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:pl-[20%]">
          <div className="relative mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <div className="relative flex items-center justify-center gap-3 lg:justify-start">
              <span className="section-rule w-8 sm:w-14" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">Free Home Evaluation</span>
              <span className="section-rule w-8 sm:w-14 lg:hidden" />
            </div>
            <h2 className="landing-section-title relative mt-5 text-[28px] leading-[1.2] text-balance sm:text-[38px] lg:text-[44px]">
              Before You Commit to <em className="text-primary">Construction</em>, Know What Your{" "}
              <em className="text-primary">Other Option</em>{" "}
              Looks Like.
            </h2>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-primary bg-primary px-5 py-12 text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-base md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo compact light />
            <span className="text-xs text-secondary/85">Prestige Property Group Montclair</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-5 w-5 text-accent shrink-0" />
            <span>151 Forest St, Unit H<br />Montclair, NJ 07042</span>
          </div>
          <a href="tel:2017085067" className="flex items-center gap-2 hover:text-white hover:underline transition-colors text-white">
            <Phone className="h-5 w-5 text-accent shrink-0" />
            201-708-5067
          </a>
          <div className="flex gap-2 text-sm text-secondary">
            <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
            <span className="text-secondary/60">|</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        <p className="mt-8 text-center text-sm italic text-secondary/85">
          Property values are estimates, not guarantees of a future sale price. Individual client outcomes vary.
        </p>
      </footer>
      </div>
    </main>
  );
}
