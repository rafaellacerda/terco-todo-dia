import {
  ARCHANGEL_SET_LIST,
  MARIAN_SET_LIST,
  OTHER_CHAPLET_LIST,
  suggestedMarianKeyForToday,
} from '@/data/rosary/registry'
import { RosaryIcon } from '@/components/rosary-icon'
import { MysterySetCard } from '@/pages/home/components/mystery-set-card'
import { ResumeBanner } from '@/pages/home/components/resume-banner'
import { YearCalendar } from '@/pages/home/components/year-calendar'

export function HomePage() {
  const suggestedKey = suggestedMarianKeyForToday()

  return (
    <div className="mx-auto flex w-full max-w-250 flex-col gap-9.5 px-5 py-9 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3.5">
          <RosaryIcon className="h-14 w-auto shrink-0" />
          <h1 className="font-heading text-[clamp(34px,5.5vw,48px)] font-semibold tracking-[0.2px] text-primary">
            Rezar o Terço
          </h1>
        </div>
        <div className="h-0.75 w-14 bg-gold" />
        <p className="max-w-140 text-[15.5px] leading-relaxed text-muted-foreground">
          Escolha um mistério para começar.
        </p>
      </div>

      <YearCalendar />
      <ResumeBanner />

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-[22px] font-semibold text-primary">
          Terço de Nossa Senhora
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {MARIAN_SET_LIST.map((set) => (
            <MysterySetCard
              key={set.key}
              category={set.category}
              setKey={set.key}
              name={set.name}
              day={set.day}
              suggested={set.key === suggestedKey}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-[22px] font-semibold text-primary">
            Terço dos Arcanjos
          </h2>
          <span className="text-[13px] text-muted-foreground">
            A mesma estrutura de dezenas, dedicada a um arcanjo. Comece pelo de
            São Rafael.
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {ARCHANGEL_SET_LIST.map((set) => (
            <MysterySetCard
              key={set.key}
              category={set.category}
              setKey={set.key}
              name={set.name}
              day={set.day}
              className="max-w-85"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-[22px] font-semibold text-primary">
            Outros Terços e Coroas
          </h2>
          <span className="text-[13px] text-muted-foreground">
            Devoções tradicionais, cada uma com sua própria estrutura de contas.
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {OTHER_CHAPLET_LIST.map((set) => (
            <MysterySetCard
              key={set.key}
              category={set.category}
              setKey={set.key}
              name={set.name}
              day={set.day}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
