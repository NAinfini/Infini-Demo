export const PALETTE_KEYS = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "danger",
  "text",
  "textMuted",
] as const;

export const MOTION_INTENTS = [
  "enter",
  "exit",
  "hover",
  "press",
  "focus",
  "overlay-open",
  "overlay-close",
  "list-update",
] as const;

export const TABLE_DATA = [
  { key: "1", name: "Alice Chen", role: "Engineer", status: "active", score: 98 },
  { key: "2", name: "Bob Nakamura", role: "Designer", status: "pending", score: 72 },
  { key: "3", name: "Carol Osei", role: "Manager", status: "active", score: 91 },
  { key: "4", name: "David Park", role: "Engineer", status: "error", score: 45 },
  { key: "5", name: "Eva Muller", role: "Analyst", status: "active", score: 87 },
  { key: "6", name: "Frank Diallo", role: "Engineer", status: "pending", score: 63 },
  { key: "7", name: "Grace Kim", role: "Designer", status: "active", score: 95 },
  { key: "8", name: "Hiro Tanaka", role: "Manager", status: "error", score: 38 },
];

export const CASCADER_OPTIONS = [
  {
    value: "province-a",
    label: "Province A",
    children: [
      { value: "city-a1", label: "City A1" },
      { value: "city-a2", label: "City A2" },
    ],
  },
  {
    value: "province-b",
    label: "Province B",
    children: [
      { value: "city-b1", label: "City B1" },
      { value: "city-b2", label: "City B2" },
    ],
  },
];

export const TREE_SELECT_OPTIONS = [
  {
    title: "Systems",
    value: "systems",
    key: "systems",
    children: [
      { title: "API Gateway", value: "api-gateway", key: "api-gateway" },
      { title: "Data Lake", value: "data-lake", key: "data-lake" },
    ],
  },
  {
    title: "Teams",
    value: "teams",
    key: "teams",
    children: [
      { title: "Design", value: "team-design", key: "team-design" },
      { title: "Platform", value: "team-platform", key: "team-platform" },
    ],
  },
];

export const TRANSFER_ITEMS = Array.from({ length: 5 }, (_, index) => ({
  key: String(index + 1),
  title: `Asset ${index + 1}`,
  description: `Node ${index + 1}`,
}));

export const COLLAPSE_ITEMS = [
  {
    key: "gallery-panel-1",
    label: "Signal Overview",
    children: "System signals are stable with minor latency spikes in region B.",
  },
  {
    key: "gallery-panel-2",
    label: "Release Notes",
    children: "Current release focuses on performance hardening and theming parity.",
  },
];

export const TIMELINE_ITEMS = [
  { color: "green", children: "Build completed" },
  { color: "gold", children: "Validation checks running" },
  { color: "blue", children: "Release queued" },
];

export const DESCRIPTION_ITEMS = [
  { key: "owner", label: "Owner", children: "Platform Team" },
  { key: "tier", label: "Tier", children: "Critical" },
  { key: "region", label: "Region", children: "US-East" },
  { key: "sla", label: "SLA", children: "99.95%" },
];

export const TREE_ITEMS = [
  {
    key: "0",
    title: "Cluster",
    children: [
      { key: "0-0", title: "Node A" },
      { key: "0-1", title: "Node B" },
    ],
  },
];

export const MENU_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "activity", label: "Activity" },
  { key: "settings", label: "Settings" },
];

export const DEMO_IMAGE_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='140' viewBox='0 0 240 140'%3E%3Crect width='240' height='140' fill='%23f5f5f5'/%3E%3Crect x='16' y='16' width='208' height='108' rx='8' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='70' cy='58' r='18' fill='%23ff6b6b'/%3E%3Crect x='102' y='44' width='96' height='10' fill='%23ffd93d'/%3E%3Crect x='102' y='62' width='70' height='10' fill='%23c4b5fd'/%3E%3Crect x='32' y='88' width='176' height='16' fill='%23000000' fill-opacity='0.08'/%3E%3C/svg%3E";

export const ZONE_COUNT = 9;

export function wcagLabel(ratio: number): { label: string; pass: boolean } {
  if (ratio >= 7) return { label: "AAA", pass: true };
  if (ratio >= 4.5) return { label: "AA", pass: true };
  if (ratio >= 3) return { label: "AA Large", pass: true };
  return { label: "Fail", pass: false };
}
