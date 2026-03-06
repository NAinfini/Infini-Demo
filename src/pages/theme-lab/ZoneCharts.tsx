import { Loader } from "@mantine/core";
import { Suspense, lazy } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";

import type { ZoneProps } from "./types";
import styles from "./ZoneCharts.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

const LazyThemeCharts = lazy(() => import("../ThemeCharts").then((module) => ({ default: module.ThemeCharts })));

export function ZoneCharts({ zoneIndex }: ZoneProps) {
  const { motion, state } = useThemeSnapshot();

  return (
    <section      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-charts stagger-in`}    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Charts</div>
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-charts">
        <h2 id="section-charts" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          ECharts Theme Preview
        </h2>
        <Suspense
          fallback={
            <div className={styles["theme-chart-loading"]}>
              <Loader size="md" />
              <span>Loading charts...</span>
            </div>
          }
        >
          <LazyThemeCharts themeId={state.themeId} motionMode={motion.effectiveMode} />
        </Suspense>
      </section>
    </section>
  );
}
