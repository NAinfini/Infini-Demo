import { Alert, Button, Input, Space, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { ApiClientError, createApiClient } from "@infini-dev-kit/backend";

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

const { Text } = Typography;

function nowTimestamp(): string {
  return new Date().toLocaleTimeString();
}

function makeLogId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createTraceContext(): TraceInfo {
  const randomHex = Math.random().toString(16).slice(2).padEnd(32, "0").slice(0, 32);
  const parentHex = Math.random().toString(16).slice(2).padEnd(16, "0").slice(0, 16);
  return {
    traceparent: `00-${randomHex}-${parentHex}-01`,
  };
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
  const [logs, setLogs] = useState<ApiLabLogEntry[]>([]);
  const [rowEnterIds, setRowEnterIds] = useState<Record<string, true>>({});
  const [selectedUserId, setSelectedUserId] = useState("1");
  const [isRunning, setIsRunning] = useState(false);
  const [traceHint, setTraceHint] = useState<TraceInfo>({});
  const logPanelRef = useRef<HTMLDivElement | null>(null);
  const rowEnterTimersRef = useRef<Record<string, number>>({});

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

  useEffect(() => {
    return () => {
      Object.values(rowEnterTimersRef.current).forEach((timerId) => window.clearTimeout(timerId));
      rowEnterTimersRef.current = {};
    };
  }, []);

  function appendLog(entry: Omit<ApiLabLogEntry, "id" | "timestamp">): void {
    const id = makeLogId();
    const next: ApiLabLogEntry = {
      ...entry,
      id,
      timestamp: nowTimestamp(),
    };
    setLogs((prev) => [...prev.slice(-79), next]);
    setRowEnterIds((prev) => ({ ...prev, [id]: true }));

    const timerId = window.setTimeout(() => {
      setRowEnterIds((prev) => {
        if (!(id in prev)) {
          return prev;
        }
        const nextIds = { ...prev };
        delete nextIds[id];
        return nextIds;
      });
      delete rowEnterTimersRef.current[id];
    }, 360);

    rowEnterTimersRef.current[id] = timerId;
  }

  async function runAction<T>(options: {
    label: string;
    method: string;
    url: string;
    successStatus?: number;
    action: () => Promise<T>;
  }): Promise<void> {
    setIsRunning(true);
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
      setIsRunning(false);
    }
  }

  return (
    <div className="api-lab">
      <header className="api-lab-header">
        <h1>API Lab</h1>
        <p>Live demo for `createApiClient()` with deterministic mock responses via MSW.</p>
      </header>

      <div className="api-lab-grid">
        <section className="api-lab-panel">
          <h2>Scenarios</h2>
          <div className="api-lab-action-grid">
            <Button
              className="demo-control-motion"
              onClick={() =>
                runAction({
                  label: "Fetch Users",
                  method: "GET",
                  url: "/api/users",
                  action: () => client.request({ method: "GET", path: "/users" }),
                })
              }
              loading={isRunning}
            >
              Fetch Users
            </Button>

            <div className="api-lab-user-id">
              <label htmlFor="api-user-id">User ID:</label>
              <Input
                id="api-user-id"
                className="demo-control-motion"
                value={selectedUserId}
                onChange={(event) => setSelectedUserId(event.target.value)}
                size="small"
                style={{ width: 90 }}
              />
              <Button
                className="demo-control-motion"
                size="small"
                onClick={() =>
                  runAction({
                    label: "Fetch User Detail",
                    method: "GET",
                    url: `/api/users/${selectedUserId}`,
                    action: () =>
                      client.request({
                        method: "GET",
                        path: "/users/:id",
                        pathParams: { id: selectedUserId },
                      }),
                  })
                }
              >
                Run
              </Button>
            </div>

            <Button
              className="demo-control-motion"
              onClick={() =>
                runAction({
                  label: "Validation Error",
                  method: "POST",
                  url: "/api/validate",
                  action: () =>
                    client.request({
                      method: "POST",
                      path: "/validate",
                      body: { email: "", name: "" },
                    }),
                })
              }
            >
              Validation Error (400)
            </Button>

            <Button
              className="demo-control-motion"
              onClick={() =>
                runAction({
                  label: "Auth Error",
                  method: "GET",
                  url: "/api/protected",
                  action: () =>
                    client.request({
                      method: "GET",
                      path: "/protected",
                      requiresAuth: true,
                    }),
                })
              }
            >
              Auth Error (401)
            </Button>

            <Button
              className="demo-control-motion"
              onClick={() =>
                runAction({
                  label: "Timeout",
                  method: "GET",
                  url: "/api/slow",
                  action: () =>
                    client.request({
                      method: "GET",
                      path: "/slow",
                      timeoutMs: 2000,
                    }),
                })
              }
            >
              Timeout Demo (2s)
            </Button>

            <Button
              className="demo-control-motion"
              onClick={() =>
                runAction({
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
                })
              }
            >
              Retry Demo (429 - 200)
            </Button>

            <Space size={8}>
              <Button
                className="demo-control-motion"
                size="small"
                onClick={() => {
                  setLogs([]);
                  setRowEnterIds({});
                  Object.values(rowEnterTimersRef.current).forEach((timerId) => window.clearTimeout(timerId));
                  rowEnterTimersRef.current = {};
                }}
              >
                Clear Logs
              </Button>
            </Space>
          </div>
        </section>

        <section className="api-lab-panel api-lab-log-panel">
          <h2>Request Log</h2>
          <div className="api-lab-log-meta">
            <Text type="secondary">Entries: {logs.length}</Text>
            <Text type="secondary">Current Trace: {traceHint.traceparent?.slice(0, 20) ?? "none"}...</Text>
          </div>

          <div className="api-lab-log-scroll" ref={logPanelRef}>
            {logs.length === 0 ? (
              <div className="api-lab-log-empty">No requests yet. Run a scenario to populate this panel.</div>
            ) : (
              logs.map((entry) => (
                <article
                  key={entry.id}
                  className={`api-lab-log-entry ${entry.level} ${rowEnterIds[entry.id] ? "row-enter" : ""}`.trim()}
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
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <Alert
        style={{ marginTop: 16 }}
        message="Scenarios are deterministic in development mode via MSW handlers."
        type="info"
        showIcon
      />
    </div>
  );
}
