import { Button } from "antd";
import { useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import { MOTION_INTENTS } from "./data";
import type { ZoneProps } from "./types";

export function ZoneMotion({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { motion, state, theme } = useThemeSnapshot();
  const [playVisible, setPlayVisible] = useState(true);
  const [playSlideIn, setPlaySlideIn] = useState(false);
  const [playOverlayOpen, setPlayOverlayOpen] = useState(false);
  const [isPressingDemo, setIsPressingDemo] = useState(false);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const transformsEnabled = motion.effectiveMode === "full";

  const copyCell = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      window.setTimeout(() => {
        setCopiedValue((prev) => (prev === value ? null : prev));
      }, 900);
    } catch {
      // Clipboard may be unavailable in some browser contexts.
    }
  };

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-motion stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Motion</div>
      <section className="theme-lab-section" aria-labelledby="section-motion">
        <h2 id="section-motion" className="theme-lab-section-title ambient-section-title">
          Motion Playground
        </h2>
        <div className="motion-playground-grid">
          <div className="motion-playground-card">
            <div className="motion-playground-title">Enter / Exit</div>
            <Button className="demo-control-motion" size="small" onClick={() => setPlayVisible((prev) => !prev)}>
              Toggle Box
            </Button>
            <div className="motion-preview-stage">
              <div
                className="motion-preview-box"
                style={{
                  opacity: playVisible ? 1 : 0,
                  transform: transformsEnabled ? `translateY(${playVisible ? 0 : motion.contracts.exit.distancePx}px)` : "none",
                  transition: `opacity ${playVisible ? motion.contracts.enter.durationMs : motion.contracts.exit.durationMs}ms ${motion.contracts.enter.easing}, transform ${playVisible ? motion.contracts.enter.durationMs : motion.contracts.exit.durationMs}ms ${motion.contracts.enter.easing}`,
                }}
              >
                Animated box
              </div>
            </div>
          </div>

          <div className="motion-playground-card">
            <div className="motion-playground-title">Press Feedback</div>
            <Button
              className="demo-control-motion motion-press-demo"
              size="small"
              onMouseDown={() => setIsPressingDemo(true)}
              onMouseUp={() => setIsPressingDemo(false)}
              onMouseLeave={() => setIsPressingDemo(false)}
              style={{
                boxShadow: isPressingDemo ? "var(--infini-shadow-pressed)" : "var(--infini-shadow-hover)",
                transform:
                  transformsEnabled && isPressingDemo
                    ? state.themeId === "chibi"
                      ? "translateY(4px)"
                      : state.themeId === "neu-brutalism"
                        ? "translate(2px, 2px)"
                        : "translateY(1px)"
                    : "none",
                transition:
                  "transform var(--infini-motion-press) var(--infini-motion-easing), box-shadow var(--infini-motion-press) var(--infini-motion-easing)",
              }}
            >
              Hold to press
            </Button>
          </div>

          <div className="motion-playground-card">
            <div className="motion-playground-title">Slide In</div>
            <Button className="demo-control-motion" size="small" onClick={() => setPlaySlideIn((prev) => !prev)}>
              Toggle Card
            </Button>
            <div className="motion-preview-stage">
              <div
                className="motion-slide-card"
                style={{
                  opacity: playSlideIn ? 1 : 0.5,
                  transform: transformsEnabled ? `translateX(${playSlideIn ? 0 : motion.contracts.enter.distancePx * 2}px)` : "none",
                  transition: `opacity ${motion.contracts.enter.durationMs}ms ${motion.contracts.enter.easing}, transform ${motion.contracts.enter.durationMs}ms ${motion.contracts.enter.easing}`,
                }}
              >
                Sliding preview card
              </div>
            </div>
          </div>

          <div className="motion-playground-card">
            <div className="motion-playground-title">Overlay Timing</div>
            <Button className="demo-control-motion" size="small" onClick={() => setPlayOverlayOpen((prev) => !prev)}>
              {playOverlayOpen ? "Close Overlay" : "Open Overlay"}
            </Button>
            <div
              className="motion-overlay-preview"
              style={{
                opacity: playOverlayOpen ? 1 : 0,
                transform: transformsEnabled ? `scale(${playOverlayOpen ? 1 : motion.contracts["overlay-open"].scaleFrom})` : "none",
                transition: `opacity ${playOverlayOpen ? motion.contracts["overlay-open"].durationMs : motion.contracts["overlay-close"].durationMs}ms ${motion.contracts["overlay-open"].easing}, transform ${playOverlayOpen ? motion.contracts["overlay-open"].durationMs : motion.contracts["overlay-close"].durationMs}ms ${motion.contracts["overlay-open"].easing}`,
              }}
            >
              Overlay preview
            </div>
          </div>
        </div>

        <h3 className="motion-contracts-title">Motion Contracts</h3>
        <table className="motion-table">
          <thead>
            <tr>
              <th>Intent</th>
              <th>Duration</th>
              <th>Easing</th>
              <th>Distance</th>
              <th>Scale</th>
            </tr>
          </thead>
          <tbody>
            {MOTION_INTENTS.map((intent) => {
              const c = motion.contracts[intent];
              const maxDur = 400;
              const durationLabel = `${c.durationMs}ms`;
              const easingLabel = c.easing.slice(0, 24);
              const distanceLabel = `${c.distancePx}px`;
              const scaleLabel = String(c.scaleFrom);
              return (
                <tr key={intent}>
                  <td style={{ fontWeight: 600 }}>{intent}</td>
                  <td className={`motion-copy-cell ${copiedValue === durationLabel ? "motion-copy-cell-copied" : ""}`} onClick={() => void copyCell(durationLabel)} title={`Copy ${durationLabel}`}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="motion-bar" style={{ width: `${Math.round((c.durationMs / maxDur) * 80)}px` }} />
                      <span>{durationLabel}</span>
                    </div>
                  </td>
                  <td
                    className={`motion-copy-cell ${copiedValue === c.easing ? "motion-copy-cell-copied" : ""}`}
                    style={{ fontSize: 11, opacity: 0.7, fontFamily: theme.typography.mono }}
                    onClick={() => void copyCell(c.easing)}
                    title={`Copy ${c.easing}`}
                  >
                    {easingLabel}
                  </td>
                  <td className={`motion-copy-cell ${copiedValue === distanceLabel ? "motion-copy-cell-copied" : ""}`} onClick={() => void copyCell(distanceLabel)} title={`Copy ${distanceLabel}`}>
                    {distanceLabel}
                  </td>
                  <td className={`motion-copy-cell ${copiedValue === scaleLabel ? "motion-copy-cell-copied" : ""}`} onClick={() => void copyCell(scaleLabel)} title={`Copy ${scaleLabel}`}>
                    {scaleLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="section-caption">
          Mode: {motion.effectiveMode} | Enter: {theme.motion.enterMs}ms | Easing: {theme.motion.easing}
        </div>
      </section>
    </section>
  );
}
