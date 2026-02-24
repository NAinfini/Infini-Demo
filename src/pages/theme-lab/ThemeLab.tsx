import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import { ZONE_COUNT } from "./data";
import { ZoneCharts } from "./ZoneCharts";
import { ZoneControls } from "./ZoneControls";
import { ZoneData } from "./ZoneData";
import { ZoneFeedback } from "./ZoneFeedback";
import { ZoneFoundation } from "./ZoneFoundation";
import { ZoneGallery } from "./ZoneGallery";
import { ZoneHero } from "./ZoneHero";
import { ZoneInternals } from "./ZoneInternals";
import { ZoneMotion } from "./ZoneMotion";
import "../ThemeLab.css";

export function ThemeLab() {
  const { motion, state, theme } = useThemeSnapshot();
  const [revealedZones, setRevealedZones] = useState<boolean[]>(() => Array.from({ length: ZONE_COUNT }, () => false));
  const zoneRefs = useRef<Array<HTMLElement | null>>([]);

  const revealEnabled = motion.effectiveMode === "full";
  const motionClass =
    motion.effectiveMode === "off"
      ? "theme-lab-motion-off"
      : motion.effectiveMode === "reduced"
        ? "theme-lab-motion-reduced"
        : "theme-lab-motion-full";

  const motionVars: CSSProperties = {
    "--infini-motion-enter": `${motion.contracts.enter.durationMs}ms`,
    "--infini-motion-exit": `${motion.contracts.exit.durationMs}ms`,
    "--infini-motion-hover": `${motion.contracts.hover.durationMs}ms`,
    "--infini-motion-press": `${motion.contracts.press.durationMs}ms`,
    "--infini-motion-easing": motion.contracts.enter.easing,
    "--infini-motion-distance": `${motion.contracts.enter.distancePx}px`,
    "--infini-shadow-hover": theme.foundation.shadowHover ?? theme.foundation.shadow,
    "--infini-shadow-pressed": theme.foundation.shadowPressed ?? theme.foundation.shadow,
    "--infini-shadow-inset": theme.foundation.shadowInset ?? "none",
  } as CSSProperties;

  useEffect(() => {
    if (!revealEnabled) {
      setRevealedZones(Array.from({ length: ZONE_COUNT }, () => true));
      return;
    }

    setRevealedZones(Array.from({ length: ZONE_COUNT }, () => false));

    if (typeof IntersectionObserver === "undefined") {
      setRevealedZones(Array.from({ length: ZONE_COUNT }, () => true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const zoneIndex = Number((entry.target as HTMLElement).dataset.zoneIndex);
          if (!Number.isFinite(zoneIndex)) {
            return;
          }

          setRevealedZones((prev) => {
            if (prev[zoneIndex]) {
              return prev;
            }
            const next = [...prev];
            next[zoneIndex] = true;
            return next;
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );

    zoneRefs.current.forEach((zone) => {
      if (zone) {
        observer.observe(zone);
      }
    });

    return () => observer.disconnect();
  }, [revealEnabled, state.themeId]);

  const zoneAnimationStyle = (index: number): CSSProperties => ({
    animationDelay: `${index * 80}ms`,
  });

  const setZoneRef = (index: number) => (node: HTMLElement | null) => {
    zoneRefs.current[index] = node;
  };

  return (
    <div
      className={`theme-lab ${motionClass}`}
      data-theme-id={state.themeId}
      style={{ fontFamily: theme.typography.body, color: theme.palette.text, ...motionVars }}
    >
      <ZoneHero zoneIndex={0} revealed={revealedZones[0]} setRef={setZoneRef(0)} animationStyle={zoneAnimationStyle(0)} />
      <ZoneFoundation
        zoneIndex={1}
        revealed={revealedZones[1]}
        setRef={setZoneRef(1)}
        animationStyle={zoneAnimationStyle(1)}
      />
      <ZoneControls zoneIndex={2} revealed={revealedZones[2]} setRef={setZoneRef(2)} animationStyle={zoneAnimationStyle(2)} />
      <ZoneData zoneIndex={3} revealed={revealedZones[3]} setRef={setZoneRef(3)} animationStyle={zoneAnimationStyle(3)} />
      <ZoneFeedback
        zoneIndex={4}
        revealed={revealedZones[4]}
        setRef={setZoneRef(4)}
        animationStyle={zoneAnimationStyle(4)}
      />
      <ZoneGallery
        zoneIndex={5}
        revealed={revealedZones[5]}
        setRef={setZoneRef(5)}
        animationStyle={zoneAnimationStyle(5)}
      />
      <ZoneCharts zoneIndex={6} revealed={revealedZones[6]} setRef={setZoneRef(6)} animationStyle={zoneAnimationStyle(6)} />
      <ZoneMotion zoneIndex={7} revealed={revealedZones[7]} setRef={setZoneRef(7)} animationStyle={zoneAnimationStyle(7)} />
      <ZoneInternals
        zoneIndex={8}
        revealed={revealedZones[8]}
        setRef={setZoneRef(8)}
        animationStyle={zoneAnimationStyle(8)}
      />
    </div>
  );
}
