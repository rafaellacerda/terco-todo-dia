import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export function RouteErrorBoundary() {
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground">
      <h1 className="font-heading text-3xl font-semibold">
        {isNotFound ? 'Página não encontrada' : 'Algo deu errado'}
      </h1>
      <p className="text-sm text-muted-foreground">
        {isNotFound
          ? 'O endereço acessado não existe.'
          : 'Ocorreu um erro inesperado. Tente novamente.'}
      </p>
      <Link
        to="/"
        className="text-sm font-semibold text-primary underline underline-offset-4"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
