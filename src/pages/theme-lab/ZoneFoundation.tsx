import { useCallback, useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";
import { contrastRatio, deriveHoverColor, pickReadableTextColor } from "@infini-dev-kit/utils/color";

import { PALETTE_KEYS, wcagLabel } from "./data";
import type { ZoneProps } from "./types";

export function ZoneFoundation({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
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
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-foundation stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Foundation</div>
      <div className="zone-foundation-grid">
        <section className="theme-lab-section" aria-labelledby="section-palette">
          <h2 id="section-palette" className="theme-lab-section-title ambient-section-title">
            Color Palette
          </h2>
          <div className="palette-grid">
            {PALETTE_KEYS.map((key) => {
              const color = theme.palette[key];
              const textColor = pickReadableTextColor(color);
              const ratio = contrastRatio(theme.foundation.background, color);
              const wcag = wcagLabel(ratio);
              const hover = deriveHoverColor(color);
              return (
                <div key={key} className="swatch" aria-label={`${key}: ${color}`}>
                  <div
                    className={`swatch-color ${copiedColor === color ? "swatch-color-copied" : ""}`}
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
                    {copiedColor === color ? "Copied" : `${ratio.toFixed(1)}:1`}
                  </div>
                  <div className="swatch-meta">
                    <div className="swatch-label">{key}</div>
                    <div className="swatch-hex">{color}</div>
                    <span className={`swatch-wcag ${wcag.pass ? "swatch-wcag-pass" : "swatch-wcag-fail"}`}>
                      {wcag.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="theme-lab-section" aria-labelledby="section-type">
          <h2 id="section-type" className="theme-lab-section-title ambient-section-title">
            Typography
          </h2>
          <div className="type-scale">
            {[
              { label: "Display", font: theme.typography.display, size: 32, weight: 700 },
              { label: "H1", font: theme.typography.display, size: 24, weight: 700 },
              { label: "H2", font: theme.typography.display, size: 20, weight: 600 },
              { label: "Body", font: theme.typography.body, size: 15, weight: 400 },
              { label: "Small", font: theme.typography.body, size: 13, weight: 400 },
              { label: "Mono", font: theme.typography.mono, size: 13, weight: 400 },
            ].map(({ label, font, size, weight }) => (
              <div key={label} className="type-row">
                <span className="type-meta">{label}</span>
                <span style={{ fontFamily: font, fontSize: size, fontWeight: weight, lineHeight: 1.2 }}>
                  The quick brown fox - {font.split(",")[0]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
