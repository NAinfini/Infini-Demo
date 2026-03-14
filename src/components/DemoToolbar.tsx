import { Select, SegmentedControl } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import type { MotionMode } from "@infini-dev-kit/utils";
import type { ThemeId } from "@infini-dev-kit/frontend/theme/theme-specs";
import { useBridge, useThemeSnapshot } from "../providers/DemoThemeProvider";
import { useT, type DemoLocale } from "../i18n";
import "./DemoToolbar.css";

export type DemoPage = "theme" | "api";

export interface DemoToolbarProps {
  page: DemoPage;
  locale: DemoLocale;
  onPageChange: (next: DemoPage) => void;
  onThemeChange: (next: ThemeId) => void;
  onLocaleChange: (next: DemoLocale) => void;
}

function getToolbarFxClass(themeId: ThemeId): string {
  if (themeId === "chibi") return "toolbar-bounce";
  if (themeId === "cyberpunk") return "toolbar-glitch";
  if (themeId === "neu-brutalism") return "toolbar-slam";
  if (themeId === "black-gold" || themeId === "red-gold") return "toolbar-glow";
  return "";
}

export function DemoToolbar({ page, locale, onPageChange, onThemeChange, onLocaleChange }: DemoToolbarProps) {
  const bridge = useBridge();
  const { state, theme } = useThemeSnapshot();
  const t = useT("toolbar");
  const [toolbarFxClass, setToolbarFxClass] = useState("");
  const previousThemeId = useRef(state.themeId);
  const animationKickoffTimer = useRef<number | null>(null);

  const THEMES: { value: ThemeId; label: string }[] = [
    { value: "default", label: t("theme.default") },
    { value: "chibi", label: t("theme.chibi") },
    { value: "cyberpunk", label: t("theme.cyberpunk") },
    { value: "neu-brutalism", label: t("theme.neuBrutalism") },
    { value: "black-gold", label: t("theme.blackGold") },
    { value: "red-gold", label: t("theme.redGold") },
  ];

  const MOTION_OPTIONS: { value: MotionMode; label: string }[] = [
    { value: "full", label: t("motion.full") },
    { value: "reduced", label: t("motion.reduced") },
    { value: "minimum", label: t("motion.minimum") },
    { value: "off", label: t("motion.off") },
  ];

  const LOCALE_OPTIONS: { value: DemoLocale; label: string }[] = [
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
  ];

  useEffect(() => {
    if (previousThemeId.current === state.themeId) {
      return;
    }

    previousThemeId.current = state.themeId;

    const nextFxClass = getToolbarFxClass(state.themeId);
    if (!nextFxClass) {
      setToolbarFxClass("");
      return;
    }

    setToolbarFxClass("");
    if (animationKickoffTimer.current !== null) {
      window.clearTimeout(animationKickoffTimer.current);
    }

    animationKickoffTimer.current = window.setTimeout(() => {
      setToolbarFxClass(nextFxClass);
      animationKickoffTimer.current = null;
    }, 0);
  }, [state.themeId]);

  useEffect(
    () => () => {
      if (animationKickoffTimer.current !== null) {
        window.clearTimeout(animationKickoffTimer.current);
      }
    },
    [],
  );

  return (
    <header
      className={`toolbar ${toolbarFxClass}`.trim()}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          setToolbarFxClass("");
        }
      }}
    >
      <div className="toolbar-left">
        <div className="toolbar-mark" aria-hidden="true" />
        <div className="toolbar-brand">
          <span className="toolbar-title">{t("title")}</span>
          <span className="toolbar-subtitle">{theme.name}</span>
        </div>
      </div>

      <div className="toolbar-center">
        <SegmentedControl
          className="toolbar-segmented"
          value={page}
          onChange={(next) => onPageChange(next as DemoPage)}
          data={[
            { value: "theme", label: t("page.theme") },
            { value: "api", label: t("page.api") },
          ]}
          aria-label={t("page.select")}
          transitionDuration={160}
        />
      </div>

      <div className="toolbar-right">
        <div className="toolbar-group">
          <span className="toolbar-label">{t("label.theme")}</span>
          <Select
            className="toolbar-select"
            value={state.themeId}
            onChange={(v) => {
              if (v) {
                onThemeChange(v as ThemeId);
              }
            }}
            data={THEMES}
            w={162}
            allowDeselect={false}
            aria-label={t("select.theme")}
          />
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">{t("label.motion")}</span>
          <SegmentedControl
            className="toolbar-segmented toolbar-segmented-motion"
            value={state.motionMode}
            onChange={(v) => bridge.setMotionMode(v as MotionMode)}
            data={MOTION_OPTIONS}
            aria-label={t("motion.aria")}
            transitionDuration={160}
          />
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">{t("label.language")}</span>
          <Select
            className="toolbar-select"
            value={locale}
            onChange={(v) => {
              if (v) {
                onLocaleChange(v as DemoLocale);
              }
            }}
            data={LOCALE_OPTIONS}
            w={120}
            allowDeselect={false}
            aria-label={t("select.language")}
          />
        </div>
      </div>
    </header>
  );
}
