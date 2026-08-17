import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { formatDateKey } from '@/utils/date'

export type TRosaryHistory = Record<string, string[]>

type TRosaryHistoryStore = {
  history: TRosaryHistory
  recordPrayerDay: (name: string) => void
}

export const useRosaryHistoryStore = create<TRosaryHistoryStore>()(
  persist(
    (set, get) => ({
      history: {},
      recordPrayerDay: (name) => {
        const key = formatDateKey(new Date())
        const history = { ...get().history }
        history[key] = [...(history[key] ?? []), name]
        set({ history })
      },
    }),
    { name: 'terco-history-v1' },
  ),
)
