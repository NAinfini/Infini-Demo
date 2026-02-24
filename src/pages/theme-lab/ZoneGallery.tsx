import {
  Avatar,
  Button,
  Card,
  Cascader,
  Collapse,
  ColorPicker,
  Descriptions,
  Divider,
  Empty,
  FloatButton,
  Form,
  Image,
  Input,
  Menu,
  Popconfirm,
  Popover,
  QRCode,
  Result,
  Select,
  Skeleton,
  Spin,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography as AntTypography,
  Upload,
  Watermark,
} from "antd";
import { useState } from "react";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import {
  CASCADER_OPTIONS,
  COLLAPSE_ITEMS,
  DEMO_IMAGE_SRC,
  DESCRIPTION_ITEMS,
  MENU_ITEMS,
  TIMELINE_ITEMS,
  TRANSFER_ITEMS,
  TREE_ITEMS,
  TREE_SELECT_OPTIONS,
} from "./data";
import type { ZoneProps } from "./types";

const SELECT_OPTIONS = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
];

const FORM_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export function ZoneGallery({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { theme } = useThemeSnapshot();
  const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(["2", "4"]);
  const [showGallerySkeleton, setShowGallerySkeleton] = useState(true);
  const [menuSelection, setMenuSelection] = useState("overview");
  const { Dragger } = Upload;

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-gallery stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Component Gallery</div>

      <section className="theme-lab-section" aria-labelledby="section-gallery">
        <h2 id="section-gallery" className="theme-lab-section-title ambient-section-title">
          Expanded Components
        </h2>
        <div className="component-gallery-grid">
          <article className="gallery-group">
            <h3 className="gallery-group-title">Data Entry</h3>
            <div className="gallery-stack">
              <Select className="demo-control-motion" style={{ width: "100%" }} placeholder="Select option" options={SELECT_OPTIONS} />
              <Cascader className="demo-control-motion" style={{ width: "100%" }} options={CASCADER_OPTIONS} placeholder="Pick region" />
              <TreeSelect
                className="demo-control-motion"
                style={{ width: "100%" }}
                treeData={TREE_SELECT_OPTIONS}
                placeholder="Select node"
              />
              <ColorPicker className="demo-control-motion" defaultValue={theme.palette.primary} />
              <Transfer
                className="gallery-transfer"
                dataSource={TRANSFER_ITEMS}
                targetKeys={transferTargetKeys}
                onChange={(nextTargetKeys) => setTransferTargetKeys(nextTargetKeys.map(String))}
                render={(item) => item.title}
                listStyle={{ width: 170, height: 180 }}
              />
            </div>
          </article>

          <article className="gallery-group">
            <h3 className="gallery-group-title">Data Display</h3>
            <div className="gallery-stack">
              <Card size="small" title="Service Card">
                <p style={{ margin: 0, fontSize: 13 }}>Header + border token preview.</p>
              </Card>
              <Collapse size="small" items={COLLAPSE_ITEMS} />
              <Timeline items={TIMELINE_ITEMS} />
              <Descriptions size="small" column={2} bordered items={DESCRIPTION_ITEMS} />
              <Tree defaultExpandAll treeData={TREE_ITEMS} />
              <div className="avatar-row">
                <Avatar size={24}>A</Avatar>
                <Avatar size={36}>B</Avatar>
                <Avatar size={48}>C</Avatar>
              </div>
            </div>
          </article>

          <article className="gallery-group">
            <h3 className="gallery-group-title">Feedback and Misc</h3>
            <div className="gallery-stack">
              <div className="gallery-action-row">
                <Tooltip title="Theme-aware tooltip">
                  <Button className="demo-control-motion" size="small">
                    Tooltip
                  </Button>
                </Tooltip>
                <Popover content="Theme-aware popover">
                  <Button className="demo-control-motion" size="small">
                    Popover
                  </Button>
                </Popover>
                <Popconfirm title="Delete node?" okText="Delete" cancelText="Cancel">
                  <Button className="demo-control-motion" size="small" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
              <div className="gallery-loading-row">
                <Spin size="small" />
                <Button className="demo-control-motion" size="small" onClick={() => setShowGallerySkeleton((prev) => !prev)}>
                  {showGallerySkeleton ? "Hide Skeleton" : "Show Skeleton"}
                </Button>
              </div>
              {showGallerySkeleton ? <Skeleton active paragraph={{ rows: 2 }} /> : <div className="gallery-loaded-box">Loaded content preview</div>}
              <Result className="gallery-result" status="success" title="Checks Passed" subTitle="Theme component tokens are active." />
              <Empty description="No pending alerts" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              <Image className="gallery-image" width={180} src={DEMO_IMAGE_SRC} preview />
              <Watermark content={[theme.name, "Infini"]}>
                <div className="gallery-watermark">Watermark token preview</div>
              </Watermark>
              <Form className="gallery-form" layout="vertical" requiredMark="optional" initialValues={{ owner: "Alice", cadence: "weekly" }}>
                <Form.Item label="Owner" name="owner" rules={[{ required: true, message: "Owner is required" }]}>
                  <Input className="demo-control-motion" />
                </Form.Item>
                <Form.Item label="Cadence" name="cadence" rules={[{ required: true, message: "Cadence is required" }]}>
                  <Select className="demo-control-motion" options={FORM_OPTIONS} />
                </Form.Item>
              </Form>
            </div>
          </article>

          <article className="gallery-group">
            <h3 className="gallery-group-title">Navigation and Type</h3>
            <div className="gallery-stack">
              <Menu mode="horizontal" selectedKeys={[menuSelection]} items={MENU_ITEMS} onClick={({ key }) => setMenuSelection(String(key))} />
              <Divider />
              <div className="gallery-typography">
                <AntTypography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
                  Typography Tokens
                </AntTypography.Title>
                <AntTypography.Text strong>Strong text</AntTypography.Text>
                <AntTypography.Paragraph style={{ margin: "8px 0" }}>
                  Theme link colors and text hierarchy are driven by Typography component tokens.
                </AntTypography.Paragraph>
                <AntTypography.Link href="#" onClick={(event) => event.preventDefault()}>
                  Read full style guide
                </AntTypography.Link>
              </div>
              <Dragger
                className="demo-control-motion"
                multiple={false}
                beforeUpload={() => false}
                showUploadList={false}
                style={{ padding: 8 }}
              >
                Drag file here for styled upload surface
              </Dragger>
              <div className="gallery-qr-wrap">
                <QRCode value={`theme:${theme.id}`} color={theme.palette.primary} />
              </div>
              <div className="gallery-float-preview">
                <FloatButton icon={<span>+</span>} style={{ position: "absolute", insetInlineEnd: 10, bottom: 10 }} />
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
