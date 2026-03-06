import { useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
import {
  InfiniCard,
  RevealCard,
  LayeredCard,
  FlipCard,
  TiltCard,
  ChibiCard,
  NeuBrutalCard,
  CyberpunkCard,
  GlowCard,
  GlassEffect,
  GlitchOverlay,
  MatrixCodeRain,
  BubbleBackground,
  GrainyBackground,
  ImageComparison,
  ImageScanner,
  AnimatedCodeBlock,
  Terminal,
} from "@infini-dev-kit/frontend/components";
import { HoverCard as MantineHoverCard } from "@mantine/core";

import type { ZoneProps } from "./types";
import styles from "./ZoneVisualEffects.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

const DEMO_CODE = `function greet(name: string) {
  const msg = \`Hello, \${name}!\`;
  console.log(msg);
  return msg;
}`;

const TERMINAL_COMMANDS = [
  { command: "npx infini-dev-kit init", output: ["Initializing project...", "Created infini.config.ts", "Installed 6 themes"], delay: 300 },
  { command: "npm run dev", output: ["Server running at http://localhost:5173"], delay: 600 },
];

export function ZoneVisualEffects({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const [flipState, setFlipState] = useState(false);

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-visual-effects stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Visual Effects</div>

      {/* ── Section: Cards ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-cards">
        <h2 id="section-ve-cards" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Cards
        </h2>
        <div className={styles["ve-grid"]}>

          {/* InfiniCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>InfiniCard — Auto-dispatch</div>
            <div className={styles["ve-infini-cards-row"]}>
              <InfiniCard className={styles["ve-infini-card"]}>
                <div className={styles["ve-infini-card-body"]}>
                  <div className={styles["ve-infini-card-label"]}>Alpha</div>
                  <div className={styles["ve-infini-card-value"]} style={{ color: theme.palette.primary }}>
                    24.8k
                  </div>
                </div>
              </InfiniCard>
              <InfiniCard className={styles["ve-infini-card"]}>
                <div className={styles["ve-infini-card-body"]}>
                  <div className={styles["ve-infini-card-label"]}>Beta</div>
                  <div className={styles["ve-infini-card-value"]} style={{ color: theme.palette.accent }}>
                    9.1k
                  </div>
                </div>
              </InfiniCard>
              <InfiniCard className={styles["ve-infini-card"]}>
                <div className={styles["ve-infini-card-body"]}>
                  <div className={styles["ve-infini-card-label"]}>Gamma</div>
                  <div className={styles["ve-infini-card-value"]} style={{ color: theme.palette.secondary }}>
                    3.5k
                  </div>
                </div>
              </InfiniCard>
            </div>
            <div className={sharedStyles["section-caption"]}>Dispatches to TiltCard / GlowCard / CyberpunkCard per active theme</div>
          </article>

          {/* HoverCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>Mantine HoverCard</div>
            <div className={styles["ve-hover-card-stage"]}>
              <MantineHoverCard width={260} position="top" withArrow shadow="md">
                <MantineHoverCard.Target>
                  <span className={styles["ve-hover-trigger"]}>
                    Hover for theme info
                  </span>
                </MantineHoverCard.Target>
                <MantineHoverCard.Dropdown>
                  <div className={styles["ve-hover-content"]}>
                    <div className={styles["ve-hover-content-title"]}>Theme Details</div>
                    <div className={styles["ve-hover-content-row"]}>
                      <span>Primary</span>
                      <span style={{ color: theme.palette.primary, fontFamily: theme.typography.en.mono, fontSize: 11 }}>
                        {theme.palette.primary}
                      </span>
                    </div>
                    <div className={styles["ve-hover-content-row"]}>
                      <span>Accent</span>
                      <span style={{ color: theme.palette.accent, fontFamily: theme.typography.en.mono, fontSize: 11 }}>
                        {theme.palette.accent}
                      </span>
                    </div>
                  </div>
                </MantineHoverCard.Dropdown>
              </MantineHoverCard>
            </div>
            <div className={sharedStyles["section-caption"]}>Mantine HoverCard with themed content.</div>
          </article>

          {/* RevealCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>RevealCard</div>
            <RevealCard
              direction="up"
              revealContent={
                <div className={styles["ve-reveal-content"]}>
                  <div className={styles["ve-reveal-title"]}>Revealed</div>
                  <div className={styles["ve-reveal-sub"]}>Slides in from below</div>
                </div>
              }
            >
              <div className={styles["ve-reveal-base"]}>
                <div className={styles["ve-reveal-icon"]}>&#9650;</div>
                <div>Hover to reveal</div>
              </div>
            </RevealCard>
            <div className={sharedStyles["section-caption"]}>Directional slide-reveal overlay on hover</div>
          </article>

          {/* LayeredCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>LayeredCard — 3D Parallax</div>
            <div className={styles["ve-layered-wrap"]}>
              <LayeredCard
                tiltDegree={12}
                layerDepth={25}
                layers={[
                  <div
                    key="bg"
                    className={styles["ve-layer-bg"]}
                    style={{
                      background: `linear-gradient(135deg, color-mix(in srgb, ${theme.palette.primary} 18%, transparent), color-mix(in srgb, ${theme.palette.accent} 12%, transparent))`,
                      borderRadius: theme.foundation.radius,
                      width: "100%",
                      height: 140,
                    }}
                  />,
                  <div
                    key="mid"
                    className={styles["ve-layer-mid"]}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme.palette.primary,
                      fontSize: 28,
                      fontWeight: 700,
                      fontFamily: theme.typography.en.heading,
                      opacity: 0.7,
                    }}
                  >
                    &#9670;
                  </div>,
                  <div
                    key="top"
                    className={styles["ve-layer-top"]}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      padding: "0 12px 12px",
                      fontSize: 11,
                      fontFamily: theme.typography.en.mono,
                      color: theme.palette.text,
                      opacity: 0.75,
                    }}
                  >
                    Layer depth: 3
                  </div>,
                ]}
              />
            </div>
            <div className={sharedStyles["section-caption"]}>Mouse over to see parallax depth separation</div>
          </article>

          {/* GlassEffect */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlassEffect</div>
            <div
              className={styles["ve-glass-stage"]}
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.accent})`,
              }}
            >
              <GlassEffect blur={14} opacity={0.18} borderOpacity={0.25} className={styles["ve-glass-panel"]}>
                <div className={styles["ve-glass-content"]}>
                  <div className={styles["ve-glass-title"]}>Glass Panel</div>
                  <div className={styles["ve-glass-sub"]}>Frosted glassmorphism via backdrop-filter</div>
                </div>
              </GlassEffect>
            </div>
            <div className={sharedStyles["section-caption"]}>Apple-style frosted glass with specular highlight</div>
          </article>

          {/* GlitchOverlay */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlitchOverlay</div>
            <div className={styles["ve-glitch-stage"]}>
              <GlitchOverlay trigger="hover" intensity="medium">
                <div
                  className={styles["ve-glitch-target"]}
                  style={{
                    fontFamily: theme.typography.en.mono,
                    color: theme.palette.primary,
                    border: `1px solid ${theme.foundation.borderColor}`,
                    borderRadius: theme.foundation.radius,
                    padding: "16px 24px",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    background: theme.foundation.surface,
                    userSelect: "none",
                  }}
                >
                  SYSTEM ERROR
                </div>
              </GlitchOverlay>
            </div>
            <div className={sharedStyles["section-caption"]}>Hover to trigger chromatic aberration glitch burst</div>
          </article>

          {/* ImageComparison */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>ImageComparison</div>
            <ImageComparison
              before={
                <div
                  style={{
                    background: `linear-gradient(135deg, ${theme.palette.primary}, color-mix(in srgb, ${theme.palette.primary} 60%, ${theme.foundation.surface}))`,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.foundation.background,
                    fontFamily: theme.typography.en.mono,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Primary
                </div>
              }
              after={
                <div
                  style={{
                    background: `linear-gradient(135deg, ${theme.palette.accent}, color-mix(in srgb, ${theme.palette.accent} 60%, ${theme.foundation.surface}))`,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.foundation.background,
                    fontFamily: theme.typography.en.mono,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Accent
                </div>
              }
              beforeLabel="Primary"
              afterLabel="Accent"
              height={150}
            />
            <div className={sharedStyles["section-caption"]}>Drag the handle to compare theme colors</div>
          </article>

          {/* ImageScanner */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>ImageScanner</div>
            <ImageScanner direction="down" duration={2.5} loop>
              <div
                className={styles["ve-scanner-target"]}
                style={{
                  background: theme.foundation.surface,
                  border: `1px solid ${theme.foundation.borderColor}`,
                  borderRadius: theme.foundation.radius,
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: theme.typography.en.mono,
                    fontSize: 11,
                    opacity: 0.6,
                    color: theme.palette.primary,
                  }}
                >
                  &gt; scanning target
                </div>
                <div
                  style={{
                    fontFamily: theme.typography.en.mono,
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.palette.text,
                  }}
                >
                  {theme.name}
                </div>
                <div
                  style={{
                    fontFamily: theme.typography.en.mono,
                    fontSize: 11,
                    opacity: 0.5,
                  }}
                >
                  radius: {theme.foundation.radius}
                </div>
              </div>
            </ImageScanner>
            <div className={sharedStyles["section-caption"]}>Futuristic scan line with corner brackets</div>
          </article>

          {/* FlipCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>FlipCard</div>
            <div className={styles["ve-flip-stage"]}>
              <FlipCard
                front={
                  <div className={styles["ve-flip-face"]} style={{ background: theme.foundation.surface, border: `1px solid ${theme.foundation.borderColor}`, borderRadius: theme.foundation.radius }}>
                    <div style={{ fontFamily: theme.typography.en.heading, fontWeight: 700, fontSize: 16 }}>Front</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>Click to flip</div>
                  </div>
                }
                back={
                  <div className={styles["ve-flip-face"]} style={{ background: `color-mix(in srgb, ${theme.palette.primary} 12%, ${theme.foundation.surface})`, border: `1px solid ${theme.palette.primary}`, borderRadius: theme.foundation.radius }}>
                    <div style={{ fontFamily: theme.typography.en.heading, fontWeight: 700, fontSize: 16, color: theme.palette.primary }}>Back</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>Click again</div>
                  </div>
                }
                flipped={flipState}
                onFlipChange={setFlipState}
                className={styles["ve-flip-card"]}
              />
            </div>
            <div className={sharedStyles["section-caption"]}>Click-to-flip with 3D CSS perspective and motion gating</div>
          </article>

          {/* TiltCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>TiltCard</div>
            <TiltCard className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>TiltCard</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Move cursor to tilt</div>
              </div>
            </TiltCard>
            <div className={sharedStyles["section-caption"]}>3D perspective tilt following cursor position with radial glow</div>
          </article>

          {/* ChibiCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>ChibiCard</div>
            <ChibiCard className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>ChibiCard</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Soft float on hover</div>
              </div>
            </ChibiCard>
            <div className={sharedStyles["section-caption"]}>Kawaii sticker-card with cloud shadows and gentle lift</div>
          </article>

          {/* NeuBrutalCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>NeuBrutalCard</div>
            <NeuBrutalCard className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>NeuBrutalCard</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Hard shadow shift</div>
              </div>
            </NeuBrutalCard>
            <div className={sharedStyles["section-caption"]}>Bold borders, zero radius, offset shadow that shifts on hover</div>
          </article>

          {/* CyberpunkCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>CyberpunkCard</div>
            <CyberpunkCard className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]} style={{ color: theme.palette.accent }}>CyberpunkCard</div>
                <div style={{ fontSize: 11, opacity: 0.6, fontFamily: theme.typography.en.mono }}>NEON // SCANLINES</div>
              </div>
            </CyberpunkCard>
            <div className={sharedStyles["section-caption"]}>Neon borders, animated scanlines, clipped corners, pulse glow</div>
          </article>

          {/* GlowCard variants */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlowCard — Spotlight</div>
            <GlowCard variant="spotlight" className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>Spotlight</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Mouse-following radial glow</div>
              </div>
            </GlowCard>
            <div className={sharedStyles["section-caption"]}>Default variant — radial gradient follows the cursor</div>
          </article>

          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlowCard — Laser</div>
            <GlowCard variant="laser" className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>Laser</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Crosshair + conic gradient</div>
              </div>
            </GlowCard>
            <div className={sharedStyles["section-caption"]}>Rotating conic gradient at cursor with crosshair reticle lines</div>
          </article>

          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlowCard — Cosmic</div>
            <GlowCard variant="cosmic" className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>Cosmic</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Particle nebula physics</div>
              </div>
            </GlowCard>
            <div className={sharedStyles["section-caption"]}>Velocity-decay particles spawn at cursor with nebula backdrop</div>
          </article>

          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlowCard — Glitch</div>
            <GlowCard variant="glitch" className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>Glitch</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Scanline + noise flicker</div>
              </div>
            </GlowCard>
            <div className={sharedStyles["section-caption"]}>Horizontal scanlines with random glitch bar and flicker</div>
          </article>

        </div>
      </section>

      {/* ── Section: Code ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-code">
        <h2 id="section-ve-code" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Animated Code Block
        </h2>
        <AnimatedCodeBlock
          code={DEMO_CODE}
          language="typescript"
          speed={35}
          cursor
          autoStart
          className={styles["ve-code-block"]}
        />
        <div className={sharedStyles["section-caption"]}>Characters typed out at configurable speed with blinking cursor</div>
      </section>

      {/* ── Section: Terminal ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-terminal">
        <h2 id="section-ve-terminal" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Terminal
        </h2>
        <Terminal
          commands={TERMINAL_COMMANDS}
          speed={40}
          autoStart
          loop
          className={styles["ve-code-block"]}
        />
        <div className={sharedStyles["section-caption"]}>Simulated CLI with macOS chrome, command typing, and output reveal</div>
      </section>

      {/* ── Section: Backgrounds (full-width) ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-bg">
        <h2 id="section-ve-bg" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Backgrounds
        </h2>
        <div className={styles["ve-bg-grid"]}>

          {/* MatrixCodeRain */}
          <div>
            <div className={styles["ve-bg-label"]}>MatrixCodeRain</div>
            <div className={styles["ve-bg-container"]}>
              <MatrixCodeRain height={150} speed={1.2} density={0.55} fontSize={13} />
            </div>
            <div className={sharedStyles["section-caption"]}>Canvas-based falling character rain, color from theme primary</div>
          </div>

          {/* BubbleBackground */}
          <div>
            <div className={styles["ve-bg-label"]}>BubbleBackground</div>
            <BubbleBackground
              count={16}
              minSize={8}
              maxSize={48}
              speed={0.9}
              className={styles["ve-bg-container"]}
            >
              <div
                className={styles["ve-bubble-content"]}
                style={{ fontFamily: theme.typography.en.mono, color: theme.palette.text }}
              >
                floating bubbles
              </div>
            </BubbleBackground>
            <div className={sharedStyles["section-caption"]}>Seeded floating bubble particles from theme palette</div>
          </div>

          {/* GrainyBackground */}
          <div>
            <div className={styles["ve-bg-label"]}>GrainyBackground</div>
            <GrainyBackground
              grainOpacity={0.28}
              grainSize={2}
              animated
              duration={7}
              className={styles["ve-bg-container"]}
            >
              <div
                className={styles["ve-bubble-content"]}
                style={{ fontFamily: theme.typography.en.mono, color: theme.foundation.background }}
              >
                grainy texture
              </div>
            </GrainyBackground>
            <div className={sharedStyles["section-caption"]}>SVG feTurbulence grain over animated gradient</div>
          </div>

        </div>
      </section>
    </section>
  );
}

