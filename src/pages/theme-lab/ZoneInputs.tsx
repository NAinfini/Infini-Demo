import { useState } from "react";

import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";
import { GradientBorder } from "@infini-dev-kit/frontend/components";
import { TextInput } from "@mantine/core";

import type { ZoneProps } from "./types";
import styles from "./ZoneInputs.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneInputs({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const t = useT("theme-lab");

  const [motionValue, setMotionValue] = useState("");
  const [motionErrorValue, setMotionErrorValue] = useState("bad@");

  const [floatEmpty, setFloatEmpty] = useState("");
  const [floatFilled, setFloatFilled] = useState("Ada Lovelace");
  const [floatError, setFloatError] = useState("not-an-email");
  const [infiniFloat, setInfiniFloat] = useState("");

  const [gradientValue, setGradientValue] = useState("");
  const [infiniGradientValue, setInfiniGradientValue] = useState("Filled");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-inputs stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.inputs")}</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-motion-input">
        <h2
          id="section-motion-input"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine TextInput
        </h2>

        <div className={styles["input-grid"]}>
          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.state.default")}</div>
            <TextInput placeholder={t("inputs.placeholder.type")} value={motionValue} onChange={(e) => setMotionValue(e.currentTarget.value)} />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.state.error")}</div>
            <TextInput
              value={motionErrorValue}
              onChange={(e) => setMotionErrorValue(e.currentTarget.value)}
              error={t("inputs.error.invalidFormat")}
              placeholder={t("inputs.placeholder.invalid")}
            />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.state.success")}</div>
            <TextInput placeholder={t("inputs.placeholder.valid")} defaultValue="user@example.com" readOnly />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.state.disabled")}</div>
            <TextInput placeholder={t("inputs.placeholder.disabled")} disabled />
          </div>
        </div>

        <div className={sharedStyles["section-caption"]}>
          {t("inputs.mantine.caption")}
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-floating-label">
        <h2
          id="section-floating-label"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          {t("inputs.float.title")}
        </h2>

        <div className={styles["input-grid"]}>
          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.float.empty")}</div>
            <TextInput label={t("inputs.label.email")} placeholder={t("inputs.placeholder.email")} value={floatEmpty} onChange={(e) => setFloatEmpty(e.currentTarget.value)} />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.float.filled")}</div>
            <TextInput label={t("inputs.label.fullName")} value={floatFilled} onChange={(e) => setFloatFilled(e.currentTarget.value)} />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.float.error")}</div>
            <TextInput
              label={t("inputs.label.email")}
              value={floatError}
              onChange={(e) => setFloatError(e.currentTarget.value)}
              error={t("inputs.error.validEmail")}
            />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.float.infini")}</div>
            <TextInput label={t("inputs.label.username")} placeholder={t("inputs.placeholder.handle")} value={infiniFloat} onChange={(e) => setInfiniFloat(e.currentTarget.value)} />
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-gradient-border">
        <h2
          id="section-gradient-border"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          GradientBorder
        </h2>

        <div className={styles["input-grid"]}>
          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.gradient.static")}</div>
            <GradientBorder animated={false}>
              <input
                className={styles["bare-input"]}
                aria-label={t("inputs.gradient.staticAria")}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder={t("inputs.gradient.staticPlaceholder")}
                value={gradientValue}
                onChange={(e) => setGradientValue(e.target.value)}
              />
            </GradientBorder>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.gradient.animated")}</div>
            <GradientBorder animated duration={4}>
              <input
                className={styles["bare-input"]}
                aria-label={t("inputs.gradient.animatedAria")}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder={t("inputs.gradient.animatedPlaceholder")}
                readOnly
                defaultValue="Read-only demo"
              />
            </GradientBorder>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.gradient.infini")}</div>
            <GradientBorder>
              <input
                className={styles["bare-input"]}
                aria-label={t("inputs.gradient.infiniAria")}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder={t("inputs.gradient.infiniPlaceholder")}
                value={infiniGradientValue}
                onChange={(e) => setInfiniGradientValue(e.target.value)}
              />
            </GradientBorder>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>{t("inputs.gradient.custom")}</div>
            <GradientBorder
              colors={[theme.palette.primary, theme.palette.accent, theme.palette.secondary, theme.palette.primary]}
              borderWidth={3}
              duration={2}
            >
              <input
                className={styles["bare-input"]}
                aria-label={t("inputs.gradient.customAria")}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder={t("inputs.gradient.customPlaceholder")}
                readOnly
                defaultValue="Theme-aware"
              />
            </GradientBorder>
          </div>
        </div>

        <div className={sharedStyles["section-caption"]}>
          {t("inputs.gradient.caption")}{" "}
          <code style={{ fontFamily: theme.typography.en.mono }}>{t("inputs.gradient.captionColors")}</code> using a conic-gradient
          mask. Border width: <code style={{ fontFamily: theme.typography.en.mono }}>{t("inputs.gradient.captionWidth")}</code> default, customisable.
        </div>
      </section>
    </section>
  );
}

