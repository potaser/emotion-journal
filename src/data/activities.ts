import type { Activity } from '../types'

// 自助调节内容库。targets 声明该活动适配的情绪象限（valence/arousal），
// triggerTags 声明它对哪些触发因素更有效（用于触发加权）。
export const activities: Activity[] = [
  {
    id: 'breath',
    type: 'meditation',
    title: '4-7-8 呼吸法',
    description: '吸气 4 秒、屏息 7 秒、呼气 8 秒，重复 4 轮，快速平复紧张与焦虑。',
    duration: 5,
    targets: [{ valence: -1, arousal: 1 }],
    triggerTags: ['sleep', 'work', 'other'],
  },
  {
    id: 'body-scan',
    type: 'meditation',
    title: '身体扫描',
    description: '从脚到头逐步放松每一个部位，缓解疲惫，适合睡前或久坐后。',
    duration: 10,
    targets: [{ valence: -1, arousal: -1 }],
    triggerTags: ['sleep', 'health', 'family'],
  },
  {
    id: 'mindful',
    type: 'meditation',
    title: '正念观察',
    description: '不带评判地觉察当下的念头与感受，练习与情绪共处。',
    duration: 8,
    targets: [{ valence: -1, arousal: 1 }, { valence: 1, arousal: 1 }],
    triggerTags: ['growth', 'relationship'],
  },
  {
    id: 'gratitude',
    type: 'meditation',
    title: '感恩三件事',
    description: '写下今天值得感恩的三件小事，让平静的心情更持久。',
    duration: 5,
    targets: [{ valence: 1, arousal: -1 }],
    triggerTags: ['growth', 'family', 'relationship'],
  },
  {
    id: 'nature',
    type: 'music',
    title: '自然音景',
    description: '鸟鸣、溪流或风声，安放一颗安静下来的心。',
    duration: 15,
    targets: [{ valence: 1, arousal: -1 }],
    triggerTags: ['weather', 'sleep'],
  },
  {
    id: 'piano',
    type: 'music',
    title: '舒缓钢琴',
    description: '听轻柔的钢琴曲，让心率放慢、思绪安静下来。',
    duration: 15,
    targets: [{ valence: -1, arousal: 1 }],
    triggerTags: ['sleep', 'weather', 'work'],
  },
  {
    id: 'white-noise',
    type: 'music',
    title: '白噪音',
    description: '雨声、海浪或风扇声，屏蔽干扰，助眠或专注。',
    duration: 20,
    targets: [{ valence: -1, arousal: 1 }, { valence: -1, arousal: -1 }],
    triggerTags: ['sleep', 'health'],
  },
  {
    id: 'upbeat',
    type: 'music',
    title: '轻快歌单',
    description: '节奏明快的音乐，提振情绪，为低沉的一天注入活力。',
    duration: 15,
    targets: [{ valence: -1, arousal: -1 }, { valence: 1, arousal: 1 }],
    triggerTags: ['weather', 'diet'],
  },
  {
    id: 'walk',
    type: 'exercise',
    title: '出门散步',
    description: '到户外走 20 分钟，晒晒太阳、呼吸新鲜空气，转换心情。',
    duration: 20,
    targets: [{ valence: -1, arousal: 1 }, { valence: 1, arousal: 1 }],
    triggerTags: ['weather', 'health', 'growth'],
  },
  {
    id: 'stretch',
    type: 'exercise',
    title: '肩颈拉伸',
    description: '活动久坐僵硬的肩颈与背部，释放身体的紧张。',
    duration: 5,
    targets: [{ valence: -1, arousal: 1 }],
    triggerTags: ['work', 'health'],
  },
  {
    id: 'jump',
    type: 'exercise',
    title: '开合跳 3 组',
    description: '每组 30 秒的高抬腿/开合跳，快速唤醒身体与精神。',
    duration: 5,
    targets: [{ valence: -1, arousal: -1 }, { valence: 1, arousal: 1 }],
    triggerTags: ['health', 'diet'],
  },
  {
    id: 'yoga',
    type: 'exercise',
    title: '放松瑜伽',
    description: '做几组舒缓的伸展体式，配合呼吸，放松身心。',
    duration: 15,
    targets: [{ valence: -1, arousal: 1 }, { valence: -1, arousal: -1 }],
    triggerTags: ['growth', 'family', 'relationship'],
  },
]

const map = new Map(activities.map((a) => [a.id, a]))

export function activityById(id: string): Activity | undefined {
  return map.get(id)
}

export const activityTypeMeta: Record<
  Activity['type'],
  { label: string; emoji: string }
> = {
  meditation: { label: '冥想', emoji: '🧘' },
  music: { label: '音乐', emoji: '🎵' },
  exercise: { label: '运动', emoji: '🏃' },
}
