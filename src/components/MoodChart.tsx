import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useStore } from '../store/useStore'
import { emotionDistribution, trendData } from '../engine/analysis'

const card = 'rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-card'

function TrendTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow">
      <div className="text-neutral-500">{label}</div>
      <div className="font-medium">
        {p.emoji} {p.emotionLabel} · 强度 {p.intensity}
      </div>
    </div>
  )
}

export default function MoodChart() {
  const entries = useStore((s) => s.entries)
  const trend = trendData(entries)
  const dist = emotionDistribution(entries)

  if (entries.length === 0) {
    return (
      <section className={card}>
        <h2 className="mb-3 text-base font-semibold">情绪变化</h2>
        <p className="text-sm text-neutral-500">还没有记录，先记录一条心情吧。</p>
      </section>
    )
  }

  return (
    <section className={card}>
      <h2 className="mb-4 text-base font-semibold">情绪变化</h2>

      <div className="mb-6">
        <p className="mb-2 text-sm text-neutral-500">强度随时间（1–10）</p>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 5, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#898781' }} tickLine={false} axisLine={{ stroke: '#c3c2b7' }} minTickGap={24} />
              <YAxis domain={[1, 10]} ticks={[1, 5, 10]} tick={{ fontSize: 10, fill: '#898781' }} tickLine={false} axisLine={false} />
              <Tooltip content={<TrendTooltip />} />
              <Line type="monotone" dataKey="intensity" stroke="#2a78d6" strokeWidth={2} dot={{ r: 3, fill: '#2a78d6' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-neutral-500">情绪分布</p>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dist} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="label"
                width={72}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#52514e' }}
                tickFormatter={(label: string, i: number) => `${dist[i].emoji} ${label}`}
              />
              <Tooltip formatter={(value) => [`${value} 次`, '次数']} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
                {dist.map((d) => (
                  <Cell key={d.emotionId} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
