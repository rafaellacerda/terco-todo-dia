import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import { TercoPage } from '@/pages/terco/terco-page'
import { useRosaryHistoryStore } from '@/stores/use-rosary-history-store'
import { useRosaryProgressStore } from '@/stores/use-rosary-progress-store'

function renderTercoPage(initialPath = '/terco/maria/gozosos') {
  const router = createMemoryRouter(
    [
      { path: '/', Component: () => <div>Início</div> },
      { path: '/terco/:category/:key', Component: TercoPage },
    ],
    { initialEntries: [initialPath] },
  )
  render(<RouterProvider router={router} />)
}

describe('TercoPage', () => {
  beforeEach(() => {
    useRosaryProgressStore.setState({ progress: null })
    useRosaryHistoryStore.setState({ history: {} })
  })

  it('starts on the first step with no back button', () => {
    renderTercoPage()
    expect(screen.getByText('Sinal da Cruz')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Voltar' }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Passo 1 de 74')).toBeInTheDocument()
  })

  it('advances to the next step and saves progress when Concluir is clicked', async () => {
    renderTercoPage()
    await userEvent.click(screen.getByRole('button', { name: 'Concluir →' }))
    expect(
      screen.getByText('Creio (Símbolo dos Apóstolos)'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
    expect(useRosaryProgressStore.getState().progress).toEqual({
      category: 'maria',
      key: 'gozosos',
      idx: 1,
    })
  })

  it('goes back to the previous step when Voltar is clicked', async () => {
    renderTercoPage()
    await userEvent.click(screen.getByRole('button', { name: 'Concluir →' }))
    await userEvent.click(screen.getByRole('button', { name: 'Voltar' }))
    expect(screen.getByText('Sinal da Cruz')).toBeInTheDocument()
  })

  it('shows the completion card and records history after the last step', async () => {
    renderTercoPage()
    const total = 75
    for (let i = 0; i < total - 1; i++) {
      // biome-ignore lint/nursery/noAwaitInLoop: sequential prayer steps must be clicked in order
      await userEvent.click(screen.getByRole('button', { name: 'Concluir →' }))
    }
    expect(screen.getByText('Terço concluído')).toBeInTheDocument()
    expect(useRosaryProgressStore.getState().progress).toBeNull()

    const history = useRosaryHistoryStore.getState().history
    const todayEntries = Object.values(history).flat()
    expect(todayEntries).toContain('Mistérios Gozosos')
  })
})
