import {
  InfiniStatCard,
} from "@infini-dev-kit/frontend/components";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneDataDisplay.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneDataDisplay({ zoneIndex }: ZoneProps) {
  const t = useT("theme-lab");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-data-display stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.dataDisplay")}</div>

      {/* StatCard */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-stat-card">
        <h2 id="section-stat-card" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          InfiniStatCard
        </h2>
        <div className={styles["stat-row"]}>
          <InfiniStatCard title={t("data.stat.members")} value={1284} previousValue={1190} trend="up" />
          <InfiniStatCard title={t("data.stat.events")} value={42} previousValue={45} trend="down" />
          <InfiniStatCard title={t("data.stat.uptime")} value={99} trend="neutral" />
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("data.stat.caption")}
        </div>
      </section>
    </section>
  );
}
