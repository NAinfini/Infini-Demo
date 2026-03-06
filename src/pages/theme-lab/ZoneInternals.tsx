import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";

import type { ZoneProps } from "./types";
import styles from "./ZoneInternals.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneInternals({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-internals stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Internals</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-token-inspector">
        <h2 id="section-token-inspector" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Token Inspector
        </h2>
        <details className={styles["details-panel"]}>
          <summary className={styles["details-summary"]}>Theme Spec JSON</summary>
          <pre className={styles["theme-token-inspector"]} style={{ fontFamily: theme.typography.en.mono }}>
            {JSON.stringify(theme, null, 2)}
          </pre>
        </details>
      </section>
    </section>
  );
}

