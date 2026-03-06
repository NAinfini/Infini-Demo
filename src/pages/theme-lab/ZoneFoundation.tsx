import { useCallback, useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
import { contrastRatio, deriveHoverColor, pickReadableTextColor } from "@infini-dev-kit/utils/color";
import { AnimatedCounter, GlowBorder, Terminal } from "@infini-dev-kit/frontend/components";

import { PALETTE_KEYS, wcagLabel } from "./data";

const TERMINAL_COMMANDS = [
  { command: "infini --version", output: ["Infini Dev Kit v0.2.0"] },
  { command: "infini theme list", output: ["default  chibi  cyberpunk  neu-brutalism  black-gold  red-gold"] },
  { command: "infini theme set cyberpunk", output: ["Theme switched to cyberpunk."] },
];
import type { ZoneProps } from "./types";
import styles from "./ZoneFoundation.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

export function ZoneFoundation({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedColor(value);
      window.setTimeout(() => {
        setCopiedColor((prev) => (prev === value ? null : prev));
      }, 900);
    } catch {
      // Clipboard may be unavailable in some browser contexts.
    }
  }, []);

  return (
    <section      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-foundation stagger-in`}    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Foundation</div>
      <div className={styles["zone-foundation-grid"]}>
        <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-palette">
          <h2 id="section-palette" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
            Color Palette
          </h2>
          <div className={styles["palette-grid"]}>
            {PALETTE_KEYS.map((key) => {
              const color = theme.palette[key];
              const textColor = pickReadableTextColor(color);
              const ratio = contrastRatio(theme.foundation.background, color);
              const wcag = wcagLabel(ratio);
              const hover = deriveHoverColor(color);
              return (
                <div key={key} className={styles["swatch"]} aria-label={`${key}: ${color}`}>
                  <div
                    className={`${styles["swatch-color"]} ${
                      copiedColor === color ? styles["swatch-color-copied"] : ""
                    }`}
                    style={{ background: color, color: textColor }}
                    title={`Click to copy ${color} | Hover: ${hover}`}
                    onClick={() => void handleCopy(color)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        void handleCopy(color);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles["swatch-topline"]}>
                      <span className={styles["swatch-label"]}>{key}</span>
                      <span className={styles["swatch-ratio"]}>
                        {copiedColor === color ? "Copied" : `${ratio.toFixed(1)}:1`}
                      </span>
                    </div>
                    <div className={styles["swatch-hex"]}>{color}</div>
                    <span className={styles["swatch-wcag"]}>
                      {wcag.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-type">
          <h2 id="section-type" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
            Typography
          </h2>
          <div className={styles["type-scale"]}>
            {[
              { label: "Display", font: theme.typography.en.heading, size: 32, weight: 700 },
              { label: "H1", font: theme.typography.en.heading, size: 24, weight: 700 },
              { label: "H2", font: theme.typography.en.heading, size: 20, weight: 600 },
              { label: "Body", font: theme.typography.en.body, size: 15, weight: 400 },
              { label: "Small", font: theme.typography.en.body, size: 13, weight: 400 },
              { label: "Mono", font: theme.typography.en.mono, size: 13, weight: 400 },
            ].map(({ label, font, size, weight }) => (
              <div key={label} className={styles["type-row"]}>
                <span className={styles["type-meta"]}>{label}</span>
                <span style={{ fontFamily: font, fontSize: size, fontWeight: weight, lineHeight: 1.2 }}>
                  The quick brown fox - {font.split(",")[0]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Dev Kit component showcase */}
      <div className={styles["foundation-extras"]}>
        <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-counter">
          <h2 id="section-counter" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
            Animated Counter
          </h2>
          <div className={styles["counter-row"]}>
            <GlowBorder>
              <div className={styles["counter-card"]}>
                <span className={styles["counter-label"]}>Components</span>
                <AnimatedCounter target={64} className={styles["counter-value"]} />
              </div>
            </GlowBorder>
            <GlowBorder>
              <div className={styles["counter-card"]}>
                <span className={styles["counter-label"]}>Themes</span>
                <AnimatedCounter target={6} className={styles["counter-value"]} />
              </div>
            </GlowBorder>
            <GlowBorder>
              <div className={styles["counter-card"]}>
                <span className={styles["counter-label"]}>Wrappers</span>
                <AnimatedCounter target={19} className={styles["counter-value"]} />
              </div>
            </GlowBorder>
          </div>
        </section>

        <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-terminal">
          <h2 id="section-terminal" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
            Terminal
          </h2>
          <div className={styles["terminal-wrapper"]}>
            <Terminal
              commands={TERMINAL_COMMANDS}
              speed={25}
              title="infini-cli"
              loop
            />
          </div>
        </section>
      </div>
    </section>
  );
}

