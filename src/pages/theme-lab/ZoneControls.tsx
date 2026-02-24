import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Progress,
  Radio,
  Rate,
  Segmented,
  Select,
  Slider,
  Switch,
  TimePicker,
} from "antd";

import { useThemeSnapshot } from "@infini-dev-kit/frontend/react";

import type { ZoneProps } from "./types";

const SELECT_OPTIONS = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

const AUTOCOMPLETE_OPTIONS = [{ value: "Alpha Node" }, { value: "Beta Node" }, { value: "Gamma Node" }];

export function ZoneControls({ zoneIndex, revealed, setRef, animationStyle }: ZoneProps) {
  const { theme } = useThemeSnapshot();

  return (
    <section
      ref={setRef}
      data-zone-index={zoneIndex}
      className={`zone theme-zone zone-controls stagger-in ${revealed ? "reveal-visible" : "reveal-hidden"}`}
      style={animationStyle}
    >
      <div className="zone-label ambient-label">Controls</div>

      <section className="theme-lab-section" aria-labelledby="section-buttons">
        <h2 id="section-buttons" className="theme-lab-section-title ambient-section-title">
          Buttons
        </h2>
        <div className="button-grid">
          <Button className="demo-control-motion" type="primary">
            Primary
          </Button>
          <Button className="demo-control-motion">Default</Button>
          <Button className="demo-control-motion" type="dashed">
            Dashed
          </Button>
          <Button className="demo-control-motion" danger>
            Danger
          </Button>
          <Button className="demo-control-motion" type="primary" loading>
            Loading
          </Button>
          <Button className="demo-control-motion" disabled>
            Disabled
          </Button>
          <Button className="demo-control-motion" type="link">
            Link
          </Button>
          <Button className="demo-control-motion" type="text">
            Text
          </Button>
        </div>
        <div className="section-caption">
          Profile: {theme.componentProfile.button} | Focus ring:{" "}
          <code style={{ fontFamily: theme.typography.mono }}>{theme.foundation.focusRing}</code>
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-inputs">
        <h2 id="section-inputs" className="theme-lab-section-title ambient-section-title">
          Inputs
        </h2>
        <div className="input-grid">
          <Input className="demo-control-motion" placeholder="Default input" />
          <Input className="demo-control-motion" placeholder="Error state" status="error" />
          <Input className="demo-control-motion" placeholder="Warning state" status="warning" />
          <Input className="demo-control-motion" placeholder="Disabled" disabled />
          <InputNumber className="demo-control-motion" style={{ width: "100%" }} min={0} max={100} defaultValue={42} />
          <InputNumber className="demo-control-motion" style={{ width: "100%" }} min={10} max={1000} />
          <AutoComplete
            className="demo-control-motion"
            style={{ width: "100%" }}
            options={AUTOCOMPLETE_OPTIONS}
            placeholder="AutoComplete"
          />
          <Select className="demo-control-motion" placeholder="Select option" style={{ width: "100%" }} options={SELECT_OPTIONS} />
          <TimePicker className="demo-control-motion" style={{ width: "100%" }} />
        </div>
        <div className="section-caption">
          Profile: {theme.componentProfile.input} | Border: {theme.foundation.borderWidth}px {theme.foundation.borderStyle} | Radius:{" "}
          {theme.foundation.radius}px
        </div>
      </section>

      <section className="theme-lab-section" aria-labelledby="section-form-controls">
        <h2 id="section-form-controls" className="theme-lab-section-title ambient-section-title">
          Form Controls
        </h2>
        <div className="form-controls-grid">
          <div className="form-controls-row">
            <Switch className="demo-control-motion" defaultChecked />
            <Switch className="demo-control-motion" />
            <Checkbox className="demo-control-motion">Remember me</Checkbox>
            <Checkbox className="demo-control-motion" defaultChecked>
              Agree to terms
            </Checkbox>
            <Radio.Group
              className="demo-control-motion"
              defaultValue="a"
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
                { value: "c", label: "Option C" },
              ]}
            />
          </div>
          <div className="form-controls-row">
            <div className="form-controls-stretch">
              <Slider className="demo-control-motion" defaultValue={30} />
            </div>
            <Rate className="demo-control-motion" defaultValue={3} />
            <DatePicker className="demo-control-motion" />
            <Progress className="liquid-gold" percent={70} style={{ minWidth: 160 }} />
            <Segmented className="demo-control-motion" options={["Daily", "Weekly", "Monthly"]} defaultValue="Weekly" />
          </div>
        </div>
      </section>
    </section>
  );
}
