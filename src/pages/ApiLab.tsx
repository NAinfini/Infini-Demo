import { Alert, Group, Text, TextInput } from "@mantine/core";
import { AnimatePresence, motion as motionUi } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ApiClientError, createApiClient } from "@infini-dev-kit/api-client";
import { useThemeSnapshot } from "../providers/DemoThemeProvider";
import { useT } from "../i18n";
import {
  DepthButton,
  GlitchText,
  RevealOnScroll,
  StaggerList,
} from "@infini-dev-kit/frontend/components";
import { staggerChild, useThemeTransition } from "@infini-dev-kit/frontend/hooks";
import { MOCK_API_ENDPOINTS } from "../mocks/handlers";
import "./ApiLab.css";

type ApiLabLogEntry = {
  id: string;
  level: "ok" | "err";
  label: string;
  method: string;
  url: string;
  status: number;
  durationMs: number;
  timestamp: string;
  detail: string;
};

type TraceInfo = { traceparent?: string; tracestate?: string };

const COVERED_ENDPOINT_IDS = new Set<string>([
  "users-list",
  "users-detail",
  "validate",
  "protected",
  "slow",
  "retry",
]);

const MAX_USER_ID_LENGTH = 12;

function nowTimestamp(): string {
  return new Date().toLocaleTimeString();
}

function makeLogId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function randomHex(length: number): string {
  const byteLength = Math.ceil(length / 2);

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(byteLength);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, length);
  }

  return Math.random().toString(16).slice(2).padEnd(length, "0").slice(0, length);
}

function createTraceContext(): TraceInfo {
  const traceId = randomHex(32);
  const parentId = randomHex(16);
  return {
    traceparent: `00-${traceId}-${parentId}-01`,
  };
}

function sanitizeUserId(rawValue: string): string {
  return rawValue.replace(/\D+/g, "").slice(0, MAX_USER_ID_LENGTH);
}

function stringifyPreview(value: unknown): string {
  if (typeof value === "string") {
    return value.length > 320 ? `${value.slice(0, 320)}...` : value;
  }
  try {
    const text = JSON.stringify(value, null, 2);
    return text.length > 500 ? `${text.slice(0, 500)}...` : text;
  } catch {
    return String(value);
  }
}

