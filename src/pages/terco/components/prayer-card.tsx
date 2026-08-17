import { Button } from '@/components/ui/button'
import type { TStep } from '@/data/rosary/build-steps'

type TPrayerCardProps = {
  step: TStep
  canGoBack: boolean
  onBack: () => void
  onComplete: () => void
}

export function PrayerCard({
  step,
  canGoBack,
  onBack,
  onComplete,
}: TPrayerCardProps) {
  return (
    <div className="flex min-w-70 max-w-115 flex-1 basis-95 flex-col gap-4 rounded-2xl border border-border bg-card px-8 pt-8 pb-6.5 shadow-lg">
      <div className="flex flex-col gap-1">
        {step.subtitle && (
          <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-gold-foreground/80">
            {step.subtitle}
          </span>
        )}
        <h3 className="font-heading text-[25px] font-semibold text-primary">
          {step.title}
        </h3>
      </div>
      <p className="whitespace-pre-line text-base leading-[1.8] text-foreground">
        {step.text}
      </p>
      <div className="mt-2.5 flex justify-end gap-3">
        {canGoBack && (
          <Button
            variant="outline"
            className="h-auto rounded-[9px] px-4.5 py-2.5 text-sm"
            onClick={onBack}
          >
            Voltar
          </Button>
        )}
        <Button
          onClick={onComplete}
          className="h-auto rounded-[9px] bg-primary px-5.5 py-2.5 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Concluir →
        </Button>
      </div>
    </div>
  )
}
