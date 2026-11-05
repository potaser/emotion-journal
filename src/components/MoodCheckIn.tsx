import { useState } from 'react'
import { useStore } from '../store/useStore'
import { emotions } from '../data/emotions'
import { triggers } from '../data/triggers'

const card = 'rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-card'

export default function MoodCheckIn() {
  const addEntry = useStore((s) => s.addEntry)
  const [emotionId, setEmotionId] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [selected, setSelected] = useState<string[]>([])
  const [note, setNote] = useState('')

  const toggleTrigger = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const save = () => {
    if (!emotionId) return
    addEntry({
      emotionId,
      intensity,
      triggers: selected,
      note: note.trim() || undefined,
    })
    setEmotionId(null)
    setIntensity(5)
    setSelected([])
    setNote('')
  }

  return (
    <section className={card}>
      <h2 className="mb-4 text-base font-semibold">此刻的心情</h2>

      <div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {emotions.map((e) => {
          const active = emotionId === e.id
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setEmotionId(e.id)}
              aria-pressed={active}
              className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-3 transition ${
                active ? 'border-transparent' : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              style={
                active
                  ? { boxShadow: `0 0 0 2px ${e.color}`, backgroundColor: `${e.color}18` }
                  : undefined
              }
            >
              <span className="text-2xl leading-none">{e.emoji}</span>
              <span className="text-xs text-neutral-600">{e.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mb-5">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-neutral-600">强度</span>
          <span className="font-semibold tabular-nums">{intensity}</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full accent-neutral-700"
        />
      </div>

      <div className="mb-5">
        <p className="mb-2 text-sm text-neutral-600">是什么触发了它？（可多选）</p>
        <div className="flex flex-wrap gap-2">
          {triggers.map((t) => {
            const active = selected.includes(t.id)
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleTrigger(t.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  active
                    ? 'border-neutral-700 bg-neutral-800 text-white'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {t.emoji} {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-sm text-neutral-600">备注（可选）</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="此刻发生了什么？"
          className="w-full resize-none rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
        />
      </div>

      <button
        type="button"
        onClick={save}
        disabled={!emotionId}
        className="w-full rounded-xl bg-neutral-800 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        记录此刻
      </button>
    </section>
  )
}
