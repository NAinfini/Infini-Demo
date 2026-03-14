import { useState } from "react";

import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";
import {
  AnimatedTabs,
  Marquee,
  SelectStepper,
} from "@infini-dev-kit/frontend/components";
import { Accordion, Pagination } from "@mantine/core";

import type { ZoneProps } from "./types";
import styles from "./ZoneNavigation.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

const SELECT_STEPPER_ITEMS = [
  { value: "xs", label: "XS" },
  { value: "sm", label: "SM" },
  { value: "md", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
];

export function ZoneNavigation({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const t = useT("theme-lab");
  const [page, setPage] = useState(3);
  const [stepperValue, setStepperValue] = useState("md");

  const TAB_ITEMS = [
    {
      key: "overview",
      label: t("nav.tabs.overview"),
      content: (
        <div>
          <strong>{t("nav.tabs.overview")}</strong>
          <p>{t("nav.tabs.overviewDesc")}</p>
        </div>
      ),
    },
    {
      key: "tokens",
      label: t("nav.tabs.tokens"),
      content: (
        <div>
          <strong>{t("nav.tabs.tokensTitle")}</strong>
          <p>{t("nav.tabs.tokensDesc")}</p>
        </div>
      ),
    },
    {
      key: "usage",
      label: t("nav.tabs.usage"),
      content: (
        <div>
          <strong>{t("nav.tabs.usageTitle")}</strong>
          <p>{t("nav.tabs.usageDesc")}</p>
        </div>
      ),
    },
  ];

  const ACCORDION_ITEMS = [
    {
      key: "theme",
      title: t("nav.accordion.themeTitle"),
      content: t("nav.accordion.themeContent"),
    },
    {
      key: "motion",
      title: t("nav.accordion.motionTitle"),
      content: t("nav.accordion.motionContent"),
    },
    {
      key: "typography",
      title: t("nav.accordion.typographyTitle"),
      content: t("nav.accordion.typographyContent"),
    },
  ];

  const MARQUEE_KEYWORDS = [
    t("nav.marquee.designSystem"),
    t("nav.marquee.themeTokens"),
    t("nav.marquee.motionContracts"),
    t("nav.marquee.animatedTabs"),
    t("nav.marquee.selectStepper"),
    t("nav.marquee.paginationFlow"),
    t("nav.marquee.accordionPanels"),
    t("nav.marquee.fullMotionMode"),
  ];

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-navigation stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.navigation")}</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-nav-tabs">
        <h2 id="section-nav-tabs" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          AnimatedTabs
        </h2>
        <AnimatedTabs items={TAB_ITEMS} defaultActiveKey="overview" contentTransition="slide" />
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-nav-select-stepper">
        <h2 id="section-nav-select-stepper" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          SelectStepper
        </h2>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <SelectStepper
            items={SELECT_STEPPER_ITEMS}
            value={stepperValue}
            onChange={setStepperValue}
          />
          <span style={{ fontFamily: theme.typography.en.mono, fontSize: 13, opacity: 0.6 }}>
            {t("nav.stepper.selected")}: {stepperValue}
          </span>
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("nav.stepper.caption")}
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-nav-pagination">
        <h2
          id="section-nav-pagination"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine Pagination
        </h2>
        <Pagination value={page} onChange={setPage} total={10} withEdges />
        <div className={sharedStyles["section-caption"]}>{t("nav.pagination.page")} {page} {t("nav.pagination.of")} 10</div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-nav-accordion">
        <h2 id="section-nav-accordion" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Mantine Accordion
        </h2>
        <Accordion defaultValue="theme" variant="separated">
          {ACCORDION_ITEMS.map((item) => (
            <Accordion.Item key={item.key} value={item.key}>
              <Accordion.Control>{item.title}</Accordion.Control>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-nav-marquee">
        <h2 id="section-nav-marquee" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Marquee
        </h2>
        <Marquee speed={30} pauseOnHover gap={32}>
          {MARQUEE_KEYWORDS.map((keyword) => (
            <span
              key={keyword}
              className={styles["marquee-keyword"]}
              style={{
                fontFamily: theme.typography.en.heading,
                color: theme.palette.textMuted,
              }}
            >
              {keyword}
            </span>
          ))}
        </Marquee>
      </section>
    </section>
  );
}
