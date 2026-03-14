import { AnimatePresence, motion as motionUi } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ThemeId } from "@infini-dev-kit/frontend/theme/theme-specs";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@infini-dev-kit/frontend/theme/tokens/mantine-residual.css";
import { DemoThemeProvider, useBridge, useThemeSnapshot } from "./providers/DemoThemeProvider";
import { DemoToolbar, type DemoPage } from "./components/DemoToolbar";
import { LocaleProvider, useT, type DemoLocale } from "./i18n";
import { getPageVariants, useThemeTransition } from "@infini-dev-kit/frontend/hooks";
import { loadThemeFonts, preloadCommonFonts, loadLocaleFonts } from "@infini-dev-kit/frontend/theme/tokens/font-loader";
import { applyLocaleTypography } from "@infini-dev-kit/frontend/theme/tokens/locale-typography";
import { createScrollReactiveVar, startViewTransition } from "@infini-dev-kit/utils";
import { ApiLab, ThemeLab } from "./pages";

const PAGE_ORDER: DemoPage[] = ["theme", "api"];

const LOCALE_STORAGE_KEY = "infini-demo.locale";

function readStoredLocale(): DemoLocale {
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (v === "en" || v === "zh" || v === "ja") return v;
  } catch { /* ignore */ }
  return "en";
}

function AppContent() {
  const bridge = useBridge();
  const { theme, motion, composed: mantine } = useThemeSnapshot();
  const t = useT("toolbar");
  const [activePage, setActivePage] = useState<DemoPage>("theme");
  const [locale, setLocale] = useState<DemoLocale>(readStoredLocale);
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

  const themeChangeInFlight = useRef(false);

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
    if (nextThemeId === theme.id || themeChangeInFlight.current) {
      return;
    }

    themeChangeInFlight.current = true;
    try {
      await loadThemeFonts(nextThemeId);
      if (locale !== "en") {
        await loadLocaleFonts(locale, nextThemeId);
      }

      const applyTheme = () => bridge.setTheme(nextThemeId);
      if (!allowAnimatedThemeTransition) {
        applyTheme();
        return;
      }

      startViewTransition(applyTheme);
    } finally {
      themeChangeInFlight.current = false;
    }
  };

  const handleLocaleChange = async (next: DemoLocale) => {
    setLocale(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    if (next !== "en") {
      await loadLocaleFonts(next, theme.id);
    }
  };

  useEffect(() => {
    applyLocaleTypography(locale, mantine.token);
  }, [locale, mantine.token]);

  return (
    <LocaleProvider locale={locale}>
      <div
        data-theme-id={theme.id}
        className={`app-page-shell app-page-theme-${theme.id} ${motionOff ? "app-motion-off" : ""}`}
        style={{
          minHeight: "100vh",
          "--app-bg": theme.foundation.background,
          "--app-bg-pattern": "var(--infini-bg-pattern, none)",
          "--app-text": theme.palette.text,
          "--app-font": theme.typography[locale]?.body ?? theme.typography.en.body,
        } as React.CSSProperties}
      >
        <DemoToolbar page={activePage} locale={locale} onPageChange={handlePageChange} onThemeChange={handleThemeChange} onLocaleChange={(v) => void handleLocaleChange(v)} />
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {activePage === "theme" ? t("page.theme.aria") : t("page.api.aria")}
        </div>
        {motionOff ? (
          <main className="app-page-content" aria-label={activePage === "theme" ? t("page.theme") : t("page.api")}>{activePage === "theme" ? <ThemeLab /> : <ApiLab />}</main>
        ) : (
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motionUi.main
              key={activePage}
              className="app-page-content"
              aria-label={activePage === "theme" ? t("page.theme") : t("page.api")}
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
    </LocaleProvider>
  );
}

export default function App() {
  // Preload common fonts on mount
  useEffect(() => {
    preloadCommonFonts();
  }, []);

  return (
    <DemoThemeProvider>
      <AppContent />
    </DemoThemeProvider>
  );
}

