import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";
import {
  AnimatedText,
  DepthButton,
  GlitchText,
  GradientText,
  LampHeading,
  MagneticElement,
  ParticleEffect,
  ShinyText,
} from "@infini-dev-kit/frontend/components";

import type { ZoneProps } from "./types";
import styles from "./ZoneHero.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneHero({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const t = useT("theme-lab");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-hero stagger-in`}
    >
      <div className={styles.heroCard}>
        {/* Background sparkle particles */}
        <ParticleEffect
          preset="sparkle"
          count={18}
          loop
          duration={3.5}
          gravity={0.4}
          origin={{ x: 0.5, y: 0.3 }}
          className={styles.heroParticles}
        />

        {/* Lamp heading — the spotlight cone sits above the theme name */}
        <LampHeading
          coneWidth={420}
          coneHeight={160}
          lampColor={theme.palette.primary}
          animated
          className={styles.heroLamp}
        >
          <h1
            className={styles.heroTitle}
            data-text={theme.name}
          >
            {theme.name}
          </h1>
        </LampHeading>

        {/* GlitchText subtitle */}
        <p className={styles.heroSubtitle}>
          <GlitchText
            intensity="subtle"
            trigger="interval"
            intervalMs={5000}
            chromaticOffset={1.4}
            className={styles.heroGlitch}
          >
            {t("hero.subtitle")}
          </GlitchText>
        </p>

        {/* GradientText description */}
        <p className={styles.heroDesc}>
          <GradientText
            angle={100}
            animated
            duration={4}
            className={styles.heroGradient}
          >
            {theme.description}
          </GradientText>
        </p>

        {/* AnimatedText tagline */}
        <p className={styles.heroTagline}>
          <AnimatedText
            preset="typewriter"
            autoStart
            loop={false}
            className={styles.heroTaglineText}
          >
            {t("hero.tagline")}
          </AnimatedText>
        </p>

        {/* CTA buttons — decorative showcase, not actionable */}
        <div className={styles.heroActions} aria-label={t("hero.btnShowcase")}>
          <MagneticElement strength={10} damping={22} stiffness={140}>
            <DepthButton tabIndex={-1} aria-hidden="true">{t("hero.explore")}</DepthButton>
          </MagneticElement>
          <MagneticElement strength={8} damping={22} stiffness={140}>
            <DepthButton type="secondary" tabIndex={-1} aria-hidden="true">{t("hero.viewSource")}</DepthButton>
          </MagneticElement>
        </div>

        {/* Signature badges */}
        {theme.signatures.length > 0 && (
          <div className={styles.heroSigs}>
            {theme.signatures.map((sig, i) => (
              <span
                key={sig}
                className={styles.heroSigBadge}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <ShinyText
                  duration={3 + i * 0.5}
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  {sig}
                </ShinyText>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
