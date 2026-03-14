import { useState, type ReactNode } from "react";
import { Grid, Group, MultiSelect, NumberInput, Paper, Select, Stack, Switch, Text } from "@mantine/core";
import { IconAlertTriangle, IconArrowRight, IconCheck, IconInfoCircle, IconSparkles, IconStar, IconTrash } from "@tabler/icons-react";

import {
  CosmicGlowEffect,
  DepthButton,
  DirectionalRevealEffect,
  GlitchGlowEffect,
  GlitchOverlay,
  LaserGlowEffect,
  LiquidFillEffect,
  NeonScanlinesEffect,
  PointerZoneTiltEffect,
  RippleEffect,
  ShimmerSweepEffect,
  SlideIconWrapper,
  SpectrumBorderEffect,
  SpotlightGlowEffect,
  Tilt3DEffect,
} from "@infini-dev-kit/frontend/components";
import type { DepthButtonType, EffectRevealMode, LiquidFillMode } from "@infini-dev-kit/frontend/theme/motion-types";
import { useT } from "../../i18n";

const BUTTON_TYPES: DepthButtonType[] = ["primary", "secondary", "success", "danger", "warning", "info"];
type GlowVariant = "off" | "spotlight" | "laser" | "cosmic" | "glitch";
type RevealDirection = "up" | "down" | "left" | "right";

const ICONS = {
  arrow: <IconArrowRight size={18} />,
  check: <IconCheck size={18} />,
  trash: <IconTrash size={18} />,
  info: <IconInfoCircle size={18} />,
  alert: <IconAlertTriangle size={18} />,
  sparkles: <IconSparkles size={18} />,
  star: <IconStar size={18} />,
} as const;

function clampNumber(value: string | number, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, value));
}

