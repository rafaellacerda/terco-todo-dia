import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TRosaryCategory } from '@/data/rosary/registry'

export type TRosaryProgress = {
  category: TRosaryCategory
  key: string
  idx: number
}

type TRosaryProgressStore = {
  progress: TRosaryProgress | null
  saveProgress: (category: TRosaryCategory, key: string, idx: number) => void
  clearProgress: () => void
}

export const useRosaryProgressStore = create<TRosaryProgressStore>()(
  persist(
    (set) => ({
      progress: null,
      saveProgress: (category, key, idx) =>
        set({ progress: { category, key, idx } }),
      clearProgress: () => set({ progress: null }),
    }),
    { name: 'terco-progress-v2' },
  ),
)
