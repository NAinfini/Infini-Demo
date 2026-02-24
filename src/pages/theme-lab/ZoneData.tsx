import { Badge, Breadcrumb, Button, Dropdown, Space, Statistic, Steps, Table, Tabs, Tag, Tooltip } from "antd";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import { TABLE_DATA } from "./data";
import type { ZoneProps } from "./types";

const DROPDOWN_ITEMS = [
  { key: "export-csv", label: "Export CSV" },
  { key: "export-json", label: "Export JSON" },
  { key: "archive", label: "Archive Snapshot" },
];

export function ZoneData({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { theme } = useThemeSnapshot();

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-data stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Data</div>

      <section className="theme-lab-section" aria-labelledby="section-table">
        <h2 id="section-table" className="theme-lab-section-title ambient-section-title">
          Data Table
        </h2>
        <div className="table-wrap">
          <Table
            dataSource={TABLE_DATA}
            size={theme.dataUi.density === "compact" ? "small" : "middle"}
            pagination={{ pageSize: 5, size: "small" }}
            rowSelection={{ type: "checkbox" }}
            columns={[
              { title: "Name", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
              { title: "Role", dataIndex: "role" },
              {
                title: "Status",
                dataIndex: "status",
                render: (status: string) => (
                  <Tag color={status === "active" ? "success" : status === "pending" ? "warning" : "error"}>{status}</Tag>
                ),
              },
              { title: "Score", dataIndex: "score", sorter: (a, b) => a.score - b.score },
            ]}
          />
        </div>
        <div className="section-caption">
          Density: {theme.dataUi.density} | Separator: {theme.dataUi.rowSeparator} | Status shape: {theme.dataUi.statusShape}
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-tabs">
        <h2 id="section-tabs" className="theme-lab-section-title ambient-section-title">
          Tabs and Badges
        </h2>
        <Tabs
          items={[
            { key: "1", label: "Overview", children: <p style={{ margin: "8px 0 0" }}>Overview content for {theme.name}</p> },
            { key: "2", label: <Badge count={3}>Details</Badge>, children: <p style={{ margin: "8px 0 0" }}>Details content</p> },
            { key: "3", label: "Settings", children: <p style={{ margin: "8px 0 0" }}>Settings content</p> },
          ]}
        />
        <div className="inline-chip-row">
          <Badge count={5}>
            <Button className="demo-control-motion" size="small">
              Messages
            </Button>
          </Badge>
          <Badge dot>
            <Button className="demo-control-motion" size="small">
              Notifications
            </Button>
          </Badge>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="red">Red</Tag>
          <Tooltip title="Tooltip content">
            <Button className="demo-control-motion" size="small">
              Hover me
            </Button>
          </Tooltip>
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-navigation">
        <h2 id="section-navigation" className="theme-lab-section-title ambient-section-title">
          Navigation
        </h2>
        <div className="navigation-stack">
          <Space wrap>
            <Breadcrumb items={[{ title: "Home" }, { title: "Settings" }, { title: "Theme" }]} />
            <Dropdown menu={{ items: DROPDOWN_ITEMS }} trigger={["click"]}>
              <Button className="demo-control-motion">Actions</Button>
            </Dropdown>
          </Space>
          <Steps current={1} items={[{ title: "Select" }, { title: "Configure" }, { title: "Deploy" }]} />
          <div className="statistics-row">
            <Statistic title="Requests" value={1128} suffix="req/s" />
            <Statistic title="Error Rate" value={0.43} precision={2} suffix="%" />
          </div>
        </div>
      </section>
    </section>
  );
}
