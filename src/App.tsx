import { AnimatePresence, motion as motionUi } from "motion/react";
import { useEffect, useState } from "react";
import type { ThemeId } from "@infini-dev-kit/frontend/theme/theme-specs";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@infini-dev-kit/frontend/theme/mantine/mantine-residual.css";
import { KitApp, ThemeToolbar, useBridge, useThemeSnapshot, type DemoPage } from "@infini-dev-kit/frontend/provider";
import { getPageVariants, useThemeTransition } from "@infini-dev-kit/frontend/hooks";
import { loadThemeFonts, preloadCommonFonts } from "@infini-dev-kit/frontend/theme/mantine/font-loader";
import { createScrollReactiveVar, startViewTransition } from "@infini-dev-kit/utils";
import { ApiLab, ThemeLab } from "./pages";

const PAGE_ORDER: DemoPage[] = ["theme", "api"];

function AppContent() {
  const bridge = useBridge();
  const { theme, motion } = useThemeSnapshot();
  const [activePage, setActivePage] = useState<DemoPage>("theme");
  const [direction, setDirection] = useState(1);
  const pageTransition = useThemeTransition("enter");

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
    loadThemeFonts(theme.id);
  }, [theme.id]);

  const handlePageChange = (next: DemoPage) => {
    if (next === activePage) {
      return;
    }

    const currentIndex = PAGE_ORDER.indexOf(activePage);
    const nextIndex = PAGE_ORDER.indexOf(next);
    setDirection(nextIndex >= currentIndex ? 1 : -1);

    setActivePage(next);
  };

  const handleThemeChange = async (nextThemeId: ThemeId) => {
    if (nextThemeId === theme.id) {
      return;
    }

    // Load theme fonts dynamically
    await loadThemeFonts(nextThemeId);

    const applyTheme = () => bridge.setTheme(nextThemeId);
    if (!allowAnimatedThemeTransition) {
      applyTheme();
      return;
    }

    startViewTransition(applyTheme);
  };

  return (
    <div
      data-theme-id={theme.id}
      className={`app-page-shell app-page-theme-${theme.id} ${motionOff ? "app-motion-off" : ""}`}
      style={{
        minHeight: "100vh",
        backgroundColor: theme.foundation.background,
        backgroundImage: "var(--infini-bg-pattern, none)",
        color: theme.palette.text,
        fontFamily: theme.typography.en.body,
      }}
    >
      <ThemeToolbar page={activePage} onPageChange={handlePageChange} onThemeChange={handleThemeChange} />
      {motionOff ? (
        <main className="app-page-content">{activePage === "theme" ? <ThemeLab /> : <ApiLab />}</main>
      ) : (
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motionUi.main
            key={activePage}
            className="app-page-content"
            custom={direction}
            variants={getPageVariants(theme.id)}
            initial="enter"
            animate="active"
            exit="exit"
            transition={pageTransition}
          >
            {activePage === "theme" ? <ThemeLab /> : <ApiLab />}
          </motionUi.main>
        </AnimatePresence>
      )}
    </div>
  );
}

export default function App() {
  // Preload common fonts on mount
  useEffect(() => {
    preloadCommonFonts();
  }, []);

  return (
    <KitApp>
      <AppContent />
    </KitApp>
  );
}

