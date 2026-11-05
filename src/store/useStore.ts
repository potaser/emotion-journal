import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EmotionEntry, Feedback } from '../types'

interface StoreState {
  entries: EmotionEntry[]
  feedbacks: Feedback[]
  addEntry: (entry: Omit<EmotionEntry, 'id' | 'createdAt'>) => void
  deleteEntry: (id: string) => void
  addFeedback: (entryId: string, activityId: string, helpful: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      entries: [],
      feedbacks: [],
      addEntry: (entry) =>
        set((s) => ({
          entries: [
            { ...entry, id: crypto.randomUUID(), createdAt: Date.now() },
            ...s.entries,
          ],
        })),
      deleteEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      addFeedback: (entryId, activityId, helpful) =>
        set((s) => ({
          feedbacks: [
            ...s.feedbacks.filter(
              (f) => !(f.entryId === entryId && f.activityId === activityId),
            ),
            { entryId, activityId, helpful, createdAt: Date.now() },
          ],
        })),
    }),
    { name: 'emotion-journal-v1' },
  ),
)