export function ApiLab() {
  const { state } = useThemeSnapshot();
  const t = useT("api-lab");
  const isCyberpunk = state.themeId === "cyberpunk";
  const [logs, setLogs] = useState<ApiLabLogEntry[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("1");
  const [isRunning, setIsRunning] = useState(false);
  const [traceHint, setTraceHint] = useState<TraceInfo>({});
  const enterTransition = useThemeTransition("enter");
  const logPanelRef = useRef<HTMLDivElement | null>(null);

  const client = useMemo(
    () =>
      createApiClient({
        baseUrl: "/api",
        timeoutMs: 5000,
        traceContext: () => {
          const trace = createTraceContext();
          setTraceHint(trace);
          return trace;
        },
      }),
    [],
  );

  useEffect(() => {
    if (!logPanelRef.current) {
      return;
    }
    logPanelRef.current.scrollTop = logPanelRef.current.scrollHeight;
  }, [logs.length]);

  const endpointRows = useMemo(
    () =>
      MOCK_API_ENDPOINTS.map((endpoint) => ({
        ...endpoint,
        included: COVERED_ENDPOINT_IDS.has(endpoint.id),
      })),
    [],
  );

  const missingEndpointRows = useMemo(
    () => endpointRows.filter((endpoint) => !endpoint.included),
    [endpointRows],
  );

  const includedCount = endpointRows.length - missingEndpointRows.length;

  function appendLog(entry: Omit<ApiLabLogEntry, "id" | "timestamp">): void {
    const id = makeLogId();
    const next: ApiLabLogEntry = {
      ...entry,
      id,
      timestamp: nowTimestamp(),
    };
    setLogs((prev) => [...prev.slice(-79), next]);
  }

  async function runAction<T>(options: {
    label: string;
    method: string;
    url: string;
    successStatus?: number;
    action: () => Promise<T>;
  }, runOptions?: { manageLoading?: boolean }): Promise<void> {
    const manageLoading = runOptions?.manageLoading ?? true;
    if (manageLoading) {
      setIsRunning(true);
    }
    const started = performance.now();
    try {
      const result = await options.action();
      appendLog({
        level: "ok",
        label: options.label,
        method: options.method,
        url: options.url,
        status: options.successStatus ?? 200,
        durationMs: Math.round(performance.now() - started),
        detail: stringifyPreview(result),
      });
    } catch (error) {
      if (error instanceof ApiClientError) {
        appendLog({
          level: "err",
          label: options.label,
          method: options.method,
          url: options.url,
          status: error.status ?? 0,
          durationMs: Math.round(performance.now() - started),
          detail: stringifyPreview({
            kind: error.kind,
            message: error.message,
            problem: error.problem,
          }),
        });
      } else {
        appendLog({
          level: "err",
          label: options.label,
          method: options.method,
          url: options.url,
          status: 0,
          durationMs: Math.round(performance.now() - started),
          detail: stringifyPreview(error),
        });
      }
    } finally {
      if (manageLoading) {
        setIsRunning(false);
      }
    }
  }

  type RunOptions = { manageLoading?: boolean };

  function runFetchUsers(runOptions?: RunOptions): Promise<void> {
    return runAction({
      label: "Fetch Users",
      method: "GET",
      url: "/api/users",
      action: () => client.request({ method: "GET", path: "/users" }),
    }, runOptions);
  }

  function runFetchUserDetail(userId?: string, runOptions?: RunOptions): Promise<void> {
    const id = sanitizeUserId(userId ?? selectedUserId) || "1";
    return runAction({
      label: "Fetch User Detail",
      method: "GET",
      url: `/api/users/${id}`,
      action: () =>
        client.request({
          method: "GET",
          path: "/users/:id",
          pathParams: { id },
        }),
    }, runOptions);
  }

  function runValidationError(runOptions?: RunOptions): Promise<void> {
    return runAction({
      label: "Validation Error",
      method: "POST",
      url: "/api/validate",
      action: () =>
        client.request({
          method: "POST",
          path: "/validate",
          body: { email: "", name: "" },
        }),
    }, runOptions);
  }

  function runAuthError(runOptions?: RunOptions): Promise<void> {
    return runAction({
      label: "Auth Error",
      method: "GET",
      url: "/api/protected",
      action: () =>
        client.request({
          method: "GET",
          path: "/protected",
          requiresAuth: true,
        }),
    }, runOptions);
  }

  function runTimeoutDemo(runOptions?: RunOptions): Promise<void> {
    return runAction({
      label: "Timeout",
      method: "GET",
      url: "/api/slow",
      action: () =>
        client.request({
          method: "GET",
          path: "/slow",
          timeoutMs: 2000,
        }),
    }, runOptions);
  }

  function runRetryDemo(runOptions?: RunOptions): Promise<void> {
    return runAction({
      label: "Retry",
      method: "GET",
      url: "/api/retry",
      action: () =>
        client.request({
          method: "GET",
          path: "/retry",
          retry: {
            retries: 1,
            baseDelayMs: 100,
            jitterMs: 0,
            maxDelayMs: 1200,
            retryMethods: ["GET", "HEAD"],
          },
        }),
    }, runOptions);
  }

  async function runAllEndpoints(): Promise<void> {
    const userId = sanitizeUserId(selectedUserId) || "1";
    setIsRunning(true);
    try {
      await runFetchUsers({ manageLoading: false });
      await runFetchUserDetail(userId, { manageLoading: false });
      await runValidationError({ manageLoading: false });
      await runAuthError({ manageLoading: false });
      await runTimeoutDemo({ manageLoading: false });
      await runRetryDemo({ manageLoading: false });
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="api-lab">
      <RevealOnScroll>
        <header className="api-lab-header">
          <h1>{isCyberpunk ? <GlitchText trigger="interval" intensity="medium">{t("title")}</GlitchText> : t("title")}</h1>
          <p>{t("subtitle")}</p>
        </header>
      </RevealOnScroll>

      <div className="api-lab-grid">
        <section className="api-lab-panel" aria-busy={isRunning}>
          <h2>{isCyberpunk ? <GlitchText trigger="hover">{t("scenarios")}</GlitchText> : t("scenarios")}</h2>
          <StaggerList className="api-lab-action-grid" staggerMs={30}>
            <motionUi.div variants={staggerChild}>
              <DepthButton
                className="demo-control-motion"
                onClick={() => runFetchUsers()}
                disabled={isRunning}
                type="primary"
              >
                {isRunning ? t("btn.running") : t("btn.fetchUsers")}
              </DepthButton>
            </motionUi.div>

            <motionUi.div className="api-lab-user-id" variants={staggerChild}>
              <label htmlFor="api-user-id">{t("label.userId")}</label>
              <div>
                <TextInput
                  id="api-user-id"
                  className="demo-control-motion"
                  value={selectedUserId}
                  onChange={(event) => setSelectedUserId(sanitizeUserId(event.target.value))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !isRunning) {
                      void runFetchUserDetail();
                    }
                  }}
                  size="xs"
                  inputMode="numeric"
                  maxLength={MAX_USER_ID_LENGTH}
                  style={{ width: 90 }}
                />
              </div>
              <DepthButton
                className="demo-control-motion"
                size="sm"
                disabled={isRunning}
                onClick={() => runFetchUserDetail()}
                aria-label={t("aria.fetchUserDetail")}
                type="secondary"
              >
                {isRunning ? "…" : t("btn.run")}
              </DepthButton>
            </motionUi.div>

            <motionUi.div variants={staggerChild}>
              <DepthButton
                className="demo-control-motion"
                disabled={isRunning}
                onClick={() => runValidationError()}
                type="secondary"
              >
                {isRunning ? t("btn.running") : t("btn.validationError")}
              </DepthButton>
            </motionUi.div>

            <motionUi.div variants={staggerChild}>
              <DepthButton
                className="demo-control-motion"
                disabled={isRunning}
                onClick={() => runAuthError()}
                type="secondary"
              >
                {isRunning ? "Running…" : "Auth Error (401)"}
              </DepthButton>
            </motionUi.div>

            <motionUi.div variants={staggerChild}>
              <DepthButton
                className="demo-control-motion"
                disabled={isRunning}
                onClick={() => runTimeoutDemo()}
                type="secondary"
              >
                {isRunning ? "Running…" : "Client Timeout (2s)"}
              </DepthButton>
            </motionUi.div>

            <motionUi.div variants={staggerChild}>
              <DepthButton
                className="demo-control-motion"
                disabled={isRunning}
                onClick={() => runRetryDemo()}
                type="secondary"
              >
                {isRunning ? "Running…" : "Retry Demo (429 - 200)"}
              </DepthButton>
            </motionUi.div>

            <motionUi.div variants={staggerChild}>
              <Group gap={8}>
                <DepthButton
                  className="demo-control-motion"
                  size="sm"
                  disabled={isRunning}
                  onClick={runAllEndpoints}
                  type="primary"
                >
                  {isRunning ? "Running…" : "Run All Endpoints"}
                </DepthButton>
                <DepthButton
                  className="demo-control-motion"
                  size="sm"
                  disabled={isRunning}
                  onClick={() => {
                    setLogs([]);
                  }}
                  type="secondary"
                >
                  Clear Logs
                </DepthButton>
              </Group>
            </motionUi.div>
          </StaggerList>

          <div className="api-lab-coverage">
            <div className="api-lab-coverage-head">
              <h3>{isCyberpunk ? <GlitchText trigger="hover">Endpoint Coverage</GlitchText> : "Endpoint Coverage"}</h3>
              <Text
                c={missingEndpointRows.length === 0 ? "green.6" : "yellow.8"}
                size="sm"
              >
                {includedCount}/{endpointRows.length} scenarios mapped
              </Text>
            </div>

            <div className="api-lab-coverage-scroll">
              <table className="api-lab-coverage-table">
                <thead>
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Method</th>
                    <th scope="col">Route</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpointRows.map((endpoint) => (
                    <tr key={endpoint.id}>
                      <td>
                        <span className={`api-lab-coverage-chip ${endpoint.included ? "included" : "missing"}`.trim()}>
                          {endpoint.included ? "included" : "missing"}
                        </span>
                      </td>
                      <td>{endpoint.method}</td>
                      <td>{endpoint.route}</td>
                      <td>{endpoint.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {missingEndpointRows.length === 0 ? (
              <Alert
                style={{ marginTop: 10 }}
                color="green"
              >
                All mock API endpoints are included in this test console.
              </Alert>
            ) : (
              <Alert
                style={{ marginTop: 10 }}
                color="yellow"
              >
                Missing endpoint scenarios: {missingEndpointRows.map((endpoint) => `${endpoint.method} ${endpoint.route}`).join(", ")}
              </Alert>
            )}
          </div>
        </section>

        <section className="api-lab-panel api-lab-log-panel">
          <h2>{isCyberpunk ? <GlitchText trigger="hover">Request Log</GlitchText> : "Request Log"}</h2>
          <div className="api-lab-log-meta">
            <Text c="dimmed">Entries: {logs.length}</Text>
            <Text c="dimmed">Current Trace: {traceHint.traceparent ? `${traceHint.traceparent.slice(0, 20)}...` : "none"}</Text>
          </div>

          <div className="api-lab-log-scroll" ref={logPanelRef} role="log" aria-live="polite">
            {logs.length === 0 ? (
              <div className="api-lab-log-empty">No requests yet. Run a scenario to populate this panel.</div>
            ) : (
              <AnimatePresence initial={false}>
                {logs.map((entry) => (
                  <motionUi.article
                    key={entry.id}
                    className={`api-lab-log-entry ${entry.level}`.trim()}
                    initial={
                      isCyberpunk
                        ? {
                            opacity: 0,
                            x: -16,
                            clipPath: "inset(0 100% 0 0)",
                            filter: "brightness(1.5)",
                          }
                        : { opacity: 0, x: 12 }
                    }
                    animate={
                      isCyberpunk
                        ? {
                            opacity: [0, 1, 0.8, 1],
                            x: 0,
                            clipPath: "inset(0 0% 0 0)",
                            filter: "brightness(1)",
                          }
                        : { opacity: 1, x: 0 }
                    }
                    exit={
                      isCyberpunk
                        ? {
                            opacity: [1, 0.6, 0],
                            clipPath: "inset(0 0 0 100%)",
                            filter: "brightness(1.3)",
                          }
                        : { opacity: 0, x: -8 }
                    }
                    transition={enterTransition}
                  >
                    <div className="api-lab-log-line">
                      <strong>{entry.label}</strong>
                      <span>{entry.timestamp}</span>
                    </div>
                    <div className="api-lab-log-line">
                      <span>
                        <span className="api-lab-log-code">{entry.method}</span> {entry.url}
                      </span>
                      <span>
                        <span className="api-lab-log-code">{entry.status}</span> {entry.durationMs}ms
                      </span>
                    </div>
                    <pre className="api-lab-log-detail">{entry.detail}</pre>
                  </motionUi.article>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>
      </div>

      <Alert
        style={{ marginTop: 16 }}
        color="infini-primary"
      >
        Scenarios are deterministic in development mode via MSW handlers.
      </Alert>
    </div>
  );
}
