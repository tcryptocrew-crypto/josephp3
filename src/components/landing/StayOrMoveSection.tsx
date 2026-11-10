import { useEffect, useRef } from "react";
import { HousePlus } from "lucide-react";
import exterior from "@/assets/stay-move/exterior.webp";
import exteriorSmall from "@/assets/stay-move/exterior-small.webp";
import stay from "@/assets/stay-move/stay-build.webp";
import staySmall from "@/assets/stay-move/stay-build-small.webp";
import move from "@/assets/stay-move/move-up.webp";
import moveSmall from "@/assets/stay-move/move-up-small.webp";
import styles from "./StayOrMoveSection.module.css";

export function StayOrMoveSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.entered);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    section.current
      .querySelectorAll("[data-decision-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={section}
      id="stay-or-move"
      aria-labelledby="stay-or-move-title"
      className={styles.section}
    >
      <div className={styles.exterior}>
        <img
          src={exterior}
          srcSet={`${exteriorSmall} 800w, ${exterior} 2000w`}
          sizes="(min-width: 1440px) 1440px, 100vw"
          alt="Stone-clad home among mature trees, with warm windows glowing at dusk"
          title="Photography: Creative Impressions Media / Pexels"
          loading="lazy"
          decoding="async"
          width={2000}
          height={1335}
        />
      </div>

      <div className={styles.content}>
        <header className={styles.intro}>
          <div className={styles.labelRow} data-decision-reveal>
            <span className={styles.label}>Sell to Buy</span>
          </div>
          <h2 id="stay-or-move-title" className={styles.title} data-decision-reveal>
            A Great Offer on Your House Doesn’t Answer <em>Where You’ll Live <span className="heading-accent">Next.</span></em>
          </h2>
          <p className={styles.supporting} data-decision-reveal>
            You want the extra bedroom, the better layout, or the home you no longer need to renovate.
            But the money for that purchase may be tied up in the house you own.
          </p>
        </header>

        <p className={styles.reflection} data-decision-reveal>
          Plan before you list:
        </p>
        <div className={styles.question} data-decision-reveal>
          <div className={styles.questionIcon} aria-hidden="true">
            <HousePlus strokeWidth={1.2} />
          </div>
          <p>
            Your sale price, next purchase, and closing dates need to work together. <em>Plan them before you list.</em>
          </p>
        </div>

        <div className={styles.paths}>
          <article className={styles.path} aria-labelledby="stay-build-title" data-decision-reveal>
            <div className={styles.pathImage}>
              <img
                src={stay}
                srcSet={`${staySmall} 480w, ${stay} 1000w`}
                sizes="(min-width: 1000px) 480px, (min-width: 600px) 44vw, 45vw"
                alt="Inviting home interior and living space"
                title="Photography: Creative Impressions Media / Pexels"
                loading="lazy"
                decoding="async"
                width={1000}
                height={667}
              />
            </div>
            <div className={styles.pathCopy}>
              <span className={styles.pathLabel}>Selling First?</span>
              <h3 id="stay-build-title">Pressure to Settle</h3>
              <p>
                Sell before you know your options, and you could feel pressured to settle.
              </p>
            </div>
          </article>
          <article className={styles.path} aria-labelledby="move-up-title" data-decision-reveal>
            <div className={styles.pathImage}>
              <img
                src={move}
                srcSet={`${moveSmall} 480w, ${move} 1000w`}
                sizes="(min-width: 1000px) 480px, (min-width: 600px) 44vw, 45vw"
                alt="Detached luxury family home"
                title="Photography: Binyamin Mellish / Pexels"
                loading="lazy"
                decoding="async"
                width={1000}
                height={667}
              />
            </div>
            <div className={styles.pathCopy}>
              <span className={styles.pathLabel}>Buying First?</span>
              <h3 id="move-up-title">Unconfirmed Proceeds</h3>
              <p>
                Commit to buying before checking the numbers, and you could be relying on sale proceeds you haven’t confirmed.
              </p>
            </div>
          </article>
        </div>

        <div className={styles.closing} data-decision-reveal>
          <p>Your sale price, next purchase, and closing dates need to work together. Plan them before you list.</p>
        </div>
      </div>
    </section>
  );
}
