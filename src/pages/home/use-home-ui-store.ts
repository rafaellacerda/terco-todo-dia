import { create } from 'zustand'
import type { TCalendarDay } from '@/pages/home/build-year-grid'

type THomeUiStore = {
  selectedDay: TCalendarDay | null
  selectDay: (day: TCalendarDay) => void
  closeSelectedDay: () => void
}

export const useHomeUiStore = create<THomeUiStore>((set) => ({
  selectedDay: null,
  selectDay: (day) => set({ selectedDay: day }),
  closeSelectedDay: () => set({ selectedDay: null }),
}))
