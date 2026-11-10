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
            <span className={styles.label}>Stay or Move</span>
          </div>
          <h2 id="stay-or-move-title" className={styles.title} data-decision-reveal>
            A Bigger Version of Your House May Still Be <em>the Wrong House.</em>
          </h2>
          <p className={styles.supporting} data-decision-reveal>
            Another bedroom could solve the space problem. But what about the layout, the location,
            or the things you would still want to change?
          </p>
        </header>

        <p className={styles.reflection} data-decision-reveal>
          Before committing to construction, ask yourself:
        </p>
        <div className={styles.question} data-decision-reveal>
          <div className={styles.questionIcon} aria-hidden="true">
            <HousePlus strokeWidth={1.2} />
          </div>
          <p>
            When the work is finished, <em>will this be the home I want to stay in?</em>
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
              <span className={styles.pathLabel}>Staying?</span>
              <h3 id="stay-build-title">Build an Addition</h3>
              <p>
                If you love your location and an addition gives you what you need, staying deserves
                a serious look.
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
              <span className={styles.pathLabel}>Moving?</span>
              <h3 id="move-up-title">Buy Another Home</h3>
              <p>
                But before you commit, you should also know what your current home could help you buy.
              </p>
            </div>
          </article>
        </div>

        <div className={styles.closing} data-decision-reveal>
          <p>Compare both paths before you start paying for one.</p>
        </div>
      </div>
    </section>
  );
}
