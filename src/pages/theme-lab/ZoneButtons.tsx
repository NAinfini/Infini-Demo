import { useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
import {
  DepthButton,
  GlitchButton,
  InfiniButton,
  LiquidButton,
  MotionButton,
  ProgressButton,
  ShimmerButton,
  SocialButton,
  useButtonDispatch,
} from "@infini-dev-kit/frontend/components";

import type { ZoneProps } from "./types";
import styles from "./ZoneButtons.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

function fakeAsync(ms = 1800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ZoneButtons({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const [progressLoading, setProgressLoading] = useState(false);
  const dispatch = useButtonDispatch();

  const handleProgressPress = () => fakeAsync(2000);
  const handleProgressSpinnerPress = () => fakeAsync(1600);
  const handleShimmerPress = () => fakeAsync(1500);

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-buttons stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Buttons</div>

      {/* ── InfiniButton (unified dispatch) ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-infini-btn">
        <h2 id="section-infini-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          InfiniButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          Unified button API — auto-dispatches to{" "}
          <code style={{ fontFamily: theme.typography.en.mono }}>{dispatch === "glitch" ? "GlitchButton" : dispatch === "depth" ? "DepthButton" : "ShimmerButton"}</code>{" "}
          for the current theme. Write{" "}
          <code style={{ fontFamily: theme.typography.en.mono }}>&lt;InfiniButton&gt;</code>{" "}
          and the theme decides the style.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Default</span>
            <div className={styles["button-row"]}>
              <InfiniButton>Action</InfiniButton>
              <InfiniButton before="🚀">Launch</InfiniButton>
              <InfiniButton disabled>Disabled</InfiniButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>With overrides</span>
            <div className={styles["button-row"]}>
              <InfiniButton overrides={{ depth: { type: "danger" }, glitch: { intensity: "heavy" } }}>
                Danger / Heavy
              </InfiniButton>
              <InfiniButton after="→">Navigate</InfiniButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── MotionButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-motion-btn">
        <h2 id="section-motion-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          MotionButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          Mantine Button wrapped in a Motion whileHover/whileTap shell with theme-aware ripple effects.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Primary (filled)</span>
            <div className={styles["button-row"]}>
              <MotionButton type="primary">Primary</MotionButton>
              <MotionButton type="primary" loading>Loading</MotionButton>
              <MotionButton type="primary" disabled>Disabled</MotionButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Default</span>
            <div className={styles["button-row"]}>
              <MotionButton>Default</MotionButton>
              <MotionButton disabled>Disabled</MotionButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Outline / Dashed</span>
            <div className={styles["button-row"]}>
              <MotionButton type="dashed">Outline</MotionButton>
              <MotionButton type="dashed" disabled>Disabled</MotionButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Danger</span>
            <div className={styles["button-row"]}>
              <MotionButton type="primary" danger>Delete</MotionButton>
              <MotionButton type="primary" danger disabled>Disabled</MotionButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Sizes</span>
            <div className={styles["button-row"]}>
              <MotionButton type="primary" size="small">Small</MotionButton>
              <MotionButton type="primary" size="middle">Middle</MotionButton>
              <MotionButton type="primary" size="large">Large</MotionButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Subtle / Link</span>
            <div className={styles["button-row"]}>
              <MotionButton type="link">Link</MotionButton>
              <MotionButton type="text">Text</MotionButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── DepthButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-depth-btn">
        <h2 id="section-depth-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          DepthButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          3D raised button with depth shadow, ripple effect, and pointer-position-aware tilt. Raiser level follows the active theme.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Primary</span>
            <div className={styles["button-row"]}>
              <DepthButton type="primary">Launch</DepthButton>
              <DepthButton type="primary" before="🚀">With Icon</DepthButton>
              <DepthButton type="primary" disabled>Disabled</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Secondary</span>
            <div className={styles["button-row"]}>
              <DepthButton type="secondary">Default</DepthButton>
              <DepthButton type="secondary" after="→">Navigate</DepthButton>
              <DepthButton type="secondary" disabled>Disabled</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Danger</span>
            <div className={styles["button-row"]}>
              <DepthButton type="danger">Delete</DepthButton>
              <DepthButton type="danger" before="⚠️">Warning</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Sizes</span>
            <div className={styles["button-row"]}>
              <DepthButton size="sm">Small</DepthButton>
              <DepthButton size="md">Medium</DepthButton>
              <DepthButton size="lg">Large</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>No Tilt / No Ripple</span>
            <div className={styles["button-row"]}>
              <DepthButton hoverTilt={false}>No Tilt</DepthButton>
              <DepthButton ripple={false}>No Ripple</DepthButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── GlitchButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-glitch-btn">
        <h2 id="section-glitch-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          GlitchButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          Hover or click to trigger chromatic aberration and scan-line distortion. Uses procedurally randomized clip-path slices.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Hover trigger — intensity</span>
            <div className={styles["button-row"]}>
              <GlitchButton intensity="subtle" trigger="hover">Subtle</GlitchButton>
              <GlitchButton intensity="medium" trigger="hover">Medium</GlitchButton>
              <GlitchButton intensity="heavy" trigger="hover">Heavy</GlitchButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Click trigger</span>
            <div className={styles["button-row"]}>
              <GlitchButton trigger="click">Click Me</GlitchButton>
              <GlitchButton trigger="click" intensity="heavy">Click Heavy</GlitchButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Always on / Disabled</span>
            <div className={styles["button-row"]}>
              <GlitchButton trigger="always" intensity="subtle">Always</GlitchButton>
              <GlitchButton disabled>Disabled</GlitchButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Custom color</span>
            <div className={styles["button-row"]}>
              <GlitchButton color={theme.palette.danger} trigger="hover">Danger Glitch</GlitchButton>
              <GlitchButton color={theme.palette.success} trigger="hover">Success Glitch</GlitchButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── ShimmerButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-shimmer-btn">
        <h2 id="section-shimmer-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          ShimmerButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          Continuously animated shimmer sweep. Tracks an async <code>onPress</code> promise through loading → success phases.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Default shimmer</span>
            <div className={styles["button-row"]}>
              <ShimmerButton>Shimmer</ShimmerButton>
              <ShimmerButton before="✨">With Icon</ShimmerButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Async press cycle</span>
            <div className={styles["button-row"]}>
              <ShimmerButton onPress={handleShimmerPress} loadingLabel="Saving…" resultLabel="Saved!">
                Save Changes
              </ShimmerButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Disabled</span>
            <div className={styles["button-row"]}>
              <ShimmerButton disabled>Disabled</ShimmerButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── LiquidButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-liquid-btn">
        <h2 id="section-liquid-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          LiquidButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          SVG turbulence filter morphs the border on hover. Viscosity controls how slowly the liquid warps.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Theme primary color</span>
            <div className={styles["button-row"]}>
              <LiquidButton>Liquid</LiquidButton>
              <LiquidButton viscosity={0.4}>Fast (viscosity 0.4)</LiquidButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Custom colors</span>
            <div className={styles["button-row"]}>
              <LiquidButton color={theme.palette.success}>Success</LiquidButton>
              <LiquidButton color={theme.palette.danger}>Danger</LiquidButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>High viscosity / Disabled</span>
            <div className={styles["button-row"]}>
              <LiquidButton viscosity={3}>Slow (viscosity 3)</LiquidButton>
              <LiquidButton disabled>Disabled</LiquidButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── ProgressButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-progress-btn">
        <h2 id="section-progress-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          ProgressButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          Tracks an async operation lifecycle: idle → loading → success / error. Animated phase label transitions and a fake progress bar.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Bar indicator</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={handleProgressPress}
                loadingLabel="Uploading…"
                successLabel="Uploaded!"
                errorLabel="Upload failed"
                indicator="bar"
              >
                Upload File
              </ProgressButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Spinner indicator</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={handleProgressSpinnerPress}
                loadingLabel="Fetching…"
                successLabel="Done!"
                indicator="spinner"
              >
                Fetch Data
              </ProgressButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Error state demo</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={() =>
                  new Promise<void>((_, reject) =>
                    setTimeout(() => reject(new Error("Network timeout")), 1200),
                  )
                }
                successLabel="OK"
                errorLabel="Network timeout"
                indicator="bar"
              >
                Trigger Error
              </ProgressButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>fakePress (auto-trigger)</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={() => fakeAsync(1400)}
                fakePress={progressLoading}
                successLabel="Done!"
                indicator="spinner"
              >
                Auto Trigger
              </ProgressButton>
              <button
                type="button"
                className={styles["demo-trigger"]}
                onClick={() => setProgressLoading((v) => !v)}
              >
                {progressLoading ? "Reset" : "Trigger"}
              </button>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Disabled</span>
            <div className={styles["button-row"]}>
              <ProgressButton onPress={handleProgressPress} disabled>
                Disabled
              </ProgressButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── SocialButton ── */}
      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-social-btn">
        <h2 id="section-social-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          SocialButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          Pre-styled social platform buttons with brand colors and icons. Supports href anchor mode and built-in share popup.
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>GitHub &amp; Discord</span>
            <div className={styles["button-row"]}>
              <SocialButton platform="github" href="https://github.com" label="GitHub" />
              <SocialButton platform="discord" href="https://discord.com" label="Discord" />
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>More platforms</span>
            <div className={styles["button-row"]}>
              <SocialButton platform="twitter" href="https://x.com" />
              <SocialButton platform="linkedin" href="https://linkedin.com" />
              <SocialButton platform="reddit" href="https://reddit.com" />
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Icon hidden / Disabled</span>
            <div className={styles["button-row"]}>
              <SocialButton platform="github" hideIcon href="https://github.com" label="GitHub (no icon)" />
              <SocialButton platform="discord" disabled label="Discord (disabled)" />
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>Share popup</span>
            <div className={styles["button-row"]}>
              <SocialButton
                platform="twitter"
                label="Share on X"
                sharer={{ url: "https://infini-dev-kit.dev", message: "Check out Infini Dev Kit!" }}
              />
              <SocialButton
                platform="facebook"
                sharer={{ url: "https://infini-dev-kit.dev", message: "Infini Dev Kit" }}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

