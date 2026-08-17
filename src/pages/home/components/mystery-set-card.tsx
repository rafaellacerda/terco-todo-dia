import { Link } from 'react-router'
import type { TRosaryCategory } from '@/data/rosary/registry'

type TMysterySetCardProps = {
  category: TRosaryCategory
  setKey: string
  name: string
  day: string
  suggested?: boolean
  className?: string
}

export function MysterySetCard({
  category,
  setKey,
  name,
  day,
  suggested,
  className,
}: TMysterySetCardProps) {
  return (
    <Link
      to={`/terco/${category}/${setKey}`}
      className={`group flex cursor-pointer flex-col gap-4 rounded-2xl border border-border bg-card p-5.5 shadow-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-lg ${className ?? ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gold-foreground/80">
          {day}
        </span>
        {suggested && (
          <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-accent-foreground">
            Hoje
          </span>
        )}
      </div>
      <span className="font-heading text-[23px] font-semibold text-foreground">
        {name}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: purely decorative fixed-length dot row
          <span key={i} className="inline-block size-2 rounded-full bg-gold" />
        ))}
      </div>
    </Link>
  )
}
