import { motion } from "motion/react";
import { useState } from "react";

import {
  CustomCursor,
  DepthToggle,
  LayoutIndicator,
  MorphingBlob,
  PageTransition,
  Parallax,
  RippleBackground,
  ScrollAnimationTrigger,
  StaggerList,
} from "@infini-dev-kit/frontend/components";
import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";

import { MOTION_INTENTS } from "./data";
import type { ZoneProps } from "./types";
import styles from "./ZoneMotion.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

const STAGGER_ITEMS = [
  { label: "Alpha Node", sub: "Primary signal" },
  { label: "Beta Node", sub: "Secondary signal" },
  { label: "Gamma Node", sub: "Tertiary signal" },
  { label: "Delta Node", sub: "Quaternary signal" },
  { label: "Epsilon Node", sub: "Quinary signal" },
];

const TRANSITION_TYPES = ["fade", "slide", "scale"] as const;
type TransitionType = (typeof TRANSITION_TYPES)[number];

// Motion variants for StaggerList children
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function ZoneMotion({ zoneIndex }: ZoneProps) {
  const { motion: motionSnap, theme } = useThemeSnapshot();
  const [selectedTransition, setSelectedTransition] = useState<TransitionType>("fade");
  const [transitionKey, setTransitionKey] = useState(0);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [depthToggleA, setDepthToggleA] = useState(false);
  const [depthToggleB, setDepthToggleB] = useState(true);
  const [depthToggleC, setDepthToggleC] = useState(false);

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

  const handleTransitionSelect = (type: TransitionType) => {
    setSelectedTransition(type);
    setTransitionKey((k) => k + 1);
  };

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-motion stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Motion & Animation</div>

      {/* ── 1. StaggerList ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-stagger">
        <h2 id="section-stagger" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          StaggerList
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Children enter with a staggered delay driven by scroll visibility.
        </div>
        <StaggerList className={styles["stagger-list"]} staggerMs={80}>
          {STAGGER_ITEMS.map((item) => (
            <motion.div key={item.label} variants={itemVariants} className={styles["stagger-item"]}>
              <span className={styles["stagger-item-label"]}>{item.label}</span>
              <span className={styles["stagger-item-sub"]}>{item.sub}</span>
            </motion.div>
          ))}
        </StaggerList>
      </section>

      {/* ── 2. ScrollAnimationTrigger ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-scroll-trigger">
        <h2 id="section-scroll-trigger" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          ScrollAnimationTrigger
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          CSS properties are continuously interpolated as this block scrolls through the viewport.
        </div>
        <ScrollAnimationTrigger
          keyframes={{ opacity: [0.3, 1], scale: [0.94, 1], y: [20, 0] }}
          className={styles["scroll-trigger-block"]}
        >
          <div className={styles["scroll-trigger-content"]}>
            <span className={styles["scroll-trigger-label"]}>Scroll-driven content</span>
            <span className={styles["scroll-trigger-sub"]}>
              Opacity, scale, and Y position are bound to scroll progress.
            </span>
          </div>
        </ScrollAnimationTrigger>
      </section>

      {/* ── 3. Parallax ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-parallax">
        <h2 id="section-parallax" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Parallax
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Layers shift at different scroll rates to create depth.
        </div>
        <div className={styles["parallax-scene"]}>
          <Parallax yRange={[-24, 24]} className={styles["parallax-bg-layer"]}>
            <div className={styles["parallax-bg-shape"]} aria-hidden />
          </Parallax>
          <Parallax yRange={[-10, 10]} className={styles["parallax-mid-layer"]}>
            <div className={styles["parallax-mid-card"]}>
              <span className={styles["parallax-mid-label"]}>Mid layer</span>
            </div>
          </Parallax>
          <div className={styles["parallax-fg-layer"]}>
            <span className={styles["parallax-fg-label"]}>Foreground content</span>
          </div>
        </div>
      </section>

      {/* ── 4. MorphingBlob ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-morphing-blob">
        <h2 id="section-morphing-blob" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          MorphingBlob
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Soft gradient blobs continuously morph shape and float as background decoration.
        </div>
        <MorphingBlob count={3} opacity={0.4} className={styles["blob-container"]}>
          <div className={styles["blob-content"]}>
            <span className={styles["blob-label"]}>3 morphing blobs</span>
            <span className={styles["blob-sub"]}>primary · accent · secondary</span>
          </div>
        </MorphingBlob>
      </section>

      {/* ── 5. RippleBackground ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ripple">
        <h2 id="section-ripple" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          RippleBackground
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Concentric rings expand outward like a radar pulse.
        </div>
        <RippleBackground rings={4} duration={3.5} className={styles["ripple-container"]}>
          <div className={styles["ripple-content"]}>
            <span className={styles["ripple-label"]}>Signal origin</span>
          </div>
        </RippleBackground>
      </section>

      {/* ── 6. CustomCursor ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-cursor">
        <h2 id="section-cursor" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          CustomCursor
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Move the cursor inside the demo area. The default cursor is replaced with a spring-physics follower and trail.
        </div>
        <CustomCursor shape="circle" size={28} trail trailLength={6} className={styles["cursor-demo"]}>
          <div className={styles["cursor-demo-inner"]}>
            <span className={styles["cursor-demo-label"]}>Hover here</span>
            <span className={styles["cursor-demo-sub"]}>Custom cursor with trail active</span>
          </div>
        </CustomCursor>
      </section>

      {/* ── 7. DepthToggle ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-depth-toggle">
        <h2 id="section-depth-toggle" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          DepthToggle
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Toggle variant of DepthButton — presses down with spring physics when active, lifts back up when inactive.
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <DepthToggle pressed={depthToggleA} onToggle={setDepthToggleA}>
            Primary
          </DepthToggle>
          <DepthToggle pressed={depthToggleB} onToggle={setDepthToggleB} type="secondary">
            Secondary
          </DepthToggle>
          <DepthToggle pressed={depthToggleC} onToggle={setDepthToggleC} type="danger">
            Danger
          </DepthToggle>
          <DepthToggle pressed={false} onToggle={() => {}} disabled>
            Disabled
          </DepthToggle>
        </div>
        <div className={sharedStyles["section-caption"]}>
          States: {depthToggleA ? "ON" : "OFF"} / {depthToggleB ? "ON" : "OFF"} / {depthToggleC ? "ON" : "OFF"}
        </div>
      </section>

      {/* ── 8. LayoutIndicator ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-layout-indicator">
        <h2
          id="section-layout-indicator"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          LayoutIndicator
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          A shared-layout animated underline tracks the selected tab using Framer Motion's layoutId.
        </div>
        <LayoutIndicatorDemoTabs />
      </section>

      {/* ── 9. PageTransition ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-page-transition">
        <h2
          id="section-page-transition"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          PageTransition
        </h2>
        <div className={sharedStyles["section-caption"]} style={{ marginTop: 0, marginBottom: 12 }}>
          Select a transition type and replay to see the page-level enter animation.
        </div>
        <div className={styles["transition-type-row"]}>
          {TRANSITION_TYPES.map((type) => (
            <button
              key={type}
              className={`${styles["transition-type-btn"]} ${selectedTransition === type ? styles["transition-type-btn-active"] : ""}`}
              onClick={() => handleTransitionSelect(type)}
            >
              {type}
            </button>
          ))}
          <button
            className={styles["transition-replay-btn"]}
            onClick={() => setTransitionKey((k) => k + 1)}
          >
            Replay
          </button>
        </div>
        <div className={styles["transition-preview-stage"]}>
          <PageTransition key={transitionKey} type={selectedTransition} className={styles["transition-preview-inner"]}>
            <span className={styles["transition-preview-label"]}>{selectedTransition}</span>
            <span className={styles["transition-preview-sub"]}>
              {selectedTransition === "fade" && "Opacity 0 → 1"}
              {selectedTransition === "slide" && "Opacity + Y offset 30px"}
              {selectedTransition === "scale" && "Opacity + scale 0.92 → 1"}
            </span>
          </PageTransition>
        </div>
      </section>

      {/* ── 10. Motion Contracts Table (preserved) ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-motion-contracts">
        <h2
          id="section-motion-contracts"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Motion Contracts
        </h2>
        <table className={styles["motion-table"]}>
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
              const c = motionSnap.contracts[intent];
              const maxDur = 400;
              const durationLabel = `${c.durationMs}ms`;
              const easingLabel = c.easing.slice(0, 24);
              const distanceLabel = `${c.distancePx}px`;
              const scaleLabel = String(c.scaleFrom);
              return (
                <tr key={intent}>
                  <td style={{ fontWeight: 600 }}>{intent}</td>
                  <td
                    className={`motion-copy-cell ${copiedValue === durationLabel ? "motion-copy-cell-copied" : ""}`}
                    onClick={() => void copyCell(durationLabel)}
                    title={`Copy ${durationLabel}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className={styles["motion-bar"]} style={{ width: `${Math.round((c.durationMs / maxDur) * 80)}px` }} />
                      <span>{durationLabel}</span>
                    </div>
                  </td>
                  <td
                    className={`motion-copy-cell ${copiedValue === c.easing ? "motion-copy-cell-copied" : ""}`}
                    style={{ fontSize: 11, opacity: 0.7, fontFamily: theme.typography.en.mono }}
                    onClick={() => void copyCell(c.easing)}
                    title={`Copy ${c.easing}`}
                  >
                    {easingLabel}
                  </td>
                  <td
                    className={`motion-copy-cell ${copiedValue === distanceLabel ? "motion-copy-cell-copied" : ""}`}
                    onClick={() => void copyCell(distanceLabel)}
                    title={`Copy ${distanceLabel}`}
                  >
                    {distanceLabel}
                  </td>
                  <td
                    className={`motion-copy-cell ${copiedValue === scaleLabel ? "motion-copy-cell-copied" : ""}`}
                    onClick={() => void copyCell(scaleLabel)}
                    title={`Copy ${scaleLabel}`}
                  >
                    {scaleLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={sharedStyles["section-caption"]}>
          Mode: {motionSnap.effectiveMode} | Enter: {theme.motion.enterMs}ms | Easing: {theme.motion.easing}
        </div>
      </section>
    </section>
  );
}

/**
 * Self-contained sub-component for the LayoutIndicator demo.
 * Manages its own active tab state so the indicator animates between tabs.
 */
function LayoutIndicatorDemoTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const TABS = ["System", "Nodes", "Metrics"];

  return (
    <div className={styles["layout-demo-tabs"]} role="tablist">
      {TABS.map((tab, i) => (
        <div
          key={tab}
          role="tab"
          aria-selected={activeTab === i}
          className={`${styles["layout-demo-tab"]} ${activeTab === i ? styles["layout-demo-tab-active"] : ""}`}
          onClick={() => setActiveTab(i)}
        >
          {tab}
          {activeTab === i && (
            <LayoutIndicator
              layoutId="zone-motion-layout-indicator"
              className={styles["layout-demo-indicator"]}
            />
          )}
        </div>
      ))}
    </div>
  );
}

