import type { Activity, EmotionEntry, Feedback } from '../types'
import { activities } from '../data/activities'
import { emotionById } from '../data/emotions'

export interface ScoredActivity {
  activity: Activity
  score: number
  reasons: string[]
}

// 规则 + 反馈加权推荐引擎：
//   score = 象限匹配(baseScore) + 触发加权(triggerBonus) + 历史反馈(feedbackScore)
export function recommend(
  entries: EmotionEntry[],
  feedbacks: Feedback[],
): ScoredActivity[] {
  const recent = entries[0]
  if (!recent) return []
  const emo = emotionById(recent.emotionId)
  if (!emo) return []

  const scored = activities.map((a) => {
    let score = 0
    const reasons: string[] = []

    const exact = a.targets.some(
      (t) => t.valence === emo.valence && t.arousal === emo.arousal,
    )
    const sameValence = a.targets.some((t) => t.valence === emo.valence)
    if (exact) {
      score += 3
      reasons.push('精准匹配当前情绪')
    } else if (sameValence) {
      score += 1.5
      reasons.push('契合当下心境')
    }

    const hitTriggers = a.triggerTags.filter((t) => recent.triggers.includes(t))
    if (hitTriggers.length) {
      score += hitTriggers.length * 1.5
      reasons.push('针对你提到的触发因素')
    }

    const related = feedbacks.filter((f) => f.activityId === a.id)
    let fbScore = 0
    for (const f of related) fbScore += f.helpful ? 1 : -0.5
    score += fbScore
    if (related.length && fbScore > 0) reasons.push('过去对你有帮助')

    return { activity: a, score, reasons }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
