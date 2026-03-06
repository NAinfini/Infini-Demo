import { type CSSProperties } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
import { AnimatedTabs, ScrollProgress } from "@infini-dev-kit/frontend/components";
import type { AnimatedTabItem } from "@infini-dev-kit/frontend/theme/motion-types";

import { ZoneButtons } from "./ZoneButtons";
import { ZoneCharts } from "./ZoneCharts";
import { ZoneFeedback } from "./ZoneFeedback";
import { ZoneFoundation } from "./ZoneFoundation";
import { ZoneHero } from "./ZoneHero";
import { ZoneInputs } from "./ZoneInputs";
import { ZoneInternals } from "./ZoneInternals";
import { ZoneMotion } from "./ZoneMotion";
import { ZoneNavigation } from "./ZoneNavigation";
import { ZoneVisualEffects } from "./ZoneVisualEffects";
import styles from "./ThemeLab.module.css";

const TAB_ITEMS: AnimatedTabItem[] = [
  { key: "foundation", label: "Foundation", content: <ZoneFoundation zoneIndex={1} /> },
  { key: "buttons", label: "Buttons", content: <ZoneButtons zoneIndex={2} /> },
  { key: "inputs", label: "Inputs", content: <ZoneInputs zoneIndex={3} /> },
  { key: "navigation", label: "Navigation", content: <ZoneNavigation zoneIndex={4} /> },
  { key: "feedback", label: "Feedback", content: <ZoneFeedback zoneIndex={5} /> },
  { key: "visuals", label: "Visual Effects", content: <ZoneVisualEffects zoneIndex={6} /> },
  { key: "motion", label: "Motion", content: <ZoneMotion zoneIndex={7} /> },
  { key: "charts", label: "Charts", content: <ZoneCharts zoneIndex={8} /> },
  { key: "internals", label: "Internals", content: <ZoneInternals zoneIndex={9} /> },
];

export function ThemeLab() {
  const { motion, state, theme } = useThemeSnapshot();
  const motionClass =
    motion.effectiveMode === "off"
      ? `${styles["theme-lab"]} theme-lab-motion-off`
      : motion.effectiveMode === "minimum"
        ? `${styles["theme-lab"]} theme-lab-motion-minimum`
      : motion.effectiveMode === "reduced"
        ? `${styles["theme-lab"]} theme-lab-motion-reduced`
        : `${styles["theme-lab"]} theme-lab-motion-full`;

  const motionVars: CSSProperties = {
    "--infini-motion-enter": `${motion.contracts.enter.durationMs}ms`,
    "--infini-motion-exit": `${motion.contracts.exit.durationMs}ms`,
    "--infini-motion-hover": `${motion.contracts.hover.durationMs}ms`,
    "--infini-motion-press": `${motion.contracts.press.durationMs}ms`,
    "--infini-motion-easing": motion.contracts.enter.easing,
    "--infini-motion-distance": `${motion.contracts.enter.distancePx}px`,
    "--infini-shadow-hover": theme.foundation.shadowHover ?? theme.foundation.shadow,
    "--infini-shadow-pressed": theme.foundation.shadowPressed ?? theme.foundation.shadow,
    "--infini-shadow-inset": theme.foundation.shadowInset ?? "none",
  } as CSSProperties;

  return (
    <div
        className={motionClass}
        data-theme-id={state.themeId}
        style={{ fontFamily: theme.typography.en.body, color: theme.palette.text, ...motionVars }}
      >
        <ScrollProgress className="theme-lab-scroll-progress" />
        <ZoneHero zoneIndex={0} />
        <AnimatedTabs
          items={TAB_ITEMS}
          defaultActiveKey="foundation"
          contentTransition="slide"
          className={styles["lab-tabs"]}
        />
      </div>
  );
}

