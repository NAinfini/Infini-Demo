import { Alert, Button, Drawer, Modal, Skeleton, Tour, notification } from "antd";
import { useRef, useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import type { ZoneProps } from "./types";

export function ZoneFeedback({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const toastButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-feedback stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      {contextHolder}
      <div className="zone-label ambient-label">Feedback</div>

      <section className="theme-lab-section" aria-labelledby="section-alerts">
        <h2 id="section-alerts" className="theme-lab-section-title ambient-section-title">
          Alerts
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Alert message="Success - operation completed" type="success" showIcon />
          <Alert message="Info - something to know" type="info" showIcon />
          <Alert message="Warning - check this" type="warning" showIcon />
          <Alert message="Error - action failed" type="error" showIcon />
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-overlays">
        <h2 id="section-overlays" className="theme-lab-section-title ambient-section-title">
          Overlays
        </h2>
        <div className="overlay-buttons">
          <Button className="demo-control-motion" ref={modalButtonRef} onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Button className="demo-control-motion" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Button
            className="demo-control-motion"
            ref={toastButtonRef}
            onClick={() => api.success({ message: "Success", description: "Operation completed." })}
          >
            Toast Success
          </Button>
          <Button
            className="demo-control-motion"
            onClick={() => api.info({ message: "Info", description: "Something to know." })}
          >
            Toast Info
          </Button>
          <Button
            className="demo-control-motion"
            onClick={() => api.warning({ message: "Warning", description: "Check this." })}
          >
            Toast Warning
          </Button>
          <Button
            className="demo-control-motion"
            danger
            onClick={() => api.error({ message: "Error", description: "Something went wrong." })}
          >
            Toast Error
          </Button>
          <Button className="demo-control-motion" onClick={() => setTourOpen(true)}>
            Start Tour
          </Button>
        </div>
        <div className="section-caption">
          Backdrop: <code style={{ fontFamily: theme.typography.mono }}>{theme.overlays.modalBackdrop}</code> | Tone:{" "}
          {theme.overlays.toastTone}
        </div>
        <Modal title={`Modal - ${theme.name}`} open={modalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)}>
          <p>Modal rendered with the current theme.</p>
          <p style={{ opacity: 0.65, fontSize: 13 }}>Backdrop: {theme.overlays.modalBackdrop}</p>
          <Alert message={`${theme.name} modal content`} type="info" showIcon style={{ marginTop: 12 }} />
        </Modal>
        <Drawer title={`Drawer - ${theme.name}`} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <p>Drawer content with current theme tokens.</p>
          <p style={{ opacity: 0.65, fontSize: 13 }}>Command frame: {theme.overlays.commandPaletteFrame}</p>
        </Drawer>
        <Tour
          open={tourOpen}
          onClose={() => setTourOpen(false)}
          steps={[
            {
              title: "Modal Trigger",
              description: "This button opens a themed modal.",
              target: () => modalButtonRef.current ?? document.body,
            },
            {
              title: "Toast Trigger",
              description: "This button fires a themed notification.",
              target: () => toastButtonRef.current ?? document.body,
            },
          ]}
        />
      </section>

      <section className="theme-lab-section" aria-labelledby="section-loading">
        <h2 id="section-loading" className="theme-lab-section-title ambient-section-title">
          Loading and Empty States
        </h2>
        <Skeleton active paragraph={{ rows: 3 }} />
        <div className="empty-state-box" style={{ border: `${theme.foundation.borderWidth}px dashed ${theme.foundation.borderColor}` }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>[]</div>
          <div style={{ fontWeight: 600 }}>No data found</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters or adding new items.</div>
        </div>
      </section>
    </section>
  );
}
