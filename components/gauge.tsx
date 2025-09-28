"use client"

import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts"

export function Gauge({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value))
  const data = [{ name: "score", value: pct * 100, fill: "var(--color-primary)" }]
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={14}
          data={data}
          startAngle={225}
          endAngle={-45}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={8} background fill="var(--color-muted)" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
