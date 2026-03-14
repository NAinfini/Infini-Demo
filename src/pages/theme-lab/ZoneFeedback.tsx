import { useThemeSnapshot } from "../../providers/DemoThemeProvider";
import { useT } from "../../i18n";
import { NumberTicker, Result, RingsProgress } from "@infini-dev-kit/frontend/components";
import { Button, RingProgress, Skeleton, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import type { ZoneProps } from "./types";
import styles from "./ZoneFeedback.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

function ring(value: number, color: string) {
  return [{ value, color }];
}

export function ZoneFeedback({ zoneIndex }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const t = useT("theme-lab");

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-feedback stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.feedback")}</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-tooltips">
        <h2
          id="section-tooltips"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine Tooltip
        </h2>
        <div className={styles["tooltip-row"]}>
          <Tooltip label={t("feedback.tooltip.top")} position="top">
            <button type="button" className={styles["demo-btn"]}>
              {t("feedback.tooltip.hoverTop")}
            </button>
          </Tooltip>

          <Tooltip label={t("feedback.tooltip.bottom")} position="bottom">
            <button type="button" className={styles["demo-btn"]}>
              {t("feedback.tooltip.hoverBottom")}
            </button>
          </Tooltip>

          <Tooltip label={t("feedback.tooltip.right")} position="right">
            <button type="button" className={styles["demo-btn"]}>
              {t("feedback.tooltip.hoverRight")}
            </button>
          </Tooltip>
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("feedback.tooltip.caption")}
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-confirm">
        <h2
          id="section-confirm"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine Confirm Modal
        </h2>
        <Button
          color="infini-danger"
          onClick={() =>
            modals.openConfirmModal({
              title: t("feedback.modal.title"),
              children: t("feedback.modal.body"),
              confirmProps: { color: "infini-danger" },
              centered: true,
            })
          }
        >
          {t("feedback.modal.deleteBtn")}
        </Button>
        <div className={sharedStyles["section-caption"]}>
          {t("feedback.modal.backdrop")}{" "}
          <code style={{ fontFamily: theme.typography.en.mono }}>{theme.overlays.modalBackdrop}</code>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-toast">
        <h2
          id="section-toast"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine Notifications
        </h2>
        <div className={styles["tooltip-row"]}>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: t("feedback.toast.successMsg"), color: "infini-success", title: t("feedback.toast.successTitle") })}
          >
            {t("feedback.toast.successBtn")}
          </button>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: t("feedback.toast.errorMsg"), color: "infini-danger", title: t("feedback.toast.errorTitle") })}
          >
            {t("feedback.toast.errorBtn")}
          </button>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: t("feedback.toast.warningMsg"), color: "infini-warning", title: t("feedback.toast.warningTitle") })}
          >
            {t("feedback.toast.warningBtn")}
          </button>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: t("feedback.toast.infoMsg"), color: "infini-primary", title: t("feedback.toast.infoTitle") })}
          >
            {t("feedback.toast.infoBtn")}
          </button>
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("feedback.toast.caption")}
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-rings">
        <h2
          id="section-rings"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine RingProgress
        </h2>
        <div className={styles["ring-grid"]}>
          <div className={styles["ring-cell"]}>
            <RingProgress size={72} thickness={6} sections={ring(25, "infini-primary")} />
            <span className={styles["ring-label"]}>{t("feedback.ring.storage")}</span>
          </div>
          <div className={styles["ring-cell"]}>
            <RingProgress size={88} thickness={7} sections={ring(65, "infini-success")} />
            <span className={styles["ring-label"]}>{t("feedback.ring.uptime")}</span>
          </div>
          <div className={styles["ring-cell"]}>
            <RingProgress size={104} thickness={8} sections={ring(92, "infini-warning")} />
            <span className={styles["ring-label"]}>{t("feedback.ring.cpu")}</span>
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-rings-progress">
        <h2
          id="section-rings-progress"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          RingsProgress (Infini)
        </h2>
        <div className={styles["ring-grid"]}>
          <div className={styles["ring-cell"]}>
            <RingsProgress
              size={120}
              rings={[
                { value: 75, color: theme.palette.primary, tooltip: t("feedback.ring.cpu") },
                { value: 55, color: theme.palette.accent, tooltip: t("feedback.ring.memory") },
                { value: 90, color: theme.palette.success, tooltip: t("feedback.ring.disk") },
              ]}
            />
          </div>
          <div className={styles["ring-cell"]}>
            <RingsProgress
              size={100}
              thickness={5}
              rings={[
                { value: 42, color: theme.palette.danger, tooltip: t("feedback.ring.errors") },
                { value: 88, color: theme.palette.warning, tooltip: t("feedback.ring.latency") },
              ]}
            />
          </div>
        </div>
        <div className={sharedStyles["section-caption"]}>
          {t("feedback.rings.caption")}
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-ticker">
        <h2
          id="section-ticker"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          NumberTicker
        </h2>
        <div className={styles["ticker-grid"]}>
          <div className={styles["ticker-cell"]}>
            <NumberTicker value={1234} duration={2} style={{ fontSize: 28 }} />
            <span className={styles["ticker-label"]}>{t("feedback.ticker.activeUsers")}</span>
          </div>
          <div className={styles["ticker-cell"]}>
            <NumberTicker
              value={99.9}
              decimals={1}
              suffix="%"
              duration={1.8}
              style={{ fontSize: 28 }}
            />
            <span className={styles["ticker-label"]}>{t("feedback.ticker.accuracy")}</span>
          </div>
          <div className={styles["ticker-cell"]}>
            <NumberTicker
              value={42000}
              prefix="$"
              duration={2.2}
              style={{ fontSize: 28 }}
            />
            <span className={styles["ticker-label"]}>{t("feedback.ticker.revenue")}</span>
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-skeleton">
        <h2
          id="section-skeleton"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine Skeleton
        </h2>
        <div className={styles["skeleton-grid"]}>
          <div>
            <div className={styles["skeleton-sub-label"]}>{t("feedback.skeleton.text")}</div>
            <Skeleton height={12} mt={8} />
            <Skeleton height={12} mt={8} />
            <Skeleton height={12} mt={8} width="70%" />
          </div>
          <div>
            <div className={styles["skeleton-sub-label"]}>{t("feedback.skeleton.card")}</div>
            <Skeleton height={96} mt={8} radius="md" />
          </div>
          <div>
            <div className={styles["skeleton-sub-label"]}>{t("feedback.skeleton.avatar")}</div>
            <Skeleton height={56} width={56} mt={8} circle />
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-result">
        <h2
          id="section-result"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Result
        </h2>
        <div className={styles["result-grid"]}>
          <div className={styles["result-card"]}>
            <Result
              status="success"
              title={t("feedback.result.successTitle")}
              subTitle={t("feedback.result.successSub")}
            />
          </div>
          <div className={styles["result-card"]}>
            <Result
              status="error"
              title={t("feedback.result.errorTitle")}
              subTitle={t("feedback.result.errorSub")}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
