import { MantineProvider, type CSSVariablesResolver } from "@mantine/core";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { createBrowserLocalStorageAdapter } from "@infini-dev-kit/utils/storage";
import {
  createThemeProviderBridge,
  type ThemeProviderBridge,
  type ThemeProviderSnapshot,
} from "@infini-dev-kit/frontend/theme/theme-provider-bridge";
import { loadThemeFonts } from "@infini-dev-kit/frontend/theme/tokens/font-loader";
import { composeMantineTheme, type MantineThemeConfig } from "../theme/mantine-adapter";

const BridgeContext = createContext<ThemeProviderBridge<MantineThemeConfig> | null>(null);
const SnapshotContext = createContext<ThemeProviderSnapshot<MantineThemeConfig> | null>(null);

const bridge = createThemeProviderBridge<MantineThemeConfig>({
  storage: createBrowserLocalStorageAdapter(),
  prefersReducedMotion: () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  themeComposer: composeMantineTheme,
});

export function useBridge(): ThemeProviderBridge<MantineThemeConfig> {
  const ctx = useContext(BridgeContext);
  if (!ctx) {
    throw new Error("useBridge must be used inside DemoThemeProvider");
  }
  return ctx;
}

export function useThemeSnapshot(): ThemeProviderSnapshot<MantineThemeConfig> {
  const ctx = useContext(SnapshotContext);
  if (!ctx) {
    throw new Error("useThemeSnapshot must be used inside DemoThemeProvider");
  }
  return ctx;
}

export function DemoThemeProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState(() => bridge.getSnapshot());
  const previousScopeClass = useRef<string | null>(null);

  useEffect(() => bridge.subscribe(setSnapshot), []);

  useEffect(() => {
    void loadThemeFonts(snapshot.state.themeId);
  }, [snapshot.state.themeId]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = previousScopeClass.current;

    if (previous && previous !== snapshot.scope.className) {
      root.classList.remove(previous);
    }

    root.classList.add(snapshot.scope.className);
    previousScopeClass.current = snapshot.scope.className;

    root.dataset.themeId = snapshot.state.themeId;
    root.dataset.motionMode = snapshot.motion.effectiveMode;
    if (document.body) {
      document.body.dataset.themeId = snapshot.state.themeId;
    }

    return () => {
      if (previousScopeClass.current) {
        root.classList.remove(previousScopeClass.current);
      }
    };
  }, [snapshot.scope.className, snapshot.state.themeId, snapshot.motion.effectiveMode]);

  const cssVariablesResolver = useMemo<CSSVariablesResolver>(
    () => () => ({
      variables: snapshot.scope.variables.variables,
      light: {},
      dark: {},
    }),
    [snapshot.scope.variables.variables],
  );

  return (
    <BridgeContext.Provider value={bridge}>
      <SnapshotContext.Provider value={snapshot}>
        <MantineProvider
          key={`${snapshot.state.themeId}:${snapshot.composed.colorScheme}`}
          theme={snapshot.composed.theme}
          cssVariablesSelector={snapshot.scope.variables.selector}
          cssVariablesResolver={cssVariablesResolver}
          forceColorScheme={snapshot.composed.colorScheme}
          withCssVariables
          withGlobalClasses
        >
          {children}
        </MantineProvider>
      </SnapshotContext.Provider>
    </BridgeContext.Provider>
  );
}
