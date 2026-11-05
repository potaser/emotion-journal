import { useStore } from '../store/useStore'
import { analyzeTriggers } from '../engine/analysis'

const card = 'rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-card'

export default function TriggerAnalysis() {
  const entries = useStore((s) => s.entries)
  const stats = analyzeTriggers(entries)
  const negative = stats.filter((s) => s.negativeCount > 0)

  return (
    <section className={card}>
      <h2 className="mb-4 text-base font-semibold">触发因素分析</h2>

      {stats.length === 0 ? (
        <p className="text-sm text-neutral-500">记录时勾选触发因素，这里会帮你发现规律。</p>
      ) : (
        <>
          {negative.length > 0 && (
            <p className="mb-4 rounded-xl bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-600">
              💡 你负面情绪最常来自
              <span className="font-semibold text-neutral-900">
                「{negative[0].emoji} {negative[0].label}」
              </span>
              （{negative[0].negativeCount} 次），不妨多留意这一点。
            </p>
          )}

          <ul className="space-y-3">
            {stats.map((s) => {
              const pct = Math.min(100, Math.round((s.count / Math.max(...stats.map((x) => x.count))) * 100))
              return (
                <li key={s.triggerId}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-neutral-700">
                      {s.emoji} {s.label}
                    </span>
                    <span className="text-xs tabular-nums text-neutral-500">
                      {s.count} 次 · 均强度 {s.avgIntensity.toFixed(1)}
                      {s.negativeCount > 0 && <span className="text-neutral-400"> · 负面 {s.negativeCount}</span>}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-full rounded-full bg-neutral-400" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}
