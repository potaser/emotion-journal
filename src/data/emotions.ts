import type { Emotion } from '../types'

// 8 种离散情绪，映射到 valence × arousal 二维坐标。
// 颜色取自 dataviz skill 验证过的 8 色分类调色板（光模式），
// 每个情绪另有 emoji 作为非颜色标识，避免仅凭颜色识别。
export const emotions: Emotion[] = [
  { id: 'joy', label: '开心', emoji: '😊', valence: 1, arousal: 1, color: '#eda100' },
  { id: 'excited', label: '兴奋', emoji: '🤩', valence: 1, arousal: 1, color: '#eb6834' },
  { id: 'calm', label: '平静', emoji: '😌', valence: 1, arousal: -1, color: '#008300' },
  { id: 'anxious', label: '焦虑', emoji: '😰', valence: -1, arousal: 1, color: '#e87ba4' },
  { id: 'angry', label: '愤怒', emoji: '😠', valence: -1, arousal: 1, color: '#e34948' },
  { id: 'fear', label: '恐惧', emoji: '😨', valence: -1, arousal: 1, color: '#4a3aa7' },
  { id: 'sad', label: '悲伤', emoji: '😢', valence: -1, arousal: -1, color: '#2a78d6' },
  { id: 'tired', label: '疲惫', emoji: '😮‍💨', valence: -1, arousal: -1, color: '#1baf7a' },
]

const map = new Map(emotions.map((e) => [e.id, e]))

export function emotionById(id: string): Emotion | undefined {
  return map.get(id)
}
