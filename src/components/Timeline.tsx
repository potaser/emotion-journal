import { useStore } from '../store/useStore'
import { emotionById } from '../data/emotions'
import { triggerById } from '../data/triggers'

const card = 'rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-card'

function fmt(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

export default function Timeline() {
  const entries = useStore((s) => s.entries)
  const deleteEntry = useStore((s) => s.deleteEntry)

  return (
    <section className={card}>
      <h2 className="mb-4 text-base font-semibold">情绪日记</h2>

      {entries.length === 0 ? (
        <p className="text-sm text-neutral-500">你的记录会按时间出现在这里。</p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {entries.map((e) => {
            const emo = emotionById(e.emotionId)
            return (
              <li key={e.id} className="flex items-start gap-3 py-3">
                <span className="text-2xl leading-none" aria-hidden>
                  {emo?.emoji ?? '😶'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">
                      {emo?.label ?? '未知'}
                    </span>
                    <span className="text-xs tabular-nums text-neutral-400">强度 {e.intensity}</span>
                    <span className="text-xs text-neutral-400">{fmt(e.createdAt)}</span>
                  </div>
                  {e.triggers.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {e.triggers.map((t) => {
                        const tg = triggerById(t)
                        return (
                          <span key={t} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                            {tg?.emoji} {tg?.label}
                          </span>
                        )
                      })}
                    </div>
                  )}
                  {e.note && <p className="mt-1 text-sm text-neutral-600">{e.note}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => deleteEntry(e.id)}
                  className="shrink-0 text-xs text-neutral-300 transition hover:text-red-500"
                >
                  删除
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
