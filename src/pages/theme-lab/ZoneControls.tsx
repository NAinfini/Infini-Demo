import { useState } from "react";
import {
  InfiniTagInput,
} from "@infini-dev-kit/frontend/components";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneControls.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneControls({ zoneIndex }: ZoneProps) {
  const t = useT("theme-lab");
  const [tags, setTags] = useState(["React", "TypeScript", "Vite"]);

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-controls stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.controls")}</div>

      {/* TagInput */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-tag-input">
        <h2 id="section-tag-input" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          InfiniTagInput
        </h2>
        <div className={styles["tag-input-wrap"]}>
          <InfiniTagInput
            value={tags}
            onChange={setTags}
            label={t("controls.tag.label")}
            placeholder={t("controls.tag.placeholder")}
            maxTags={8}
          />
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("controls.tag.caption")}
        </div>
      </section>
    </section>
  );
}
