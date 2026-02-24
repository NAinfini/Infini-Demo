import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import type { ZoneProps } from "./types";

export function ZoneHero({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { theme } = useThemeSnapshot();

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-hero stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <header className="theme-lab-header">
        <div className="theme-lab-header-top">
          <h1 className="theme-lab-header-name ambient-hero-title" data-text={theme.name}>
            {theme.name}
          </h1>
          <p className="theme-lab-header-desc">{theme.description}</p>
        </div>
        <div className="theme-lab-header-sigs">
          {theme.signatures.map((signature, index) => (
            <span
              key={signature}
              className="theme-lab-sig ambient-signature"
              style={{ color: theme.palette.textMuted, animationDelay: `${index * 140}ms` }}
            >
              {signature}
            </span>
          ))}
        </div>
      </header>
    </section>
  );
}
