import { Loader } from "@mantine/core";
import { Suspense, lazy } from "react";

import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneCharts.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

const LazyThemeCharts = lazy(() => import("../ThemeCharts").then((module) => ({ default: module.ThemeCharts })));

export function ZoneCharts({ zoneIndex }: ZoneProps) {
  const { motion, state } = useThemeSnapshot();
  const t = useT("theme-lab");

  return (
    <section      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-charts stagger-in`}    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.charts")}</div>
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-charts">
        <h2 id="section-charts" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          ECharts Theme Preview
        </h2>
        <Suspense
          fallback={
            <div className={styles["theme-chart-loading"]}>
              <Loader size="md" />
              <span>{t("charts.loading")}</span>
            </div>
          }
        >
          <LazyThemeCharts themeId={state.themeId} motionMode={motion.effectiveMode} />
        </Suspense>
      </section>
    </section>
  );
}
