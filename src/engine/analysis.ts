import type { EmotionEntry } from '../types'
import { emotionById } from '../data/emotions'
import { triggerById } from '../data/triggers'

export interface TriggerStat {
  triggerId: string
  label: string
  emoji: string
  count: number
  avgIntensity: number
  negativeCount: number
}

// 聚合每个触发标签的出现次数、平均强度、负向情绪次数
export function analyzeTriggers(entries: EmotionEntry[]): TriggerStat[] {
  const acc = new Map<string, { count: number; sum: number; neg: number }>()
  for (const e of entries) {
    const emo = emotionById(e.emotionId)
    for (const t of e.triggers) {
      const cur = acc.get(t) ?? { count: 0, sum: 0, neg: 0 }
      cur.count++
      cur.sum += e.intensity
      if (emo && emo.valence === -1) cur.neg++
      acc.set(t, cur)
    }
  }
  return [...acc.entries()]
    .map(([triggerId, v]) => {
      const t = triggerById(triggerId)
      return {
        triggerId,
        label: t?.label ?? triggerId,
        emoji: t?.emoji ?? '✨',
        count: v.count,
        avgIntensity: v.sum / v.count,
        negativeCount: v.neg,
      }
    })
    .sort((a, b) => b.negativeCount - a.negativeCount || b.avgIntensity - a.avgIntensity)
}

// 最近一条记录（entries 已按时间倒序）
export function recentEntry(entries: EmotionEntry[]): EmotionEntry | undefined {
  return entries[0]
}

export interface EmotionCount {
  emotionId: string
  label: string
  emoji: string
  color: string
  count: number
}

// 各情绪出现次数（用于分布图）
export function emotionDistribution(entries: EmotionEntry[]): EmotionCount[] {
  const acc = new Map<string, number>()
  for (const e of entries) {
    acc.set(e.emotionId, (acc.get(e.emotionId) ?? 0) + 1)
  }
  return [...acc.entries()]
    .map(([emotionId, count]) => {
      const emo = emotionById(emotionId)
      return {
        emotionId,
        label: emo?.label ?? emotionId,
        emoji: emo?.emoji ?? '😶',
        color: emo?.color ?? '#898781',
        count,
      }
    })
    .sort((a, b) => b.count - a.count)
}

export interface TrendPoint {
  time: number
  label: string
  intensity: number
  emotionLabel: string
  emoji: string
}

// 趋势图数据：按时间升序
export function trendData(entries: EmotionEntry[]): TrendPoint[] {
  return [...entries]
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((e) => {
      const emo = emotionById(e.emotionId)
      const d = new Date(e.createdAt)
      return {
        time: e.createdAt,
        label: `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
        intensity: e.intensity,
        emotionLabel: emo?.label ?? '',
        emoji: emo?.emoji ?? '😶',
      }
    })
}
