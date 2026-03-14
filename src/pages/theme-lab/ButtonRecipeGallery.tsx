import type { ReactNode } from "react";

import {
  CosmicGlowEffect,
  GlitchOverlay,
  LaserGlowEffect,
  LiquidFillEffect,
  NeonScanlinesEffect,
  RippleEffect,
  ShimmerSweepEffect,
  SpectrumBorderEffect,
  SpotlightGlowEffect,
  Tilt3DEffect,
} from "@infini-dev-kit/frontend/components";
import { useT } from "../../i18n";

import styles from "./ZoneButtons.module.css";

interface Recipe {
  id: string;
  tags: string[];
  render: (label: string) => ReactNode;
}

const RECIPES: Recipe[] = [
  {
    id: "arcBorder",
    tags: ["SpectrumBorder", "SoftClay"],
    render: (label) => (
      <SpectrumBorderEffect
        revealMode="always"
        colors={[
          "var(--infini-color-primary)",
          "var(--infini-color-accent)",
          "var(--infini-color-secondary)",
        ]}
        radius={999}
      >
        <button>{label}</button>
      </SpectrumBorderEffect>
    ),
  },
  {
    id: "liquidRise",
    tags: ["LiquidFill", "Ancient"],
    render: (label) => (
      <LiquidFillEffect color="var(--infini-color-primary)" radius={18}>
        <button>{label}</button>
      </LiquidFillEffect>
    ),
  },
  {
    id: "shimmerGlass",
    tags: ["ShimmerSweep", "CrystalPrism"],
    render: (label) => (
      <ShimmerSweepEffect radius={20}>
        <button>{label}</button>
      </ShimmerSweepEffect>
    ),
  },
  {
    id: "portalStack",
    tags: ["Spectrum", "Shimmer", "Liquid", "DoubleShadow"],
    render: (label) => (
      <SpectrumBorderEffect
        revealMode="always"
        rotate={false}
        colors={[
          "var(--infini-color-warning)",
          "var(--infini-color-accent)",
          "var(--infini-color-primary)",
        ]}
        radius={999}
      >
        <ShimmerSweepEffect radius={999}>
          <LiquidFillEffect mode="both-sides" color="var(--infini-color-accent)" radius={999}>
            <button>{label}</button>
          </LiquidFillEffect>
        </ShimmerSweepEffect>
      </SpectrumBorderEffect>
    ),
  },
  {
    id: "neonStrike",
    tags: ["Neon", "Tilt3D", "Depth"],
    render: (label) => (
      <Tilt3DEffect tiltDegree={12}>
        <NeonScanlinesEffect neonColor="var(--infini-color-accent)">
          <button>{label}</button>
        </NeonScanlinesEffect>
      </Tilt3DEffect>
    ),
  },
  {
    id: "cosmicPulse",
    tags: ["CosmicGlow", "CrystalPrism"],
    render: (label) => (
      <CosmicGlowEffect glowColor="var(--infini-color-primary)">
        <button>{label}</button>
      </CosmicGlowEffect>
    ),
  },
  {
    id: "laserSword",
    tags: ["LaserGlow", "SoftClay"],
    render: (label) => (
      <LaserGlowEffect glowColor="var(--infini-color-danger)" spinSpeed={2}>
        <button>{label}</button>
      </LaserGlowEffect>
    ),
  },
  {
    id: "glitchPunk",
    tags: ["Glitch", "Neon", "Ancient"],
    render: (label) => (
      <GlitchOverlay trigger="hover" intensity="medium">
        <NeonScanlinesEffect>
          <button>{label}</button>
        </NeonScanlinesEffect>
      </GlitchOverlay>
    ),
  },
  {
    id: "spotlightHero",
    tags: ["Spotlight", "Ripple", "Depth"],
    render: (label) => (
      <SpotlightGlowEffect glowColor="var(--infini-color-primary)">
        <RippleEffect>
          <button>{label}</button>
        </RippleEffect>
      </SpotlightGlowEffect>
    ),
  },
  {
    id: "goldLiquid",
    tags: ["Liquid", "Shimmer", "DoubleShadow"],
    render: (label) => (
      <ShimmerSweepEffect radius={999}>
        <LiquidFillEffect color="var(--infini-color-warning)" radius={999}>
          <button>{label}</button>
        </LiquidFillEffect>
      </ShimmerSweepEffect>
    ),
  },
];

export function ButtonRecipeGallery() {
  const t = useT("theme-lab");
  return (
    <div className={styles["button-grid"]}>
      {RECIPES.map((recipe) => (
        <div key={recipe.id} className={styles["button-card"]}>
          <span className={styles["variant-label"]}>{t(`buttons.recipes.${recipe.id}`)}</span>
          <div className={styles["button-row"]} style={{ justifyContent: "center", minHeight: 56 }}>
            {recipe.render(t("buttons.editor.clickMe"))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "color-mix(in srgb, var(--infini-color-primary) 12%, var(--infini-color-surface))",
                  color: "var(--infini-color-text-muted, var(--infini-color-text))",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
