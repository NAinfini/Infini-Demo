import { type CSSProperties } from "react";

import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";
import { AnimatedTabs, ScrollProgress } from "@infini-dev-kit/frontend/components";
import type { AnimatedTabItem } from "@infini-dev-kit/frontend/theme/motion-types";

import { ZoneButtons } from "./ZoneButtons";
import { ZoneCharts } from "./ZoneCharts";
import { ZoneControls } from "./ZoneControls";
import { ZoneDataDisplay } from "./ZoneDataDisplay";
import { ZoneExtras } from "./ZoneExtras";
import { ZoneFeedback } from "./ZoneFeedback";
import { ZoneFoundation } from "./ZoneFoundation";
import { ZoneHero } from "./ZoneHero";
import { ZoneInputs } from "./ZoneInputs";
import { ZoneInternals } from "./ZoneInternals";
import { ZoneLayout } from "./ZoneLayout";
import { ZoneMotion } from "./ZoneMotion";
import { ZoneNavigation } from "./ZoneNavigation";
import { ZoneVisualEffects } from "./ZoneVisualEffects";
import styles from "./ThemeLab.module.css";

export function ThemeLab() {
  const { motion, state, theme } = useThemeSnapshot();
  const t = useT("theme-lab");

  const TAB_ITEMS: AnimatedTabItem[] = [
    { key: "foundation", label: t("tab.foundation"), content: <ZoneFoundation zoneIndex={1} /> },
    {
      key: "forms",
      label: t("tab.forms"),
      content: (
        <>
          <ZoneButtons zoneIndex={2} />
          <ZoneInputs zoneIndex={3} />
          <ZoneControls zoneIndex={4} />
        </>
      ),
    },
    {
      key: "navigation",
      label: t("tab.navigation"),
      content: (
        <>
          <ZoneNavigation zoneIndex={5} />
          <ZoneLayout zoneIndex={8} />
        </>
      ),
    },
    { key: "feedback", label: t("tab.feedback"), content: <ZoneFeedback zoneIndex={6} /> },
    {
      key: "data",
      label: t("tab.data"),
      content: (
        <>
          <ZoneDataDisplay zoneIndex={7} />
          <ZoneCharts zoneIndex={11} />
        </>
      ),
    },
    {
      key: "effects",
      label: t("tab.effects"),
      content: (
        <>
          <ZoneVisualEffects zoneIndex={9} />
          <ZoneMotion zoneIndex={10} />
          <ZoneExtras zoneIndex={12} />
        </>
      ),
    },
    { key: "internals", label: t("tab.internals"), content: <ZoneInternals zoneIndex={13} /> },
  ];
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

