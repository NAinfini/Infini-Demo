import type { CSSProperties } from "react";

export interface ZoneProps {
  zoneIndex: number;
  revealed: boolean;
  setRef: (node: HTMLElement | null) => void;
  animationStyle: CSSProperties;
}
