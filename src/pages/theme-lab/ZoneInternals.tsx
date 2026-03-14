import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneInternals.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneInternals({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const t = useT("theme-lab");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-internals stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.internals")}</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-token-inspector">
        <h2 id="section-token-inspector" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Token Inspector
        </h2>
        <details className={styles["details-panel"]}>
          <summary className={styles["details-summary"]}>{t("internals.themeSpecJson")}</summary>
          <pre className={styles["theme-token-inspector"]} style={{ fontFamily: theme.typography.en.mono }}>
            {JSON.stringify(theme, null, 2)}
          </pre>
        </details>
      </section>
    </section>
  );
}

