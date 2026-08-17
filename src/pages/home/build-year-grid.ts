import type { TRosaryHistory } from '@/stores/use-rosary-history-store'
import { formatDateKey } from '@/utils/date'

const MONTH_ABBR = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]
const WEEKDAY_ABBR = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export type TCalendarDay = {
  key: string
  isFuture: boolean
  isToday: boolean
  level: -1 | 0 | 1 | 2 | 3
  label: string
  names: string[]
}

export type TCalendarWeek = { label: string; days: TCalendarDay[] }

export function buildYearGrid(history: TRosaryHistory): TCalendarWeek[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  start.setDate(start.getDate() - start.getDay())

  const days: Date[] = []
  const cursor = new Date(start)
  while (cursor <= today) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  while (days[days.length - 1].getDay() !== 6) {
    const next = new Date(days[days.length - 1])
    next.setDate(next.getDate() + 1)
    days.push(next)
  }

  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  let lastMonth = -1
  return weeks.map((week) => {
    const monthOfWeek = week[0].getMonth()
    const label = monthOfWeek !== lastMonth ? MONTH_ABBR[monthOfWeek] : ''
    lastMonth = monthOfWeek

    return {
      label,
      days: week.map((day): TCalendarDay => {
        const key = formatDateKey(day)
        const isFuture = day > today
        const names = history[key] ?? []
        const level = isFuture
          ? -1
          : (Math.min(names.length, 3) as 0 | 1 | 2 | 3)
        const isToday = key === formatDateKey(today)
        return {
          key,
          isFuture,
          isToday,
          level,
          label: `${WEEKDAY_ABBR[day.getDay()]}, ${day.getDate()}/${day.getMonth() + 1}`,
          names,
        }
      }),
    }
  })
}

export function currentStreak(history: TRosaryHistory): number {
  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  const hasPrayer = (date: Date) =>
    (history[formatDateKey(date)] ?? []).length > 0
  if (!hasPrayer(cursor)) cursor.setDate(cursor.getDate() - 1)
  while (hasPrayer(cursor)) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}
