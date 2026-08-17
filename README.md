# Rezar o Terço

Aplicativo web (PWA) para rezar o terço e outras coroas e devoções católicas, com acompanhamento passo a passo das orações e histórico de dias em que o usuário rezou.

## O que o projeto faz

- **Terço de Nossa Senhora**: os quatro conjuntos de mistérios (Gozosos, Dolorosos, Gloriosos, Luminosos), com sugestão automática do mistério do dia conforme o dia da semana.
- **Terço dos Arcanjos**: devoções a São Rafael, São Gabriel e São Miguel.
- **Outras coroas e devoções**: Divina Misericórdia, Nossa Senhora das Dores, Coroa Franciscana, Espírito Santo, São José e São Bento.
- **Fluxo guiado de oração**: cada devoção é convertida numa sequência de passos (orações, mistérios, jaculatórias) que o usuário avança um a um, com visualização do terço/contas na tela e barra de progresso.
- **Progresso persistente**: se o usuário sair no meio de uma oração, o passo em que parou é salvo e retomado depois (`use-rosary-progress-store`).
- **Histórico de orações**: um calendário anual na home mostra em quais dias o usuário completou alguma oração (`use-rosary-history-store`).
- **PWA**: instalável, com service worker (`vite-plugin-pwa`, `autoUpdate`) e ícones/manifesto para uso como app standalone.

## Arquitetura

### Stack

React 19 + TypeScript + Vite, Tailwind CSS v4, shadcn/ui (style `radix-nova`), React Router v7, Zustand (estado global persistido em `localStorage`), Vitest + Testing Library. TanStack Query está configurado (`src/config/query-client.ts`) mas o app hoje não depende de servidor: todo o conteúdo das orações é estático, embutido no bundle.

### Roteamento

- `src/main.tsx` é o único ponto de entrada: `AppConfigContext.Provider` → `QueryClientProvider` → `RouterProvider`.
- `src/routes/app-router.tsx` define duas rotas sob o layout raiz (`AppLayout`):
  - `/` → `HomePage` (lista de devoções disponíveis)
  - `/terco/:category/:key` → `TercoPage` (fluxo de oração de uma devoção específica, ex.: `/terco/maria/gozosos`)
- Cada rota é carregada via `lazy` do React Router (chunk próprio por página) e tem seu próprio `errorElement` (`RouteErrorBoundary`), que também cobre 404 de rotas não encontradas.

### Domínio das orações (`src/data/rosary/`)

Camada central de dados/lógica, independente de UI:

- `mystery-sets.ts` — conteúdo estático de cada devoção (textos dos mistérios, orações de abertura/fechamento, invocações, dores/alegrias, dons etc.).
- `registry.ts` — agrega as devoções em listas por categoria (`MARIAN_SET_LIST`, `ARCHANGEL_SET_LIST`, `OTHER_CHAPLET_LIST`), resolve nome/mistério sugerido do dia, e expõe `buildStepsFor(category, key, ...)` como ponto único de entrada para gerar os passos de uma devoção.
- `build-steps.ts` — transforma os dados estáticos de cada devoção numa sequência linear de `TStep` (tipo de passo: oração, mistério, jaculatória, final...) que a página de oração percorre.
- `geometry.ts` — calcula o layout visual (posição das contas) do terço/coroa para cada tipo de devoção, usado por `RosaryVisualization`.

### Páginas (`src/pages/`)

- `home/` — `HomePage` lista as devoções (marianas, arcanjos, outras) e mostra `YearCalendar` (histórico) e `ResumeBanner` (retomar oração em andamento). Estado de UI local da tela fica em `use-home-ui-store.ts`.
- `terco/` — `TercoPage` conduz o passo a passo de uma devoção: `RosaryVisualization` (contas), `PrayerCard` (texto da oração atual + navegação) e `CompletionCard` (tela final, com opção de reiniciar).

### Estado

- **Zustand + persist** para estado que precisa sobreviver a reloads: progresso da oração atual (`use-rosary-progress-store`) e histórico de dias orados (`use-rosary-history-store`), ambos em `src/stores/`.
- Estado de UI restrito a uma tela (ex.: `use-home-ui-store.ts`) fica colocalizado dentro da própria pasta da página, não em `src/stores`.

### Outras pastas

- `src/components/` — componentes globais sem lógica de tela (ex.: `RosaryIcon`) e os componentes gerados pelo shadcn/ui em `components/ui`.
- `src/layout/app-layout.tsx` — shell persistente (navegação + `<Outlet />`) compartilhado por todas as rotas.
- `src/config/` — acesso a variáveis de ambiente validadas com Zod (`env.ts`), `QueryClient` do TanStack Query, e contexto de configuração do app.
- `src/utils/` — utilidades genéricas (`cn.ts` para merge de classes Tailwind, `date.ts` para formatação de datas usada no histórico).

## Comandos

```bash
npm run dev            # servidor de desenvolvimento (Vite)
npm run build           # tsc -b && vite build — também serve como typecheck
npm run lint             # oxlint
npm run test              # vitest run (execução única)
npm run test:watch        # vitest em modo watch
npm run format             # biome format --write .
npm run format:check        # biome format . (checagem, sem escrever)
```

Linting é feito só com `oxlint` (`.oxlintrc.json`); formatação é feita só com Biome (`biome.json`), com o linter do Biome desativado para não conflitar com o oxlint.
