// 情绪二维模型：valence(愉悦度) × arousal(唤醒度)
export type Valence = -1 | 1
export type Arousal = -1 | 1

export interface Emotion {
  id: string
  label: string
  emoji: string
  valence: Valence
  arousal: Arousal
  color: string // 分类色，来自 dataviz 验证过的 8 色调色板
}

export interface Trigger {
  id: string
  label: string
  emoji: string
}

export type ActivityType = 'meditation' | 'music' | 'exercise'

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  duration: number // 分钟
  targets: { valence: Valence; arousal: Arousal }[] // 适配的情绪象限
  triggerTags: string[] // 针对的触发标签 id
}

export interface EmotionEntry {
  id: string
  emotionId: string
  intensity: number // 1-10
  triggers: string[] // 触发标签 id 列表
  note?: string
  createdAt: number // 时间戳
}

export interface Feedback {
  entryId: string
  activityId: string
  helpful: boolean
  createdAt: number
}
