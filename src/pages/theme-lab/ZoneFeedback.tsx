import { useThemeSnapshot } from "@infini-dev-kit/frontend/provider";
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

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-feedback stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>Feedback &amp; Data</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-tooltips">
        <h2
          id="section-tooltips"
          className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}
        >
          Mantine Tooltip
        </h2>
        <div className={styles["tooltip-row"]}>
          <Tooltip label="Appears above" position="top">
            <button type="button" className={styles["demo-btn"]}>
              Hover me (top)
            </button>
          </Tooltip>

          <Tooltip label="Appears below" position="bottom">
            <button type="button" className={styles["demo-btn"]}>
              Hover me (bottom)
            </button>
          </Tooltip>

          <Tooltip label="Appears to the right" position="right">
            <button type="button" className={styles["demo-btn"]}>
              Hover me (right)
            </button>
          </Tooltip>
        </div>
        <div className={sharedStyles["section-caption"]}>
          Mantine Tooltip positions: top / bottom / right.
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
              title: "Delete this record?",
              children: "This action cannot be undone. The record will be permanently removed from the system.",
              confirmProps: { color: "infini-danger" },
              centered: true,
            })
          }
        >
          Delete record
        </Button>
        <div className={sharedStyles["section-caption"]}>
          Backdrop blur:{" "}
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
            onClick={() => notifications.show({ message: "Action completed.", color: "infini-success", title: "Success" })}
          >
            Success toast
          </button>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: "Something went wrong.", color: "infini-danger", title: "Error" })}
          >
            Error toast
          </button>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: "Check your connection.", color: "infini-warning", title: "Warning" })}
          >
            Warning toast
          </button>
          <button
            type="button"
            className={styles["demo-btn"]}
            onClick={() => notifications.show({ message: "New version available.", color: "infini-primary", title: "Update" })}
          >
            Info toast
          </button>
        </div>
        <div className={sharedStyles["section-caption"]}>
          Uses Mantine Notifications via InfiniProvider. Theme-aware colors.
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
            <span className={styles["ring-label"]}>Storage</span>
          </div>
          <div className={styles["ring-cell"]}>
            <RingProgress size={88} thickness={7} sections={ring(65, "infini-success")} />
            <span className={styles["ring-label"]}>Uptime</span>
          </div>
          <div className={styles["ring-cell"]}>
            <RingProgress size={104} thickness={8} sections={ring(92, "infini-warning")} />
            <span className={styles["ring-label"]}>CPU</span>
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
                { value: 75, color: theme.palette.primary, tooltip: "CPU" },
                { value: 55, color: theme.palette.accent, tooltip: "Memory" },
                { value: 90, color: theme.palette.success, tooltip: "Disk" },
              ]}
            />
          </div>
          <div className={styles["ring-cell"]}>
            <RingsProgress
              size={100}
              thickness={5}
              rings={[
                { value: 42, color: theme.palette.danger, tooltip: "Errors" },
                { value: 88, color: theme.palette.warning, tooltip: "Latency" },
              ]}
            />
          </div>
        </div>
        <div className={sharedStyles["section-caption"]}>
          Concentric animated rings — each section gets its own ring. Different from Mantine's single-ring RingProgress.
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
            <span className={styles["ticker-label"]}>Active Users</span>
          </div>
          <div className={styles["ticker-cell"]}>
            <NumberTicker
              value={99.9}
              decimals={1}
              suffix="%"
              duration={1.8}
              style={{ fontSize: 28 }}
            />
            <span className={styles["ticker-label"]}>Accuracy</span>
          </div>
          <div className={styles["ticker-cell"]}>
            <NumberTicker
              value={42000}
              prefix="$"
              duration={2.2}
              style={{ fontSize: 28 }}
            />
            <span className={styles["ticker-label"]}>Revenue</span>
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
            <div className={styles["skeleton-sub-label"]}>Text</div>
            <Skeleton height={12} mt={8} />
            <Skeleton height={12} mt={8} />
            <Skeleton height={12} mt={8} width="70%" />
          </div>
          <div>
            <div className={styles["skeleton-sub-label"]}>Card</div>
            <Skeleton height={96} mt={8} radius="md" />
          </div>
          <div>
            <div className={styles["skeleton-sub-label"]}>Avatar</div>
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
              title="Payment confirmed"
              subTitle="Your transaction has been processed successfully."
            />
          </div>
          <div className={styles["result-card"]}>
            <Result
              status="error"
              title="Connection failed"
              subTitle="Unable to reach the server. Please check your network and try again."
            />
          </div>
        </div>
      </section>
    </section>
  );
}
