import { useState } from "react";

import {
  CrystalPrismButton,
  DepthButton,
  DepthToggle,
  LiquidFillButton,
  ProgressButton,
  SlideRevealButton,
  SocialButton,
  SoftClayButton,
} from "@infini-dev-kit/frontend/components";
import { useT } from "../../i18n";

import type { ZoneProps } from "./types";
import styles from "./ZoneButtons.module.css";
import sharedStyles from "./shared.module.css";
import layoutStyles from "./ThemeLab.module.css";

function fakeAsync(ms = 1800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ZoneButtons({ zoneIndex }: ZoneProps) {
  const t = useT("theme-lab");
  const [progressLoading, setProgressLoading] = useState(false);
  const [readyPressed, setReadyPressed] = useState(true);
  const [pinPressed, setPinPressed] = useState(false);
  const [infoPressed, setInfoPressed] = useState(false);
  const [warningPressed, setWarningPressed] = useState(false);

  const handleProgressPress = () => fakeAsync(2000);
  const handleProgressSpinnerPress = () => fakeAsync(1600);

  return (
    <section
      data-zone-index={zoneIndex}
      className={`${layoutStyles.zone} ${layoutStyles["theme-zone"]} zone-buttons stagger-in`}
    >
      <div className={`${layoutStyles["zone-label"]} ambient-label`}>{t("zone.buttons")}</div>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-depth-btn">
        <h2 id="section-depth-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          DepthButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          {t("buttons.depth.caption")}
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.primary")}</span>
            <div className={styles["button-row"]}>
              <DepthButton type="primary">{t("buttons.btn.launch")}</DepthButton>
              <DepthButton type="primary" before="🚀">{t("buttons.btn.withIcon")}</DepthButton>
              <DepthButton type="primary" disabled>{t("buttons.btn.disabled")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.secondary")}</span>
            <div className={styles["button-row"]}>
              <DepthButton type="secondary">{t("buttons.btn.default")}</DepthButton>
              <DepthButton type="secondary" after="→">{t("buttons.btn.navigate")}</DepthButton>
              <DepthButton type="secondary" disabled>{t("buttons.btn.disabled")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.danger")}</span>
            <div className={styles["button-row"]}>
              <DepthButton type="danger">{t("buttons.btn.delete")}</DepthButton>
              <DepthButton type="danger" before="⚠️">{t("buttons.btn.warning")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.success")}</span>
            <div className={styles["button-row"]}>
              <DepthButton type="success">{t("buttons.btn.confirm")}</DepthButton>
              <DepthButton type="success" before="✓">{t("buttons.btn.approve")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.warning")}</span>
            <div className={styles["button-row"]}>
              <DepthButton type="warning">{t("buttons.btn.caution")}</DepthButton>
              <DepthButton type="warning" before="⚡">{t("buttons.btn.alert")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.info")}</span>
            <div className={styles["button-row"]}>
              <DepthButton type="info">{t("buttons.btn.info")}</DepthButton>
              <DepthButton type="info" before="ℹ️">{t("buttons.btn.details")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.sizes")}</span>
            <div className={styles["button-row"]}>
              <DepthButton size="sm">{t("buttons.btn.small")}</DepthButton>
              <DepthButton size="md">{t("buttons.btn.medium")}</DepthButton>
              <DepthButton size="lg">{t("buttons.btn.large")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.tiltOptIn")}</span>
            <div className={styles["button-row"]}>
              <DepthButton>{t("buttons.btn.default")}</DepthButton>
              <DepthButton hoverTilt>{t("buttons.btn.hoverTilt")}</DepthButton>
              <DepthButton ripple={false}>{t("buttons.btn.noRipple")}</DepthButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.variant.depthToggle")}</span>
            <div className={styles["button-row"]}>
              <DepthToggle pressed={readyPressed} onToggle={setReadyPressed} type="success">
                {readyPressed ? t("buttons.toggle.ready") : t("buttons.toggle.standby")}
              </DepthToggle>
              <DepthToggle
                pressed={pinPressed}
                onToggle={setPinPressed}
                type="secondary"
                iconOnly
                aria-label={pinPressed ? t("buttons.toggle.unpin") : t("buttons.toggle.pin")}
                title={pinPressed ? t("buttons.toggle.pinned") : t("buttons.toggle.pinLabel")}
              >
                📌
              </DepthToggle>
              <DepthToggle pressed={infoPressed} onToggle={setInfoPressed} type="info">
                {t("buttons.toggle.info")}
              </DepthToggle>
              <DepthToggle pressed={warningPressed} onToggle={setWarningPressed} type="warning">
                {t("buttons.toggle.warning")}
              </DepthToggle>
            </div>
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-progress-btn">
        <h2 id="section-progress-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          ProgressButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          {t("buttons.progress.caption")}
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.progress.bar")}</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={handleProgressPress}
                loadingLabel={t("buttons.progress.uploading")}
                successLabel={t("buttons.progress.uploaded")}
                errorLabel={t("buttons.progress.uploadFailed")}
                indicator="bar"
              >
                {t("buttons.progress.uploadFile")}
              </ProgressButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.progress.spinner")}</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={handleProgressSpinnerPress}
                loadingLabel={t("buttons.progress.fetching")}
                successLabel={t("buttons.progress.done")}
                indicator="spinner"
              >
                {t("buttons.progress.fetchData")}
              </ProgressButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.progress.errorDemo")}</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={() =>
                  new Promise<void>((_, reject) =>
                    setTimeout(() => reject(new Error(t("buttons.progress.networkTimeout"))), 1200),
                  )
                }
                successLabel={t("buttons.progress.ok")}
                errorLabel={t("buttons.progress.networkTimeout")}
                indicator="bar"
              >
                {t("buttons.progress.triggerError")}
              </ProgressButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.progress.fakePress")}</span>
            <div className={styles["button-row"]}>
              <ProgressButton
                onPress={() => fakeAsync(1400)}
                fakePress={progressLoading}
                successLabel={t("buttons.progress.done")}
                indicator="spinner"
              >
                {t("buttons.progress.autoTrigger")}
              </ProgressButton>
              <button
                type="button"
                className={styles["demo-trigger"]}
                onClick={() => setProgressLoading((value) => !value)}
              >
                {progressLoading ? t("buttons.progress.reset") : t("buttons.progress.trigger")}
              </button>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.progress.disabled")}</span>
            <div className={styles["button-row"]}>
              <ProgressButton onPress={handleProgressPress} disabled>
                {t("buttons.progress.disabled")}
              </ProgressButton>
            </div>
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-social-btn">
        <h2 id="section-social-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          SocialButton
        </h2>
        <p className={sharedStyles["section-caption"]}>
          {t("buttons.social.caption")}
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.social.githubDiscord")}</span>
            <div className={styles["button-row"]}>
              <SocialButton platform="github" href="https://github.com" label="GitHub" />
              <SocialButton platform="discord" href="https://discord.com" label="Discord" />
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.social.morePlatforms")}</span>
            <div className={styles["button-row"]}>
              <SocialButton platform="twitter" href="https://x.com" />
              <SocialButton platform="linkedin" href="https://linkedin.com" />
              <SocialButton platform="reddit" href="https://reddit.com" />
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.social.iconHiddenDisabled")}</span>
            <div className={styles["button-row"]}>
              <SocialButton platform="github" hideIcon href="https://github.com" label={t("buttons.social.githubNoIcon")} />
              <SocialButton platform="discord" disabled label={t("buttons.social.discordDisabled")} />
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.social.sharePopup")}</span>
            <div className={styles["button-row"]}>
              <SocialButton
                platform="twitter"
                label={t("buttons.social.shareOnX")}
                sharer={{ url: "https://infini-dev-kit.dev", message: t("buttons.social.shareMessage") }}
              />
              <SocialButton
                platform="facebook"
                sharer={{ url: "https://infini-dev-kit.dev", message: "Infini Dev Kit" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={sharedStyles["theme-lab-section"]} aria-labelledby="section-stylistic-btn">
        <h2 id="section-stylistic-btn" className={`${sharedStyles["theme-lab-section-title"]} ambient-section-title`}>
          Stylistic Buttons
        </h2>
        <p className={sharedStyles["section-caption"]}>
          {t("buttons.stylistic.caption")}
        </p>
        <div className={styles["button-grid"]}>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.softClay.label")}</span>
            <div className={styles["button-row"]}>
              <SoftClayButton>{t("buttons.softClay.default")}</SoftClayButton>
              <SoftClayButton color="var(--infini-color-accent)">{t("buttons.softClay.custom")}</SoftClayButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.liquidFill.label")}</span>
            <div className={styles["button-row"]}>
              <LiquidFillButton>{t("buttons.liquidFill.default")}</LiquidFillButton>
              <LiquidFillButton fillColor="var(--infini-color-accent)">{t("buttons.liquidFill.custom")}</LiquidFillButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.crystalPrism.label")}</span>
            <div className={styles["button-row"]}>
              <CrystalPrismButton>{t("buttons.crystalPrism.default")}</CrystalPrismButton>
            </div>
          </div>
          <div className={styles["button-card"]}>
            <span className={styles["variant-label"]}>{t("buttons.slideReveal.label")}</span>
            <div className={styles["button-row"]}>
              <SlideRevealButton icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>}>
                {t("buttons.slideReveal.default")}
              </SlideRevealButton>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