export function ButtonEffectEditor() {
  const t = useT("theme-lab");

  const colorOptions = [
    { value: "var(--infini-color-primary)", label: t("buttons.editor.colorPrimary") },
    { value: "var(--infini-color-accent)", label: t("buttons.editor.colorAccent") },
    { value: "var(--infini-color-secondary)", label: t("buttons.editor.colorSecondary") },
    { value: "var(--infini-color-success)", label: t("buttons.editor.colorSuccess") },
    { value: "var(--infini-color-warning)", label: t("buttons.editor.colorWarning") },
    { value: "var(--infini-color-text)", label: t("buttons.editor.colorText") },
    { value: "rgba(255, 255, 255, 0.28)", label: t("buttons.editor.colorWhite") },
  ];
  const glowColorOptions = [
    ...colorOptions,
    { value: "var(--infini-border-glow-color)", label: t("buttons.editor.colorHostGlow") },
  ];

  // ── Base button ──
  const [buttonType, setButtonType] = useState<DepthButtonType>("primary");

  // ── SlideIcon ──
  const [enableSlide, setEnableSlide] = useState(false);
  const [slideIcon, setSlideIcon] = useState<keyof typeof ICONS>("arrow");
  const [slideBgBefore, setSlideBgBefore] = useState("var(--infini-button-bg-active)");
  const [slideBgAfter, setSlideBgAfter] = useState("var(--infini-button-bg-shadow)");
  const [slideColorBefore, setSlideColorBefore] = useState("var(--infini-color-bg)");
  const [slideColorAfter, setSlideColorAfter] = useState("var(--infini-color-bg)");

  // ── Ripple ──
  const [enableRipple, setEnableRipple] = useState(false);
  const [rippleColor, setRippleColor] = useState("var(--infini-color-primary)");

  // ── DirectionalReveal ──
  const [enableReveal, setEnableReveal] = useState(false);
  const [revealDirection, setRevealDirection] = useState<RevealDirection>("up");
  const [revealDuration, setRevealDuration] = useState(0.35);

  // ── Glow (mutually exclusive variants) ──
  const [glowVariant, setGlowVariant] = useState<GlowVariant>("off");
  const [glowColor, setGlowColor] = useState("var(--infini-color-primary)");
  const [glowIntensity, setGlowIntensity] = useState(0.6);
  const [glowRadius, setGlowRadius] = useState(200);
  const [laserSpinSpeed, setLaserSpinSpeed] = useState(1.5);

  // ── NeonScanlines ──
  const [enableNeon, setEnableNeon] = useState(false);
  const [neonColor, setNeonColor] = useState("var(--infini-color-accent)");
  const [neonScanlines, setNeonScanlines] = useState(true);
  const [neonCornerClips, setNeonCornerClips] = useState(true);

  // ── SpectrumBorder ──
  const [enableBorder, setEnableBorder] = useState(false);
  const [borderRevealMode, setBorderRevealMode] = useState<EffectRevealMode>("hover");
  const [borderRotate, setBorderRotate] = useState(true);
  const [borderColors, setBorderColors] = useState<string[]>([
    "var(--infini-color-primary)",
    "var(--infini-color-accent)",
    "var(--infini-color-secondary)",
  ]);
  const [borderArc, setBorderArc] = useState(150);
  const [borderGlowIntensity, setBorderGlowIntensity] = useState(1);

  // ── LiquidFill ──
  const [enableLiquid, setEnableLiquid] = useState(false);
  const [liquidRevealMode, setLiquidRevealMode] = useState<EffectRevealMode>("hover");
  const [liquidMode, setLiquidMode] = useState<LiquidFillMode>("bottom-up");
  const [liquidColor, setLiquidColor] = useState("var(--infini-color-primary)");
  const [liquidOpacity, setLiquidOpacity] = useState(0.34);

  // ── ShimmerSweep ──
  const [enableShimmer, setEnableShimmer] = useState(false);
  const [shimmerRevealMode, setShimmerRevealMode] = useState<EffectRevealMode>("hover");
  const [shimmerSweepColor, setShimmerSweepColor] = useState("rgba(255, 255, 255, 0.28)");
  const [shimmerGlowColor, setShimmerGlowColor] = useState("var(--infini-border-glow-color)");
  const [shimmerLift, setShimmerLift] = useState(6);
  const [shimmerGlowIntensity, setShimmerGlowIntensity] = useState(1);

  // ── GlitchOverlay ──
  const [enableGlitch, setEnableGlitch] = useState(false);
  const [glitchTrigger, setGlitchTrigger] = useState<"hover" | "click" | "always">("hover");
  const [glitchIntensity, setGlitchIntensity] = useState<"subtle" | "medium" | "heavy">("medium");

  // ── Tilt3D ──
  const [enableTilt, setEnableTilt] = useState(false);
  const [tiltDegree, setTiltDegree] = useState(15);
  const [tiltGlowColor, setTiltGlowColor] = useState("var(--infini-color-primary)");
  const [tiltGlowIntensity, setTiltGlowIntensity] = useState(0.6);

  // ── PointerZoneTilt ──
  const [enableZoneTilt, setEnableZoneTilt] = useState(false);
  const [zoneTiltPressure, setZoneTiltPressure] = useState(1);

  // ── Build composition chain (innermost → outermost) ──
  const baseRadius = "var(--infini-radius)";
  let button: ReactNode = <DepthButton type={buttonType}>{t("buttons.editor.clickMe")}</DepthButton>;

  // Composition order (outermost → innermost):
  // PointerZoneTilt → Tilt3D → GlitchOverlay → SpectrumBorder → ShimmerSweep →
  // LiquidFill → NeonScanlines → [glow] → DirectionalReveal → Ripple → SlideIcon → [host]

  if (enableSlide) {
    button = (
      <SlideIconWrapper
        icon={ICONS[slideIcon]}
        iconBgBefore={slideBgBefore}
        iconBgAfter={slideBgAfter}
        iconColorBefore={slideColorBefore}
        iconColorAfter={slideColorAfter}
      >
        {button}
      </SlideIconWrapper>
    );
  }

  if (enableRipple) {
    button = (
      <RippleEffect color={rippleColor}>
        {button}
      </RippleEffect>
    );
  }

  if (enableReveal) {
    button = (
      <DirectionalRevealEffect
        direction={revealDirection}
        duration={revealDuration}
        revealContent={<div style={{ padding: 8, fontSize: 11, textAlign: "center" }}>{t("buttons.editor.revealOverlay")}</div>}
      >
        {button}
      </DirectionalRevealEffect>
    );
  }

  if (glowVariant === "spotlight") {
    button = <SpotlightGlowEffect glowColor={glowColor} glowIntensity={glowIntensity} glowRadius={glowRadius}>{button}</SpotlightGlowEffect>;
  } else if (glowVariant === "laser") {
    button = <LaserGlowEffect glowColor={glowColor} glowIntensity={glowIntensity} spinSpeed={laserSpinSpeed}>{button}</LaserGlowEffect>;
  } else if (glowVariant === "cosmic") {
    button = <CosmicGlowEffect glowColor={glowColor} glowIntensity={glowIntensity} glowRadius={glowRadius}>{button}</CosmicGlowEffect>;
  } else if (glowVariant === "glitch") {
    button = <GlitchGlowEffect glowColor={glowColor} glowIntensity={glowIntensity} glowRadius={glowRadius}>{button}</GlitchGlowEffect>;
  }

  if (enableNeon) {
    button = (
      <NeonScanlinesEffect neonColor={neonColor} scanlines={neonScanlines} cornerClips={neonCornerClips}>
        {button}
      </NeonScanlinesEffect>
    );
  }

  if (enableLiquid) {
    button = (
      <LiquidFillEffect
        color={liquidColor}
        mode={liquidMode}
        revealMode={liquidRevealMode}
        opacity={liquidOpacity}
        radius={baseRadius}
      >
        {button}
      </LiquidFillEffect>
    );
  }

  if (enableShimmer) {
    button = (
      <ShimmerSweepEffect
        sweepColor={shimmerSweepColor}
        glowColor={shimmerGlowColor}
        revealMode={shimmerRevealMode}
        lift={shimmerLift}
        glowIntensity={shimmerGlowIntensity}
        radius={baseRadius}
      >
        {button}
      </ShimmerSweepEffect>
    );
  }

  if (enableBorder) {
    button = (
      <SpectrumBorderEffect
        colors={borderColors.length > 0 ? borderColors : undefined}
        revealMode={borderRevealMode}
        rotate={borderRotate}
        visibleArc={borderArc}
        glowIntensity={borderGlowIntensity}
        radius={baseRadius}
      >
        {button}
      </SpectrumBorderEffect>
    );
  }

  if (enableGlitch) {
    button = (
      <GlitchOverlay trigger={glitchTrigger} intensity={glitchIntensity}>
        {button}
      </GlitchOverlay>
    );
  }

  if (enableTilt) {
    button = (
      <Tilt3DEffect tiltDegree={tiltDegree} glowColor={tiltGlowColor} glowIntensity={tiltGlowIntensity}>
        {button}
      </Tilt3DEffect>
    );
  }

  if (enableZoneTilt) {
    button = (
      <PointerZoneTiltEffect pressure={zoneTiltPressure}>
        {button}
      </PointerZoneTiltEffect>
    );
  }

  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Paper
          p="xl"
          withBorder
          style={{
            minHeight: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          {button}
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 7 }}>
        <Stack gap="md">
          {/* ── Base Button ── */}
          <Paper p="md" withBorder>
            <Text size="sm" fw={600} mb="md">
              {t("buttons.editor.baseButton")}
            </Text>
            <Stack gap="sm">
              <Select
                label={t("buttons.editor.buttonType")}
                value={buttonType}
                onChange={(value) => value && setButtonType(value as DepthButtonType)}
                data={BUTTON_TYPES.map((type) => ({ value: type, label: t(`buttons.variant.${type}`) }))}
              />
            </Stack>
          </Paper>

          {/* ── SlideIcon ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.slideEffect")}
              </Text>
              <Switch checked={enableSlide} onChange={(event) => setEnableSlide(event.currentTarget.checked)} />
            </Group>
            {enableSlide ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.icon")}
                  value={slideIcon}
                  onChange={(value) => value && setSlideIcon(value as keyof typeof ICONS)}
                  data={Object.keys(ICONS).map((key) => ({ value: key, label: key }))}
                />
                <Select label={t("buttons.editor.bgBefore")} value={slideBgBefore} onChange={(value) => value && setSlideBgBefore(value)} data={colorOptions} />
                <Select label={t("buttons.editor.bgAfter")} value={slideBgAfter} onChange={(value) => value && setSlideBgAfter(value)} data={colorOptions} />
                <Select label={t("buttons.editor.colorBefore")} value={slideColorBefore} onChange={(value) => value && setSlideColorBefore(value)} data={colorOptions} />
                <Select label={t("buttons.editor.colorAfter")} value={slideColorAfter} onChange={(value) => value && setSlideColorAfter(value)} data={colorOptions} />
              </Stack>
            ) : null}
          </Paper>

          {/* ── Ripple ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.rippleEffect")}
              </Text>
              <Switch checked={enableRipple} onChange={(event) => setEnableRipple(event.currentTarget.checked)} />
            </Group>
            {enableRipple ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.rippleColor")}
                  value={rippleColor}
                  onChange={(value) => value && setRippleColor(value)}
                  data={colorOptions}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── DirectionalReveal ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.revealEffect")}
              </Text>
              <Switch checked={enableReveal} onChange={(event) => setEnableReveal(event.currentTarget.checked)} />
            </Group>
            {enableReveal ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.revealDirection")}
                  value={revealDirection}
                  onChange={(value) => value && setRevealDirection(value as RevealDirection)}
                  data={[
                    { value: "up", label: t("buttons.editor.dirUp") },
                    { value: "down", label: t("buttons.editor.dirDown") },
                    { value: "left", label: t("buttons.editor.dirLeft") },
                    { value: "right", label: t("buttons.editor.dirRight") },
                  ]}
                />
                <NumberInput
                  label={t("buttons.editor.revealDuration")}
                  value={revealDuration}
                  min={0.1}
                  max={1}
                  step={0.05}
                  decimalScale={2}
                  onChange={(value) => setRevealDuration(clampNumber(value, 0.35, 0.1, 1))}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── Glow (mutually exclusive) ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.glowEffect")}
              </Text>
              <Select
                size="xs"
                w={140}
                value={glowVariant}
                onChange={(value) => value && setGlowVariant(value as GlowVariant)}
                data={[
                  { value: "off", label: t("buttons.editor.glowOff") },
                  { value: "spotlight", label: t("buttons.editor.glowSpotlight") },
                  { value: "laser", label: t("buttons.editor.glowLaser") },
                  { value: "cosmic", label: t("buttons.editor.glowCosmic") },
                  { value: "glitch", label: t("buttons.editor.glowGlitch") },
                ]}
              />
            </Group>
            {glowVariant !== "off" ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.glowColor")}
                  value={glowColor}
                  onChange={(value) => value && setGlowColor(value)}
                  data={colorOptions}
                />
                <NumberInput
                  label={t("buttons.editor.glowIntensity")}
                  value={glowIntensity}
                  min={0}
                  max={3}
                  step={0.1}
                  decimalScale={1}
                  onChange={(value) => setGlowIntensity(clampNumber(value, 0.6, 0, 3))}
                />
                {glowVariant !== "laser" ? (
                  <NumberInput
                    label={t("buttons.editor.glowRadius")}
                    value={glowRadius}
                    min={50}
                    max={500}
                    step={10}
                    onChange={(value) => setGlowRadius(clampNumber(value, 200, 50, 500))}
                  />
                ) : (
                  <NumberInput
                    label={t("buttons.editor.laserSpinSpeed")}
                    value={laserSpinSpeed}
                    min={0.5}
                    max={5}
                    step={0.5}
                    decimalScale={1}
                    onChange={(value) => setLaserSpinSpeed(clampNumber(value, 1.5, 0.5, 5))}
                  />
                )}
              </Stack>
            ) : null}
          </Paper>

          {/* ── NeonScanlines ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.neonEffect")}
              </Text>
              <Switch checked={enableNeon} onChange={(event) => setEnableNeon(event.currentTarget.checked)} />
            </Group>
            {enableNeon ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.neonColor")}
                  value={neonColor}
                  onChange={(value) => value && setNeonColor(value)}
                  data={colorOptions}
                />
                <Switch
                  checked={neonScanlines}
                  label={t("buttons.editor.neonScanlines")}
                  onChange={(event) => setNeonScanlines(event.currentTarget.checked)}
                />
                <Switch
                  checked={neonCornerClips}
                  label={t("buttons.editor.neonCornerClips")}
                  onChange={(event) => setNeonCornerClips(event.currentTarget.checked)}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── SpectrumBorder ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.borderEffect")}
              </Text>
              <Switch checked={enableBorder} onChange={(event) => setEnableBorder(event.currentTarget.checked)} />
            </Group>
            {enableBorder ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.revealMode")}
                  value={borderRevealMode}
                  onChange={(value) => value && setBorderRevealMode(value as EffectRevealMode)}
                  data={[
                    { value: "hover", label: t("buttons.editor.revealHover") },
                    { value: "always", label: t("buttons.editor.revealAlways") },
                  ]}
                />
                <MultiSelect
                  label={t("buttons.editor.borderColors")}
                  value={borderColors}
                  onChange={setBorderColors}
                  data={colorOptions}
                  clearable
                />
                <NumberInput
                  label={t("buttons.editor.borderArc")}
                  value={borderArc}
                  min={24}
                  max={360}
                  step={6}
                  onChange={(value) => setBorderArc(clampNumber(value, 150, 24, 360))}
                />
                <NumberInput
                  label={t("buttons.editor.glowIntensity")}
                  value={borderGlowIntensity}
                  min={0}
                  max={3}
                  step={0.1}
                  decimalScale={1}
                  onChange={(value) => setBorderGlowIntensity(clampNumber(value, 1, 0, 3))}
                />
                <Switch
                  checked={borderRotate}
                  label={t("buttons.editor.rotateBorder")}
                  onChange={(event) => setBorderRotate(event.currentTarget.checked)}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── LiquidFill ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.liquidEffect")}
              </Text>
              <Switch checked={enableLiquid} onChange={(event) => setEnableLiquid(event.currentTarget.checked)} />
            </Group>
            {enableLiquid ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.revealMode")}
                  value={liquidRevealMode}
                  onChange={(value) => value && setLiquidRevealMode(value as EffectRevealMode)}
                  data={[
                    { value: "hover", label: t("buttons.editor.revealHover") },
                    { value: "always", label: t("buttons.editor.revealAlways") },
                  ]}
                />
                <Select
                  label={t("buttons.editor.liquidMode")}
                  value={liquidMode}
                  onChange={(value) => value && setLiquidMode(value as LiquidFillMode)}
                  data={[
                    { value: "bottom-up", label: t("buttons.editor.liquidBottomUp") },
                    { value: "left-to-right", label: t("buttons.editor.liquidLeftToRight") },
                    { value: "both-sides", label: t("buttons.editor.liquidBothSides") },
                    { value: "diagonal", label: t("buttons.editor.liquidDiagonal") },
                  ]}
                />
                <Select
                  label={t("buttons.editor.fillColor")}
                  value={liquidColor}
                  onChange={(value) => value && setLiquidColor(value)}
                  data={colorOptions}
                />
                <NumberInput
                  label={t("buttons.editor.fillOpacity")}
                  value={liquidOpacity}
                  min={0.1}
                  max={0.9}
                  step={0.05}
                  decimalScale={2}
                  onChange={(value) => setLiquidOpacity(clampNumber(value, 0.34, 0.1, 0.9))}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── ShimmerSweep ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.shimmerEffect")}
              </Text>
              <Switch checked={enableShimmer} onChange={(event) => setEnableShimmer(event.currentTarget.checked)} />
            </Group>
            {enableShimmer ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.revealMode")}
                  value={shimmerRevealMode}
                  onChange={(value) => value && setShimmerRevealMode(value as EffectRevealMode)}
                  data={[
                    { value: "hover", label: t("buttons.editor.revealHover") },
                    { value: "always", label: t("buttons.editor.revealAlways") },
                  ]}
                />
                <Select
                  label={t("buttons.editor.sweepColor")}
                  value={shimmerSweepColor}
                  onChange={(value) => value && setShimmerSweepColor(value)}
                  data={[
                    { value: "rgba(255, 255, 255, 0.28)", label: t("buttons.editor.colorWhite") },
                    { value: "var(--infini-color-accent)", label: t("buttons.editor.colorAccent") },
                    { value: "var(--infini-color-primary)", label: t("buttons.editor.colorPrimary") },
                  ]}
                />
                <Select
                  label={t("buttons.editor.shimmerGlowColor")}
                  value={shimmerGlowColor}
                  onChange={(value) => value && setShimmerGlowColor(value)}
                  data={glowColorOptions}
                />
                <NumberInput
                  label={t("buttons.editor.shimmerLift")}
                  value={shimmerLift}
                  min={0}
                  max={18}
                  step={1}
                  onChange={(value) => setShimmerLift(clampNumber(value, 6, 0, 18))}
                />
                <NumberInput
                  label={t("buttons.editor.glowIntensity")}
                  value={shimmerGlowIntensity}
                  min={0}
                  max={3}
                  step={0.1}
                  decimalScale={1}
                  onChange={(value) => setShimmerGlowIntensity(clampNumber(value, 1, 0, 3))}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── GlitchOverlay ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.glitchEffect")}
              </Text>
              <Switch checked={enableGlitch} onChange={(event) => setEnableGlitch(event.currentTarget.checked)} />
            </Group>
            {enableGlitch ? (
              <Stack gap="sm">
                <Select
                  label={t("buttons.editor.trigger")}
                  value={glitchTrigger}
                  onChange={(value) => value && setGlitchTrigger(value as "hover" | "click" | "always")}
                  data={[
                    { value: "hover", label: t("buttons.editor.triggerHover") },
                    { value: "click", label: t("buttons.editor.triggerClick") },
                    { value: "always", label: t("buttons.editor.triggerAlways") },
                  ]}
                />
                <Select
                  label={t("buttons.editor.intensity")}
                  value={glitchIntensity}
                  onChange={(value) => value && setGlitchIntensity(value as "subtle" | "medium" | "heavy")}
                  data={[
                    { value: "subtle", label: t("buttons.editor.intensityLight") },
                    { value: "medium", label: t("buttons.editor.intensityMedium") },
                    { value: "heavy", label: t("buttons.editor.intensityHeavy") },
                  ]}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── Tilt3D ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.tiltEffect")}
              </Text>
              <Switch checked={enableTilt} onChange={(event) => setEnableTilt(event.currentTarget.checked)} />
            </Group>
            {enableTilt ? (
              <Stack gap="sm">
                <NumberInput
                  label={t("buttons.editor.tiltDegree")}
                  value={tiltDegree}
                  min={5}
                  max={45}
                  step={5}
                  onChange={(value) => setTiltDegree(clampNumber(value, 15, 5, 45))}
                />
                <Select
                  label={t("buttons.editor.glowColor")}
                  value={tiltGlowColor}
                  onChange={(value) => value && setTiltGlowColor(value)}
                  data={colorOptions}
                />
                <NumberInput
                  label={t("buttons.editor.glowIntensity")}
                  value={tiltGlowIntensity}
                  min={0}
                  max={3}
                  step={0.1}
                  decimalScale={1}
                  onChange={(value) => setTiltGlowIntensity(clampNumber(value, 0.6, 0, 3))}
                />
              </Stack>
            ) : null}
          </Paper>

          {/* ── PointerZoneTilt ── */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="sm" fw={600}>
                {t("buttons.editor.zoneTiltEffect")}
              </Text>
              <Switch checked={enableZoneTilt} onChange={(event) => setEnableZoneTilt(event.currentTarget.checked)} />
            </Group>
            {enableZoneTilt ? (
              <Stack gap="sm">
                <NumberInput
                  label={t("buttons.editor.zoneTiltPressure")}
                  value={zoneTiltPressure}
                  min={0.5}
                  max={3}
                  step={0.5}
                  decimalScale={1}
                  onChange={(value) => setZoneTiltPressure(clampNumber(value, 1, 0.5, 3))}
                />
              </Stack>
            ) : null}
          </Paper>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
