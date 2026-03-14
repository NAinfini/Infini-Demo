import { useState } from "react";
import {
  DepthButton,
  InfiniConfetti,
  RevealOnScroll,
} from "@infini-dev-kit/frontend/components";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneExtras.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneExtras({ zoneIndex }: ZoneProps) {
  const t = useT("theme-lab");
  const [confettiActive, setConfettiActive] = useState(false);

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-extras stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.extras")}</div>

      {/* Confetti */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-confetti">
        <h2 id="section-confetti" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          InfiniConfetti
        </h2>
        <div className={styles["confetti-wrap"]}>
          <DepthButton onClick={() => { setConfettiActive(true); setTimeout(() => setConfettiActive(false), 3000); }}>
            {t("extras.confetti.btn")}
          </DepthButton>
          <InfiniConfetti active={confettiActive} particleCount={80} duration={3000} />
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("extras.confetti.caption")}
        </div>
      </section>

      {/* RevealOnScroll */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-reveal">
        <h2 id="section-reveal" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          RevealOnScroll
        </h2>
        <div className={styles["reveal-stack"]}>
          {[t("extras.reveal.card1"), t("extras.reveal.card2"), t("extras.reveal.card3")].map(
            (text, i) => (
              <RevealOnScroll key={i} delayMs={i * 150} once>
                <div className={styles["reveal-card"]}>{text}</div>
              </RevealOnScroll>
            ),
          )}
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("extras.reveal.caption")}
        </div>
      </section>
    </section>
  );
}
