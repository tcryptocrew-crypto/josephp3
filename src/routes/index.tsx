import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Play, Trophy, Layers, Home, Star, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import { StoriesCarousel } from "@/components/landing/StoriesCarousel";
import { StayOrMoveSection } from "@/components/landing/StayOrMoveSection";
import vsl from "@/assets/vsl-stock.jpg";
import logoAsset from "@/assets/joseph-aziz-logo-light.png";
import josephAsset from "@/assets/joseph-aziz-keys.png";
import formHouse from "@/assets/form-house-stock.jpg";

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

function CTA({ small }: { small?: boolean }) {
  return (
    <a href="#evaluation" className={`btn-gold ${small ? "!py-3 !px-6 !text-base" : ""}`}>
      Request My Free Home Evaluation <ChevronRight className="h-5 w-5" />
    </a>
  );
}

function Logo({ compact }: { compact?: boolean }) {
  return (
    <img
      src={logoAsset}
      alt="Joseph Aziz Real Estate"
      className={`${compact ? "h-10" : "mx-auto h-6 sm:h-7"} w-auto`}
    />
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="gold-divider w-16 sm:w-28" />
      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{children}</span>
      <span className="gold-divider w-16 sm:w-28" />
    </div>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden text-foreground">
      {/* Still/Fixed Background Grid that does not move with scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-grid"
      />
      <div className="relative z-10">
      {/* HERO */}
      <section className="relative bg-transparent">
        <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-6 text-center fade-up">
          <Logo />
          <div className="mt-4 inline-block rounded-xl border border-primary/70 bg-background/50 px-5 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm sm:text-sm">
            <span className="text-primary">For Bergen County homeowners</span> considering an addition, renovation, or rebuild
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.2] sm:text-5xl lg:text-[64px] lg:leading-[1.18]">
            Before You Spend{" "}
            <span className="relative inline-block whitespace-nowrap px-[0.22em] align-baseline text-[1.05em] leading-none">
              <span
                aria-hidden
                className="absolute inset-x-0 top-[0.08em] bottom-[0.06em] rounded-[0.14em]"
                style={{ background: "var(--gradient-gold)" }}
              />
              <span className="relative text-primary-foreground">$250,000</span>
            </span>{" "}
            on an Addition, Find Out What It Would Take to{" "}
            <span className="relative inline-block whitespace-nowrap px-[0.22em] align-baseline text-[1.05em] leading-none">
              <span
                aria-hidden
                className="absolute inset-x-0 top-[0.08em] bottom-[0.06em] rounded-[0.14em]"
                style={{ background: "var(--gradient-gold)" }}
              />
              <span className="relative text-primary-foreground">Move</span>
            </span>{" "}
            Into{" "}
            <em className="gold-text">the Home You Actually Want.</em>
          </h1>
          <button aria-label="Watch the video" className="group gold-frame relative mx-auto mt-8 block aspect-video w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl">
            <img src={vsl} alt="Modern luxury architectural interior at dusk" loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-background/40" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background/70 text-primary shadow-[var(--glow-gold)] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <Play className="ml-1 h-9 w-9 fill-current" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">Watch the video</span>
            </span>
          </button>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/90 sm:text-xl">
            Joseph Aziz’s Stay-or-Move Evaluation compares what your home could sell for today, what it could be worth after the work, and what you could buy instead, including the costs of selling and moving.
          </p>
          <div className="mt-8 [&>a]:!px-5 [&>a]:!py-3 [&>a]:!text-sm sm:[&>a]:!px-8 sm:[&>a]:!py-4 sm:[&>a]:!text-lg [&>a>svg]:h-4 [&>a>svg]:w-4"><CTA /></div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative bg-transparent px-5 pb-14">
        <p className="mx-auto mb-6 max-w-md text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
          Free evaluation · No obligation to sell
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-8 lg:border-y lg:border-border/60 lg:py-8 lg:divide-x lg:divide-border/60">
          <p className="hidden border-l-2 border-primary pl-4 text-base font-semibold uppercase leading-snug tracking-wide lg:block">
            Start with a free home evaluation. You do not have to decide to sell.
          </p>
          {[
            [Trophy, "#28", "in New Jersey"],
            [Layers, "$400M+", "Total Sales"],
            [Home, "Built", "His Own Home"],
          ].map(([Icon, a, b]) => {
            const I = Icon as typeof Trophy;
            return (
              <div key={a as string} className="gold-frame flex flex-col items-center gap-1.5 rounded-xl panel px-2 py-4 text-center lg:flex-row lg:justify-center lg:gap-4 lg:rounded-none lg:bg-transparent lg:p-0 lg:text-left lg:[border:none] lg:shadow-none">
                <I className="h-6 w-6 text-primary lg:h-10 lg:w-10" strokeWidth={1.4} />
                <div>
                  <div className="font-serif text-xl font-semibold leading-none text-primary lg:font-sans lg:text-xl lg:text-foreground">{a as string}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground lg:text-base lg:normal-case lg:tracking-normal lg:text-foreground">{b as string}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-primary/40 panel px-4 py-2 text-xs sm:text-lg">
          <span className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-6 sm:w-6" />)}</span>
          <span><b>5.0</b> on Zillow · 100+ reviews</span>
        </div>
        <div className="mt-6 hidden text-center sm:block"><CTA small /></div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative bg-transparent py-16">
        <Eyebrow>Case Studies</Eyebrow>
        <h2 className="mt-3 mb-10 text-center text-4xl sm:text-[44px]">Real Homeowner Stories</h2>
        <StoriesCarousel />
      </section>

      {/* WRONG HOUSE */}
      <StayOrMoveSection />

      {/* AGENT */}
      <section className="relative bg-transparent px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center text-[32px] leading-[1.15] sm:text-[48px]">
            Work With an Agent Who Has Made Construction Decisions With <em className="gold-text">His Own Money.</em>
          </h2>
          <div className="mt-14 grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_70%)]" />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-primary/40" />
              <img src={josephAsset} alt="Joseph Aziz handing house keys to new homeowners" loading="lazy" width={315} height={350} className="relative aspect-[9/10] w-full rounded-2xl object-cover" />
            </div>
            <div className="space-y-6 text-center text-[17px] leading-[1.75] text-foreground/90 sm:text-lg md:border-l md:border-primary/40 md:pl-12 md:text-left">
              <p>I’m Joseph Aziz. I’ve built <span className="text-primary">my own custom home</span>, helped homeowners sell and move into new construction, and worked directly with builders to negotiate purchase prices, finishes, and extras.</p>
              <p>That experience matters when you’re deciding whether to put more money into the house you own or buy something else.</p>
              <p className="text-muted-foreground">We need to consider more than an attractive floor plan or a listing price. We need to look at what the work would accomplish, what the finished property could be worth, and what else you could buy.</p>
              <p>If moving is the better fit, I can also help you <span className="text-primary">negotiate the next purchase</span> and coordinate it with the sale of your current home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-transparent px-5 py-16">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="mt-3 text-center text-4xl sm:text-[44px]">You Do Not Need to Decide to Sell Before We Talk.</h2>
        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-4xl space-y-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="panel rounded-lg px-6 transition hover:border-primary/70">
              <AccordionTrigger className="py-5 text-left font-sans text-lg font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-lg text-muted-foreground">{a}</AccordionContent>
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
            alt="Luxury modern custom home at dusk"
            loading="lazy"
            width={1200}
            height={1800}
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

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:pl-[20%]">
          <div className="relative mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <div className="relative flex items-center justify-center gap-3 lg:justify-start">
              <span className="gold-divider w-8 sm:w-14" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">Free Home Evaluation</span>
              <span className="gold-divider w-8 sm:w-14 lg:hidden" />
            </div>
            <h2 className="relative mt-5 text-[28px] leading-[1.2] text-balance sm:text-[38px] lg:text-[44px]">
              Before You Commit to <em className="gold-text">Construction</em>, Know What Your{" "}
              <span className="relative inline-block">
                <em className="gold-text">Other Option</em>
                <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-1 left-0 h-3 w-full text-primary/80">
                  <path d="M3 9C38 3 74 12 112 6S186 3 217 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Looks Like.
            </h2>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-primary/25 bg-[#080808] px-5 py-12 text-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-base md:flex-row">
          <Logo compact />
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-5 w-5 text-primary shrink-0" />
            <span>151 Forest St, Unit H<br />Montclair, NJ 07042</span>
          </div>
          <a href="tel:2017085067" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            201-708-5067
          </a>
          <div className="flex gap-2">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-border">|</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        <p className="mt-8 text-center text-sm italic text-muted-foreground/80">
          Property values are estimates, not guarantees of a future sale price. Individual client outcomes vary.
        </p>
      </footer>
      </div>
    </main>
  );
}
