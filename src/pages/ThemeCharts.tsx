import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  RadarComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useMemo } from "react";

import { buildEChartsTheme } from "@infini-dev-kit/frontend/theme/echarts/echarts-adapter";
import type { ThemeId } from "@infini-dev-kit/frontend/theme/theme-specs";
import type { EffectiveMotionMode } from "@infini-dev-kit/utils/motion";
import type { EChartsOption } from "echarts";

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  GridComponent,
  LegendComponent,
  RadarComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
]);

interface ThemeChartsProps {
  themeId: ThemeId;
  motionMode: EffectiveMotionMode;
}

function buildAnimationConfig(motionMode: EffectiveMotionMode): Pick<EChartsOption, "animation" | "animationDuration" | "animationDurationUpdate"> {
  if (motionMode === "off") {
    return {
      animation: false,
      animationDuration: 0,
      animationDurationUpdate: 0,
    };
  }

  if (motionMode === "reduced") {
    return {
      animation: true,
      animationDuration: 0,
      animationDurationUpdate: 120,
    };
  }

  if (motionMode === "minimum") {
    return {
      animation: true,
      animationDuration: 60,
      animationDurationUpdate: 60,
    };
  }

  return {
    animation: true,
    animationDuration: 450,
    animationDurationUpdate: 300,
  };
}

export function ThemeCharts({ themeId, motionMode }: ThemeChartsProps) {
  useEffect(() => {
    echarts.registerTheme(themeId, buildEChartsTheme(themeId));
  }, [themeId]);

  const animation = useMemo(() => buildAnimationConfig(motionMode), [motionMode]);

  const lineOption = useMemo<EChartsOption>(
    () => ({
      ...animation,
      tooltip: { trigger: "axis", appendToBody: true },
      legend: { top: 0, data: ["Revenue", "Cost", "Retention"] },
      grid: { top: 48, left: 40, right: 20, bottom: 30 },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        { name: "Revenue", type: "line", smooth: true, data: [120, 132, 101, 134, 90, 160, 180] },
        { name: "Cost", type: "line", smooth: true, data: [90, 100, 85, 112, 78, 121, 140] },
        { name: "Retention", type: "line", smooth: true, data: [62, 64, 63, 68, 69, 73, 75] },
      ],
    }),
    [animation],
  );

  const barOption = useMemo<EChartsOption>(
    () => ({
      ...animation,
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, appendToBody: true },
      legend: { top: 0, data: ["North", "South"] },
      grid: { top: 42, left: 40, right: 20, bottom: 30 },
      xAxis: { type: "category", data: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
      yAxis: { type: "value" },
      series: [
        { name: "North", type: "bar", data: [23, 35, 44, 32, 51], barMaxWidth: 20 },
        { name: "South", type: "bar", data: [18, 29, 36, 41, 46], barMaxWidth: 20 },
      ],
    }),
    [animation],
  );

  const pieOption = useMemo<EChartsOption>(
    () => ({
      ...animation,
      tooltip: { trigger: "item", appendToBody: true },
      legend: { top: 0 },
      series: [
        {
          type: "pie",
          radius: ["42%", "70%"],
          center: ["50%", "58%"],
          label: { formatter: "{b}: {d}%" },
          data: [
            { value: 30, name: "Organic" },
            { value: 24, name: "Paid" },
            { value: 18, name: "Social" },
            { value: 16, name: "Referral" },
            { value: 12, name: "Email" },
          ],
        },
      ],
    }),
    [animation],
  );

  const radarOption = useMemo<EChartsOption>(
    () => ({
      ...animation,
      tooltip: { appendToBody: true },
      legend: { top: 0, data: ["Current", "Target"] },
      radar: {
        radius: 64,
        indicator: [
          { name: "Speed", max: 100 },
          { name: "Quality", max: 100 },
          { name: "Uptime", max: 100 },
          { name: "Coverage", max: 100 },
          { name: "Security", max: 100 },
          { name: "Adoption", max: 100 },
        ],
      },
      series: [
        {
          type: "radar",
          areaStyle: { opacity: 0.22 },
          data: [
            { value: [72, 84, 90, 76, 88, 80], name: "Current" },
            { value: [85, 90, 95, 82, 94, 86], name: "Target" },
          ],
        },
      ],
    }),
    [animation],
  );

  return (
    <div className="theme-chart-grid">
      <article className="theme-chart-card">
        <div className="theme-chart-title">Line</div>
        <ReactEChartsCore echarts={echarts} option={lineOption} theme={themeId} autoResize style={{ height: 220 }} />
      </article>
      <article className="theme-chart-card">
        <div className="theme-chart-title">Bar</div>
        <ReactEChartsCore echarts={echarts} option={barOption} theme={themeId} autoResize style={{ height: 220 }} />
      </article>
      <article className="theme-chart-card">
        <div className="theme-chart-title">Donut</div>
        <ReactEChartsCore echarts={echarts} option={pieOption} theme={themeId} autoResize style={{ height: 220 }} />
      </article>
      <article className="theme-chart-card">
        <div className="theme-chart-title">Radar</div>
        <ReactEChartsCore echarts={echarts} option={radarOption} theme={themeId} autoResize style={{ height: 220 }} />
      </article>
    </div>
  );
}
