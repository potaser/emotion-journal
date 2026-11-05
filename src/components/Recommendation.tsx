import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { recommend } from '../engine/recommend'
import { emotionById } from '../data/emotions'
import { activityTypeMeta } from '../data/activities'

const card = 'rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-card'

export default function Recommendation() {
  const entries = useStore((s) => s.entries)
  const feedbacks = useStore((s) => s.feedbacks)
  const addFeedback = useStore((s) => s.addFeedback)

  const recent = entries[0]
  const emo = recent ? emotionById(recent.emotionId) : undefined
  const results = useMemo(() => recommend(entries, feedbacks), [entries, feedbacks])

  const fbMap = useMemo(() => {
    if (!recent) return new Map<string, boolean>()
    return new Map(
      feedbacks
        .filter((f) => f.entryId === recent.id)
        .map((f) => [f.activityId, f.helpful]),
    )
  }, [feedbacks, recent])

  return (
    <section className={card}>
      <h2 className="mb-4 text-base font-semibold">为你推荐</h2>

      {!recent || !emo ? (
        <p className="text-sm text-neutral-500">先记录此刻的心情，我会为你推荐冥想、音乐或运动方案。</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-neutral-600">
            根据你此刻的 <span className="font-medium text-neutral-900">{emo.emoji} {emo.label}</span>
            {recent.intensity ? `（强度 ${recent.intensity}）` : ''}：
          </p>

          {results.length === 0 ? (
            <p className="text-sm text-neutral-500">暂时没有匹配方案，试试记录更具体的触发因素。</p>
          ) : (
            <ul className="space-y-3">
              {results.map(({ activity, reasons }) => {
                const meta = activityTypeMeta[activity.type]
                const cur = fbMap.get(activity.id)
                return (
                  <li key={activity.id} className="rounded-xl border border-neutral-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600">
                            {meta.emoji} {meta.label}
                          </span>
                          <span className="font-medium">{activity.title}</span>
                          <span className="text-xs text-neutral-400">约 {activity.duration} 分钟</span>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-600">{activity.description}</p>
                        {reasons.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {reasons.map((r) => (
                              <span key={r} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => addFeedback(recent.id, activity.id, true)}
                        className={`rounded-lg border px-3 py-1 text-xs transition ${
                          cur === true
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        👍 有帮助
                      </button>
                      <button
                        type="button"
                        onClick={() => addFeedback(recent.id, activity.id, false)}
                        className={`rounded-lg border px-3 py-1 text-xs transition ${
                          cur === false
                            ? 'border-neutral-400 bg-neutral-200 text-neutral-700'
                            : 'border-neutral-200 text-neutral-400 hover:bg-neutral-50'
                        }`}
                      >
                        👎 没帮助
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
