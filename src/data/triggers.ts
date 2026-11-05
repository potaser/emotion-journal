import type { Trigger } from '../types'

export const triggers: Trigger[] = [
  { id: 'work', label: '工作/学习', emoji: '💼' },
  { id: 'relationship', label: '人际关系', emoji: '👥' },
  { id: 'family', label: '家庭', emoji: '🏠' },
  { id: 'health', label: '健康', emoji: '🩺' },
  { id: 'sleep', label: '睡眠', emoji: '😴' },
  { id: 'diet', label: '饮食', emoji: '🍽️' },
  { id: 'money', label: '经济', emoji: '💰' },
  { id: 'weather', label: '天气/环境', emoji: '🌦️' },
  { id: 'growth', label: '自我成长', emoji: '🌱' },
  { id: 'other', label: '其他', emoji: '✨' },
]

const map = new Map(triggers.map((t) => [t.id, t]))

export function triggerById(id: string): Trigger | undefined {
  return map.get(id)
}
