import {
  InfiniSplitView,
} from "@infini-dev-kit/frontend/components";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneLayout.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneLayout({ zoneIndex }: ZoneProps) {
  const t = useT("theme-lab");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-layout stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.layout")}</div>

      {/* SplitView */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-split-view">
        <h2 id="section-split-view" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          InfiniSplitView
        </h2>
        <div className={styles["split-view-wrap"]}>
          <InfiniSplitView
            left={<div className={styles["split-pane"]}>{t("layout.split.left")}</div>}
            right={<div className={styles["split-pane"]}>{t("layout.split.right")}</div>}
            initialSplit={40}
          />
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("layout.split.caption")}
        </div>
      </section>
    </section>
  );
}
