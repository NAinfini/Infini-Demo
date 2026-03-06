import { useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
import { GradientBorder } from "@infini-dev-kit/frontend/components";
import { TextInput } from "@mantine/core";

import type { ZoneProps } from "./types";
import styles from "./ZoneInputs.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneInputs({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();

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
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Inputs & Forms</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-motion-input">
        <h2
          id="section-motion-input"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine TextInput
        </h2>

        <div className={styles["input-grid"]}>
          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Default</div>
            <TextInput placeholder="Type something…" value={motionValue} onChange={(e) => setMotionValue(e.currentTarget.value)} />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Error</div>
            <TextInput
              value={motionErrorValue}
              onChange={(e) => setMotionErrorValue(e.currentTarget.value)}
              error="Invalid format"
              placeholder="Invalid value"
            />
            <div className={styles["inline-error"]} style={{ color: theme.palette.danger }}>
              Invalid format
            </div>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Success</div>
            <TextInput placeholder="Valid input" defaultValue="user@example.com" readOnly />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Disabled</div>
            <TextInput placeholder="Disabled" disabled />
          </div>
        </div>

        <div className={sharedStyles["section-caption"]}>
          Built with Mantine input primitives using theme CSS variables for consistent styling.
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-floating-label">
        <h2
          id="section-floating-label"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Label Variants
        </h2>

        <div className={styles["input-grid"]}>
          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Empty</div>
            <TextInput label="Email address" placeholder="you@example.com" value={floatEmpty} onChange={(e) => setFloatEmpty(e.currentTarget.value)} />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Filled</div>
            <TextInput label="Full name" value={floatFilled} onChange={(e) => setFloatFilled(e.currentTarget.value)} />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Error</div>
            <TextInput
              label="Email address"
              value={floatError}
              onChange={(e) => setFloatError(e.currentTarget.value)}
              error="Please enter a valid email"
            />
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Infini style</div>
            <TextInput label="Username" placeholder="your_handle" value={infiniFloat} onChange={(e) => setInfiniFloat(e.currentTarget.value)} />
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
            <div className={styles["input-state-label"]}>Static gradient</div>
            <GradientBorder animated={false}>
              <input
                className={styles["bare-input"]}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder="Static gradient border"
                value={gradientValue}
                onChange={(e) => setGradientValue(e.target.value)}
              />
            </GradientBorder>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Animated gradient</div>
            <GradientBorder animated duration={4}>
              <input
                className={styles["bare-input"]}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder="Rotating gradient border"
                readOnly
                defaultValue="Focus me!"
              />
            </GradientBorder>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Infini defaults</div>
            <GradientBorder>
              <input
                className={styles["bare-input"]}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder="Infini gradient border"
                value={infiniGradientValue}
                onChange={(e) => setInfiniGradientValue(e.target.value)}
              />
            </GradientBorder>
          </div>

          <div className={styles["input-cell"]}>
            <div className={styles["input-state-label"]}>Custom colors</div>
            <GradientBorder
              colors={[theme.palette.primary, theme.palette.accent, theme.palette.secondary, theme.palette.primary]}
              borderWidth={3}
              duration={2}
            >
              <input
                className={styles["bare-input"]}
                style={{
                  background: "transparent",
                  color: theme.palette.text,
                  fontFamily: theme.typography.en.heading,
                }}
                placeholder="Custom palette colors"
                readOnly
                defaultValue="Theme-aware"
              />
            </GradientBorder>
          </div>
        </div>

        <div className={sharedStyles["section-caption"]}>
          Gradient border cycles through{" "}
          <code style={{ fontFamily: theme.typography.en.mono }}>primary → accent → secondary</code> using a conic-gradient
          mask. Border width: <code style={{ fontFamily: theme.typography.en.mono }}>2px</code> default, customisable.
        </div>
      </section>
    </section>
  );
}

