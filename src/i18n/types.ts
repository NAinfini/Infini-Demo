export type DemoLocale = "en" | "zh" | "ja";
export type I18nNamespace = "toolbar" | "theme-lab" | "api-lab";
export type Dictionary = Record<string, string>;
export type TranslateFn = (key: string) => string;
