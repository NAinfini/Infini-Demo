import { Spin } from "antd";
import { Suspense, lazy } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import type { ZoneProps } from "./types";

const LazyThemeCharts = lazy(() => import("../ThemeCharts").then((module) => ({ default: module.ThemeCharts })));

export function ZoneCharts({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { motion, state } = useThemeSnapshot();

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-charts stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Charts</div>
      <section className="theme-lab-section" aria-labelledby="section-charts">
        <h2 id="section-charts" className="theme-lab-section-title ambient-section-title">
          ECharts Theme Preview
        </h2>
        <Suspense
          fallback={
            <div className="theme-chart-loading">
              <Spin />
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
