import { Button } from '@/components/ui/button'

type TCompletionCardProps = {
  setName: string
  onRestart: () => void
  onGoHome: () => void
}

export function CompletionCard({
  setName,
  onRestart,
  onGoHome,
}: TCompletionCardProps) {
  return (
    <div className="flex min-w-70 max-w-115 flex-1 basis-95 flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8.5 py-11 text-center shadow-lg">
      <span className="text-[30px] text-gold">✝</span>
      <h2 className="font-heading text-[27px] font-semibold text-primary">
        Terço concluído
      </h2>
      <p className="text-[14.5px] leading-relaxed text-muted-foreground">
        Você rezou o terço completo de {setName}. Que essa oração traga paz ao
        seu dia.
      </p>
      <div className="mt-2 flex gap-3">
        <Button
          variant="outline"
          className="h-auto rounded-[9px] px-5 py-3 text-sm"
          onClick={onRestart}
        >
          Rezar novamente
        </Button>
        <Button
          onClick={onGoHome}
          className="h-auto rounded-[9px] bg-primary px-5.5 py-3 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Voltar ao início
        </Button>
      </div>
    </div>
  )
}
