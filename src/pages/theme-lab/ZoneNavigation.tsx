import { useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
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

const TAB_ITEMS = [
  {
    key: "overview",
    label: "Overview",
    content: (
      <div>
        <strong>Overview</strong>
        <p>High-level summary of the current theme palette, radius, and shadow depth.</p>
      </div>
    ),
  },
  {
    key: "tokens",
    label: "Tokens",
    content: (
      <div>
        <strong>Design Tokens</strong>
        <p>Raw CSS variables that drive every visual property — color, motion, and spacing.</p>
      </div>
    ),
  },
  {
    key: "usage",
    label: "Usage",
    content: (
      <div>
        <strong>Usage Notes</strong>
        <p>Guidance on applying the Infini theme system to your own components and pages.</p>
      </div>
    ),
  },
];

const SELECT_STEPPER_ITEMS = [
  { value: "xs", label: "XS" },
  { value: "sm", label: "SM" },
  { value: "md", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
];

const ACCORDION_ITEMS = [
  {
    key: "theme",
    title: "Theme Foundations",
    content:
      "Core design foundations — color palette, radius scale, border styles, and shadow depth — that form the visual identity of every component.",
  },
  {
    key: "motion",
    title: "Motion Contracts",
    content:
      "Named timing and easing values (enter, exit, hover, press, overlay) that keep all animated components temporally consistent.",
  },
  {
    key: "typography",
    title: "Typography Scale",
    content:
      "Display and mono font stacks with matched weight and size scales. All heading and body text derives from these root tokens.",
  },
];

const MARQUEE_KEYWORDS = [
  "Infini Design System",
  "Theme Tokens",
  "Motion Contracts",
  "Animated Tabs",
  "Select Stepper",
  "Pagination Flow",
  "Accordion Panels",
  "Full Motion Mode",
];

export function ZoneNavigation({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const [page, setPage] = useState(3);
  const [stepperValue, setStepperValue] = useState("md");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-navigation stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Navigation</div>

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
            Selected: {stepperValue}
          </span>
        </div>
        <div className={sharedStyles["section-caption"]}>
          Increment/decrement picker with keyboard support (Arrow keys). Loops through items.
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
        <div className={sharedStyles["section-caption"]}>Page {page} of 10</div>
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
