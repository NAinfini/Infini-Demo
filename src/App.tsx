import { useEffect, useState, type CSSProperties } from "react";
import type { ThemeId } from "@infini-dev-kit/frontend/theme-specs";

import { KitApp, ThemeToolbar, useBridge, useThemeSnapshot, type DemoPage } from "@infini-dev-kit/frontend/react";
import { createScrollReactiveVar, startViewTransition } from "@infini-dev-kit/utils";
import { ApiLab, ThemeLab } from "./pages";

function AppContent() {
  const bridge = useBridge();
  const { theme, motion } = useThemeSnapshot();
  const [activePage, setActivePage] = useState<DemoPage>("theme");
  const [renderedPage, setRenderedPage] = useState<DemoPage>("theme");
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");

  const motionOff = motion.effectiveMode === "off";
  const allowAnimatedThemeTransition = motion.effectiveMode === "full";

  useEffect(() => {
    const root = document.documentElement;
    const hasScrollReactiveTheme = theme.id === "neu-brutalism" || theme.id === "cyberpunk";

    if (!hasScrollReactiveTheme || motion.effectiveMode !== "full") {
      root.style.removeProperty("--scroll-y");
      return;
    }

    return createScrollReactiveVar();
  }, [motion.effectiveMode, theme.id]);

  useEffect(() => {
    if (phase !== "exiting" || motionOff) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRenderedPage(activePage);
      setPhase("entering");
    }, Math.max(40, motion.contracts.exit.durationMs));

    return () => window.clearTimeout(timer);
  }, [activePage, motion.contracts.exit.durationMs, motionOff, phase]);

  useEffect(() => {
    if (phase !== "entering" || motionOff) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("idle");
    }, Math.max(60, motion.contracts.enter.durationMs));

    return () => window.clearTimeout(timer);
  }, [motion.contracts.enter.durationMs, motionOff, phase]);

  const handlePageChange = (next: DemoPage) => {
    if (next === activePage && phase === "idle") {
      return;
    }

    setActivePage(next);

    if (motionOff) {
      setRenderedPage(next);
      setPhase("idle");
      return;
    }

    setPhase("exiting");
  };

  const handleThemeChange = (nextThemeId: ThemeId) => {
    if (nextThemeId === theme.id) {
      return;
    }

    const applyTheme = () => bridge.setTheme(nextThemeId);
    if (!allowAnimatedThemeTransition) {
      applyTheme();
      return;
    }

    startViewTransition(applyTheme);
  };

  const transitionVars: CSSProperties = {
    "--page-enter-ms": `${motion.contracts.enter.durationMs}ms`,
    "--page-exit-ms": `${motion.contracts.exit.durationMs}ms`,
    "--page-easing": motion.contracts.enter.easing,
  } as CSSProperties;

  return (
    <div
      data-theme-id={theme.id}
      className={`app-page-shell app-page-theme-${theme.id} app-page-${phase} ${motionOff ? "app-motion-off" : ""}`}
      style={{
        minHeight: "100vh",
        backgroundColor: theme.foundation.background,
        backgroundImage: "var(--infini-bg-pattern, none)",
        color: theme.palette.text,
        fontFamily: theme.typography.body,
        ...transitionVars,
      }}
    >
      <ThemeToolbar page={activePage} onPageChange={handlePageChange} onThemeChange={handleThemeChange} />
      <main className="app-page-content">{renderedPage === "theme" ? <ThemeLab /> : <ApiLab />}</main>
    </div>
  );
}

export default function App() {
  return (
    <KitApp>
      <AppContent />
    </KitApp>
  );
}
