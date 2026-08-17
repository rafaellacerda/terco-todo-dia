import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { nameForSet } from '@/data/rosary/registry'
import { useRosaryProgressStore } from '@/stores/use-rosary-progress-store'

export function ResumeBanner() {
  const navigate = useNavigate()
  const progress = useRosaryProgressStore((state) => state.progress)
  const clearProgress = useRosaryProgressStore((state) => state.clearProgress)

  if (!progress) return null

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-primary px-5.5 py-4.5 shadow-[0_6px_20px_oklch(24%_0.06_258_/_.25)]">
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gold">
          Continuar
        </span>
        <span className="text-sm text-primary-foreground/90">
          {nameForSet(progress.category, progress.key)} — passo{' '}
          {progress.idx + 1}
        </span>
      </div>
      <div className="flex gap-2.5">
        <Button
          onClick={() =>
            navigate(`/terco/${progress.category}/${progress.key}`)
          }
          className="h-auto rounded-lg bg-gold px-4.5 py-2.5 text-sm font-semibold text-gold-foreground hover:bg-gold/90"
        >
          Continuar
        </Button>
        <Button
          variant="outline"
          onClick={clearProgress}
          className="h-auto rounded-lg border-primary-foreground/30 bg-transparent px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
        >
          Descartar
        </Button>
      </div>
    </div>
  )
}
