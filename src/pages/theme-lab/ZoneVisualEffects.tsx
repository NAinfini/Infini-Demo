import { useMemo, useState } from "react";

import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";
import {
  AnimatedCodeBlock,
  BubbleBackground,
  ChibiCard,
  CosmicGlowEffect,
  DepthButton,
  DirectionalRevealEffect,
  Flip3DEffect,
  GlassEffect,
  GlitchGlowEffect,
  GlitchOverlay,
  GrainyBackground,
  ImageComparison,
  ImageScanner,
  LaserGlowEffect,
  MatrixCodeRain,
  NeonScanlinesEffect,
  NeuBrutalCard,
  ParallaxLayerEffect,
  SpotlightGlowEffect,
  Terminal,
  Tilt3DEffect,
} from "@infini-dev-kit/frontend/components";
import { usePowerGlitch } from "@infini-dev-kit/frontend/hooks";
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
  const t = useT("theme-lab");
  const [flipState, setFlipState] = useState(false);
  const hoverPowerGlitch = usePowerGlitch<HTMLDivElement>(useMemo(
    () => ({
      playMode: "hover",
      hideOverflow: true,
      slice: {
        count: 8,
        velocity: 18,
        minHeight: 0.03,
        maxHeight: 0.16,
      },
      pulse: {
        scale: 1.03,
      },
    }),
    [],
  ));
  const manualPowerGlitch = usePowerGlitch<HTMLDivElement>(useMemo(
    () => ({
      playMode: "manual",
      hideOverflow: true,
      timing: {
        duration: 1200,
        iterations: Number.POSITIVE_INFINITY,
      },
      glitchTimeSpan: {
        start: 0.15,
        end: 0.85,
      },
      shake: {
        velocity: 18,
        amplitudeX: 0.18,
        amplitudeY: 0.08,
      },
      slice: {
        count: 10,
        velocity: 20,
        minHeight: 0.02,
        maxHeight: 0.18,
        hueRotate: true,
        cssFilters: "",
      },
      pulse: {
        scale: 1.08,
      },
    }),
    [],
  ));

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-visual-effects stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.visualEffects")}</div>

      {/* ── Section: Cards ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-cards">
        <h2 id="section-ve-cards" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          {t("ve.cards.title")}
        </h2>
        <div className={styles["ve-grid"]}>

          {/* TiltCard row */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.tiltCard.statTitle")}</div>
            <div className={styles["ve-infini-cards-row"]}>
              <Tilt3DEffect className={styles["ve-infini-card"]}>
                <div className={styles["ve-infini-card-body"]}>
                  <div className={styles["ve-infini-card-label"]}>{t("ve.alpha")}</div>
                  <div className={styles["ve-infini-card-value"]} style={{ color: theme.palette.primary }}>
                    24.8k
                  </div>
                </div>
              </Tilt3DEffect>
              <Tilt3DEffect className={styles["ve-infini-card"]}>
                <div className={styles["ve-infini-card-body"]}>
                  <div className={styles["ve-infini-card-label"]}>{t("ve.beta")}</div>
                  <div className={styles["ve-infini-card-value"]} style={{ color: theme.palette.accent }}>
                    9.1k
                  </div>
                </div>
              </Tilt3DEffect>
              <Tilt3DEffect className={styles["ve-infini-card"]}>
                <div className={styles["ve-infini-card-body"]}>
                  <div className={styles["ve-infini-card-label"]}>{t("ve.gamma")}</div>
                  <div className={styles["ve-infini-card-value"]} style={{ color: theme.palette.secondary }}>
                    3.5k
                  </div>
                </div>
              </Tilt3DEffect>
            </div>
            <div className={sharedStyles["section-caption"]}>{t("ve.tiltCard.statCaption")}</div>
          </article>

          {/* HoverCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.hoverCard.title")}</div>
            <div className={styles["ve-hover-card-stage"]}>
              <MantineHoverCard width={260} position="top" withArrow shadow="md">
                <MantineHoverCard.Target>
                  <span className={styles["ve-hover-trigger"]}>
                    {t("ve.hoverCard.trigger")}
                  </span>
                </MantineHoverCard.Target>
                <MantineHoverCard.Dropdown>
                  <div className={styles["ve-hover-content"]}>
                    <div className={styles["ve-hover-content-title"]}>{t("ve.hoverCard.details")}</div>
                    <div className={styles["ve-hover-content-row"]}>
                      <span>{t("ve.primary")}</span>
                      <span style={{ color: theme.palette.primary, fontFamily: theme.typography.en.mono, fontSize: 11 }}>
                        {theme.palette.primary}
                      </span>
                    </div>
                    <div className={styles["ve-hover-content-row"]}>
                      <span>{t("ve.accent")}</span>
                      <span style={{ color: theme.palette.accent, fontFamily: theme.typography.en.mono, fontSize: 11 }}>
                        {theme.palette.accent}
                      </span>
                    </div>
                  </div>
                </MantineHoverCard.Dropdown>
              </MantineHoverCard>
            </div>
            <div className={sharedStyles["section-caption"]}>{t("ve.hoverCard.caption")}</div>
          </article>

          {/* RevealCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.revealCard.title")}</div>
            <DirectionalRevealEffect
              direction="up"
              revealContent={
                <div className={styles["ve-reveal-content"]}>
                  <div className={styles["ve-reveal-title"]}>{t("ve.revealCard.revealed")}</div>
                  <div className={styles["ve-reveal-sub"]}>{t("ve.revealCard.slidesIn")}</div>
                </div>
              }
            >
              <div className={styles["ve-reveal-base"]}>
                <div className={styles["ve-reveal-icon"]}>&#9650;</div>
                <div>{t("ve.revealCard.hover")}</div>
              </div>
            </DirectionalRevealEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.revealCard.caption")}</div>
          </article>

          {/* LayeredCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.layeredCard.title")}</div>
            <div className={styles["ve-layered-wrap"]}>
              <ParallaxLayerEffect
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
            <div className={sharedStyles["section-caption"]}>{t("ve.layeredCard.caption")}</div>
          </article>

          {/* GlassEffect */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.glass.title")}</div>
            <div
              className={styles["ve-glass-stage"]}
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.accent})`,
              }}
            >
              <GlassEffect blur={14} opacity={0.18} borderOpacity={0.25} className={styles["ve-glass-panel"]}>
                <div className={styles["ve-glass-content"]}>
                  <div className={styles["ve-glass-title"]}>{t("ve.glass.panel")}</div>
                  <div className={styles["ve-glass-sub"]}>{t("ve.glass.sub")}</div>
                </div>
              </GlassEffect>
            </div>
            <div className={sharedStyles["section-caption"]}>{t("ve.glass.caption")}</div>
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
            <div className={sharedStyles["section-caption"]}>{t("ve.glitch.caption")}</div>
          </article>

          {/* PowerGlitch */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>PowerGlitch</div>
            <div style={{ display: "grid", gap: 12 }}>
              <div ref={hoverPowerGlitch.ref} className={styles["ve-glitch-stage"]}>
                <div
                  className={styles["ve-glitch-target"]}
                  style={{
                    fontFamily: theme.typography.en.mono,
                    color: theme.palette.primary,
                    border: `1px solid ${theme.foundation.borderColor}`,
                    borderRadius: theme.foundation.radius,
                    padding: "16px 24px",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    background: theme.foundation.surface,
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  Hover Signal
                </div>
              </div>
              <div ref={manualPowerGlitch.ref} className={styles["ve-glitch-stage"]}>
                <div
                  className={styles["ve-glitch-target"]}
                  style={{
                    fontFamily: theme.typography.en.mono,
                    color: theme.palette.accent,
                    border: `1px solid ${theme.foundation.borderColor}`,
                    borderRadius: theme.foundation.radius,
                    padding: "16px 24px",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    background: theme.foundation.surface,
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  Manual Loop
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <DepthButton size="sm" onClick={() => manualPowerGlitch.startGlitch()}>
                  Start Loop
                </DepthButton>
                <DepthButton size="sm" type="secondary" onClick={() => manualPowerGlitch.stopGlitch()}>
                  Stop Loop
                </DepthButton>
              </div>
            </div>
            <div className={sharedStyles["section-caption"]}>
              Recreated from the upstream PowerGlitch library inside Dev Kit. Top target uses hover mode; bottom target uses manual mode with explicit start/stop controls.
            </div>
          </article>

          {/* ImageComparison */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.comparison.title")}</div>
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
                  {t("ve.comparison.primary")}
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
                  {t("ve.comparison.accent")}
                </div>
              }
              beforeLabel={t("ve.comparison.primary")}
              afterLabel={t("ve.comparison.accent")}
              height={150}
            />
            <div className={sharedStyles["section-caption"]}>{t("ve.comparison.caption")}</div>
          </article>

          {/* ImageScanner */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.scanner.title")}</div>
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
            <div className={sharedStyles["section-caption"]}>{t("ve.scanner.caption")}</div>
          </article>

          {/* FlipCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>{t("ve.flip.title")}</div>
            <div className={styles["ve-flip-stage"]}>
              <Flip3DEffect
                front={
                  <div className={styles["ve-flip-face"]} style={{ background: theme.foundation.surface, border: `1px solid ${theme.foundation.borderColor}`, borderRadius: theme.foundation.radius }}>
                    <div style={{ fontFamily: theme.typography.en.heading, fontWeight: 700, fontSize: 16 }}>{t("ve.flip.front")}</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.flip.clickToFlip")}</div>
                  </div>
                }
                back={
                  <div className={styles["ve-flip-face"]} style={{ background: `color-mix(in srgb, ${theme.palette.primary} 12%, ${theme.foundation.surface})`, border: `1px solid ${theme.palette.primary}`, borderRadius: theme.foundation.radius }}>
                    <div style={{ fontFamily: theme.typography.en.heading, fontWeight: 700, fontSize: 16, color: theme.palette.primary }}>{t("ve.flip.back")}</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.flip.clickAgain")}</div>
                  </div>
                }
                flipped={flipState}
                onFlipChange={setFlipState}
                className={styles["ve-flip-card"]}
              />
            </div>
            <div className={sharedStyles["section-caption"]}>{t("ve.flip.caption")}</div>
          </article>

          {/* Tilt3DEffect */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>Tilt3DEffect</div>
            <Tilt3DEffect className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>Tilt3DEffect</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.tiltCard.moveCursor")}</div>
              </div>
            </Tilt3DEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.tiltCard.caption")}</div>
          </article>

          {/* ChibiCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>ChibiCard</div>
            <ChibiCard className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>ChibiCard</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.chibi.softFloat")}</div>
              </div>
            </ChibiCard>
            <div className={sharedStyles["section-caption"]}>{t("ve.chibi.caption")}</div>
          </article>

          {/* NeuBrutalCard */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>NeuBrutalCard</div>
            <NeuBrutalCard className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>NeuBrutalCard</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.neuBrutal.hardShadow")}</div>
              </div>
            </NeuBrutalCard>
            <div className={sharedStyles["section-caption"]}>{t("ve.neuBrutal.caption")}</div>
          </article>

          {/* NeonScanlinesEffect */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>NeonScanlinesEffect</div>
            <NeonScanlinesEffect className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]} style={{ color: theme.palette.accent }}>NeonScanlinesEffect</div>
                <div style={{ fontSize: 11, opacity: 0.6, fontFamily: theme.typography.en.mono }}>NEON // SCANLINES</div>
              </div>
            </NeonScanlinesEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.cyberpunk.caption")}</div>
          </article>

          {/* Glow Effect variants */}
          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>SpotlightGlowEffect</div>
            <SpotlightGlowEffect className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>{t("ve.glow.spotlight")}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.glow.spotlightSub")}</div>
              </div>
            </SpotlightGlowEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.glow.spotlightCaption")}</div>
          </article>

          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>LaserGlowEffect</div>
            <LaserGlowEffect className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>{t("ve.glow.laser")}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.glow.laserSub")}</div>
              </div>
            </LaserGlowEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.glow.laserCaption")}</div>
          </article>

          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>CosmicGlowEffect</div>
            <CosmicGlowEffect className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>{t("ve.glow.cosmic")}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.glow.cosmicSub")}</div>
              </div>
            </CosmicGlowEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.glow.cosmicCaption")}</div>
          </article>

          <article className={styles["ve-card"]}>
            <div className={styles["ve-card-title"]}>GlitchGlowEffect</div>
            <GlitchGlowEffect className={styles["ve-standalone-card"]}>
              <div className={styles["ve-standalone-card-body"]}>
                <div className={styles["ve-standalone-card-label"]}>{t("ve.glow.glitch")}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t("ve.glow.glitchSub")}</div>
              </div>
            </GlitchGlowEffect>
            <div className={sharedStyles["section-caption"]}>{t("ve.glow.glitchCaption")}</div>
          </article>

        </div>
      </section>

      {/* ── Section: Code ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-code">
        <h2 id="section-ve-code" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          {t("ve.code.title")}
        </h2>
        <AnimatedCodeBlock
          code={DEMO_CODE}
          language="typescript"
          speed={35}
          cursor
          autoStart
          className={styles["ve-code-block"]}
        />
        <div className={sharedStyles["section-caption"]}>{t("ve.code.caption")}</div>
      </section>

      {/* ── Section: Terminal ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-terminal">
        <h2 id="section-ve-terminal" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          {t("ve.terminal.title")}
        </h2>
        <Terminal
          commands={TERMINAL_COMMANDS}
          speed={40}
          autoStart
          loop
          className={styles["ve-code-block"]}
        />
        <div className={sharedStyles["section-caption"]}>{t("ve.code.caption")}</div>
      </section>

      {/* ── Section: Terminal ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-terminal">
        <h2 id="section-ve-terminal" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          {t("ve.terminal.title")}
        </h2>
        <Terminal
          commands={TERMINAL_COMMANDS}
          className={styles["ve-terminal"]}
        />
        <div className={sharedStyles["section-caption"]}>{t("ve.terminal.caption")}</div>
      </section>

      {/* ── Section: Backgrounds (full-width) ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ve-bg">
        <h2 id="section-ve-bg" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          {t("ve.bg.title")}
        </h2>
        <div className={styles["ve-bg-grid"]}>

          {/* MatrixCodeRain */}
          <div>
            <div className={styles["ve-bg-label"]}>MatrixCodeRain</div>
            <div className={styles["ve-bg-container"]}>
              <MatrixCodeRain height={150} speed={1.2} density={0.55} fontSize={13} />
            </div>
            <div className={sharedStyles["section-caption"]}>{t("ve.bg.matrixCaption")}</div>
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
            <div className={sharedStyles["section-caption"]}>{t("ve.bg.bubbleCaption")}</div>
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
            <div className={sharedStyles["section-caption"]}>{t("ve.bg.grainyCaption")}</div>
          </div>

        </div>
      </section>
    </section>
  );
}

