import { Collapse } from "antd";

import { getControlStyle, type PrimitiveBoxStyle } from "@infini-dev-kit/frontend/primitives";
import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import type { ZoneProps } from "./types";

export function ZoneInternals({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { primitives, state, theme } = useThemeSnapshot();
  const primaryBtn = getControlStyle(state.themeId, "button-primary");

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-internals stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Internals</div>

      <section className="theme-lab-section" aria-labelledby="section-primitives">
        <h2 id="section-primitives" className="theme-lab-section-title ambient-section-title">
          Primitives
        </h2>
        <div className="primitives-grid">
          {(Object.keys(primitives) as (keyof typeof primitives)[]).map((key) => {
            const primitiveStyle: PrimitiveBoxStyle = primitives[key];
            return (
              <div
                key={key}
                className="primitive-card"
                style={{
                  background: primitiveStyle.background,
                  border: `${primitiveStyle.borderWidth ?? 1}px solid ${primitiveStyle.borderColor ?? "transparent"}`,
                  borderRadius: primitiveStyle.borderRadiusPx ?? 4,
                  boxShadow: primitiveStyle.shadow,
                  color: primitiveStyle.color,
                  clipPath: primitiveStyle.clipPath,
                }}
              >
                <span className="primitive-label">{key}</span>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{primitiveStyle.background.slice(0, 18)}</span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "2px 10px",
              background: primaryBtn.background,
              border: `${primaryBtn.borderWidth}px solid ${primaryBtn.borderColor}`,
              borderRadius: primaryBtn.borderRadiusPx,
              boxShadow: primaryBtn.shadow,
              color: primaryBtn.color,
              fontFamily: primaryBtn.fontFamily,
              textTransform: primaryBtn.textTransform,
              letterSpacing: primaryBtn.letterSpacing,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Primary Button Style
          </div>
          <span className="section-inline-note">via getControlStyle()</span>
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-control-style">
        <h2 id="section-control-style" className="theme-lab-section-title ambient-section-title">
          Control Styles
        </h2>
        <div className="control-style-grid">
          {(["input", "select", "table", "modal", "toast"] as const).map((kind) => {
            const controlStyle = getControlStyle(state.themeId, kind);
            return (
              <div
                key={kind}
                style={{
                  padding: "6px 14px",
                  background: controlStyle.background,
                  border: `${controlStyle.borderWidth}px solid ${controlStyle.borderColor}`,
                  borderRadius: controlStyle.borderRadiusPx,
                  boxShadow: controlStyle.shadow,
                  color: controlStyle.color,
                  fontFamily: controlStyle.fontFamily,
                  textTransform: controlStyle.textTransform,
                  letterSpacing: controlStyle.letterSpacing,
                  fontSize: 12,
                  clipPath: controlStyle.clipPath,
                }}
              >
                {kind}
              </div>
            );
          })}
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-token-inspector">
        <h2 id="section-token-inspector" className="theme-lab-section-title ambient-section-title">
          Token Inspector
        </h2>
        <Collapse
          items={[
            {
              key: "token-inspector-panel",
              label: "Theme Spec JSON",
              children: (
                <pre className="theme-token-inspector" style={{ fontFamily: theme.typography.mono }}>
                  {JSON.stringify(theme, null, 2)}
                </pre>
              ),
            },
          ]}
        />
      </section>
    </section>
  );
}
