import { createContext, useCallback, useContext } from "react";
import type { DemoLocale, Dictionary, I18nNamespace, TranslateFn } from "./types";

import enToolbar from "./en/toolbar.json";
import enThemeLab from "./en/theme-lab.json";
import enApiLab from "./en/api-lab.json";
import zhToolbar from "./zh/toolbar.json";
import zhThemeLab from "./zh/theme-lab.json";
import zhApiLab from "./zh/api-lab.json";

const dictionaries: Record<DemoLocale, Record<I18nNamespace, Dictionary>> = {
  en: { toolbar: enToolbar, "theme-lab": enThemeLab, "api-lab": enApiLab },
  zh: { toolbar: zhToolbar, "theme-lab": zhThemeLab, "api-lab": zhApiLab },
  ja: { toolbar: enToolbar, "theme-lab": enThemeLab, "api-lab": enApiLab },
};

const LocaleContext = createContext<DemoLocale>("en");

export function LocaleProvider({ locale, children }: { locale: DemoLocale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): DemoLocale {
  return useContext(LocaleContext);
}

export function useT(ns: I18nNamespace): TranslateFn {
  const locale = useContext(LocaleContext);
  return useCallback(
    (key: string) => dictionaries[locale]?.[ns]?.[key] ?? dictionaries.en[ns]?.[key] ?? key,
    [locale, ns],
  );
}
