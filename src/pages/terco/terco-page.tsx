import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { StepType } from '@/data/rosary/build-steps'
import { layoutFor } from '@/data/rosary/geometry'
import {
  buildStepsFor,
  nameForSet,
  type TRosaryCategory,
} from '@/data/rosary/registry'
import { CompletionCard } from '@/pages/terco/components/completion-card'
import { PrayerCard } from '@/pages/terco/components/prayer-card'
import { RosaryVisualization } from '@/pages/terco/components/rosary-visualization'
import { useRosaryHistoryStore } from '@/stores/use-rosary-history-store'
import { useRosaryProgressStore } from '@/stores/use-rosary-progress-store'

const INCLUDE_JACULATORIA = true

export function TercoPage() {
  const { category, key } = useParams() as {
    category: TRosaryCategory
    key: string
  }
  const navigate = useNavigate()
  const progress = useRosaryProgressStore((state) => state.progress)
  const saveProgress = useRosaryProgressStore((state) => state.saveProgress)
  const clearProgress = useRosaryProgressStore((state) => state.clearProgress)
  const recordPrayerDay = useRosaryHistoryStore(
    (state) => state.recordPrayerDay,
  )

  const steps = useMemo(
    () => buildStepsFor(category, key, INCLUDE_JACULATORIA),
    [category, key],
  )
  const layout = useMemo(() => layoutFor(category, key), [category, key])
  const setName = nameForSet(category, key)

  const [stepIndex, setStepIndex] = useState(() => {
    const initial =
      progress && progress.category === category && progress.key === key
        ? Math.min(progress.idx, steps.length - 1)
        : 0
    saveProgress(category, key, initial)
    return initial
  })

  const total = steps.length
  const current = steps[stepIndex]
  const isFinal = current.type === StepType.Final
  const canGoBack = stepIndex > 0 && !isFinal
  const stepLabel = isFinal
    ? 'Concluído'
    : `Passo ${stepIndex + 1} de ${total - 1}`
  const progressPercent = Math.round((stepIndex / (total - 1)) * 100)

  function handleComplete() {
    const next = Math.min(stepIndex + 1, total - 1)
    setStepIndex(next)
    if (steps[next].type === StepType.Final) {
      clearProgress()
      recordPrayerDay(setName)
    } else {
      saveProgress(category, key, next)
    }
  }

  function handleBack() {
    const prev = Math.max(0, stepIndex - 1)
    setStepIndex(prev)
    saveProgress(category, key, prev)
  }

  function handleRestart() {
    setStepIndex(0)
    saveProgress(category, key, 0)
  }

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-5.5 px-4 pt-5.5 pb-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 py-1.5 text-sm font-semibold text-primary/80 hover:text-primary"
        >
          ← Início
        </Link>
        <div className="flex flex-col gap-0.5 text-right">
          <span className="font-heading text-[19px] font-semibold text-primary">
            {setName}
          </span>
          <span className="text-xs text-muted-foreground">{stepLabel}</span>
        </div>
      </div>

      <div className="h-[5px] overflow-hidden rounded-md bg-muted">
        <div
          className="h-full rounded-md bg-gold transition-[width] duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex flex-wrap items-start justify-center gap-9">
        <RosaryVisualization
          steps={steps}
          stepIndex={stepIndex}
          layout={layout}
        />
        {isFinal ? (
          <CompletionCard
            setName={setName}
            onRestart={handleRestart}
            onGoHome={() => navigate('/')}
          />
        ) : (
          <PrayerCard
            step={current}
            canGoBack={canGoBack}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  )
}
