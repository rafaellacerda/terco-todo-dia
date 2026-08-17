import { useMemo } from 'react'
import { buildYearGrid, currentStreak } from '@/pages/home/build-year-grid'
import { useHomeUiStore } from '@/pages/home/use-home-ui-store'
import { useRosaryHistoryStore } from '@/stores/use-rosary-history-store'

const LEVEL_BACKGROUND = [
  'oklch(93% 0.012 80)',
  'oklch(88% 0.09 83)',
  'oklch(76% 0.13 83)',
  'oklch(58% 0.13 82)',
]

export function YearCalendar() {
  const history = useRosaryHistoryStore((state) => state.history)
  const selectedDay = useHomeUiStore((state) => state.selectedDay)
  const selectDay = useHomeUiStore((state) => state.selectDay)
  const closeSelectedDay = useHomeUiStore((state) => state.closeSelectedDay)

  const weeks = useMemo(() => buildYearGrid(history), [history])
  const statDays = useMemo(() => {
    const thisYear = String(new Date().getFullYear())
    return Object.entries(history).filter(
      ([key, names]) => key.startsWith(thisYear) && names.length > 0,
    ).length
  }, [history])
  const statStreak = useMemo(() => currentStreak(history), [history])

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-5.5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-heading text-[19px] font-semibold text-foreground">
          Seu ano em oração
        </h2>
        <div className="flex gap-4.5">
          <span className="text-[13px] text-muted-foreground">
            <b className="text-foreground">{statDays}</b> dias este ano
          </span>
          <span className="text-[13px] text-muted-foreground">
            <b className="text-foreground">{statStreak}</b> dias seguidos
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]">
          {weeks.map((week, weekIdx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: weeks are a fixed, non-reordering sequence
            <div key={weekIdx} className="flex flex-col gap-[3px]">
              <span className="h-3 text-[9px] leading-3 text-muted-foreground">
                {week.label}
              </span>
              {week.days.map((day) => (
                <button
                  key={day.key}
                  type="button"
                  data-testid={day.isToday ? 'calendar-today' : undefined}
                  disabled={day.isFuture}
                  title={
                    day.isFuture
                      ? undefined
                      : `${day.label} — ${day.names.length > 0 ? `${day.names.length} ${day.names.length === 1 ? 'terço' : 'terços'}` : 'sem oração'}`
                  }
                  onClick={() => selectDay(day)}
                  className="box-border size-[11px] rounded-[2px] disabled:cursor-default"
                  style={{
                    background: day.isFuture
                      ? 'transparent'
                      : LEVEL_BACKGROUND[day.level],
                    border: day.isFuture
                      ? 'none'
                      : day.isToday
                        ? '1.5px solid oklch(26% 0.06 258)'
                        : '1px solid oklch(88% 0.015 80)',
                    cursor: day.isFuture ? 'default' : 'pointer',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="flex flex-col gap-2 rounded-[10px] bg-muted px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[13.5px] font-semibold text-foreground">
              {selectedDay.label}
            </span>
            <button
              type="button"
              onClick={closeSelectedDay}
              className="cursor-pointer border-none bg-transparent p-0 text-base leading-none text-muted-foreground"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
          {selectedDay.names.length > 0 ? (
            selectedDay.names.map((name, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: multiple rosaries of the same name can be prayed on the same day
              <span key={i} className="text-[13.5px] text-foreground/90">
                ✦ {name}
              </span>
            ))
          ) : (
            <span className="text-[13.5px] text-muted-foreground">
              Nenhum terço rezado neste dia.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
