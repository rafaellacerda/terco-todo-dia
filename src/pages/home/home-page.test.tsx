import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { HomePage } from '@/pages/home/home-page'
import { useHomeUiStore } from '@/pages/home/use-home-ui-store'
import { useRosaryHistoryStore } from '@/stores/use-rosary-history-store'
import { useRosaryProgressStore } from '@/stores/use-rosary-progress-store'
import { formatDateKey } from '@/utils/date'

function renderHomePage() {
  const router = createMemoryRouter(
    [
      { path: '/', Component: HomePage },
      {
        path: 'terco/:category/:key',
        Component: () => <div>Tela de oração</div>,
      },
    ],
    { initialEntries: ['/'] },
  )
  render(<RouterProvider router={router} />)
}

describe('HomePage', () => {
  beforeEach(() => {
    useRosaryProgressStore.setState({ progress: null })
    useRosaryHistoryStore.setState({ history: {} })
    useHomeUiStore.setState({ selectedDay: null })
  })

  it('renders the Marian, archangel, and other-chaplet mystery sets', () => {
    renderHomePage()
    expect(screen.getByText('Mistérios Gozosos')).toBeInTheDocument()
    expect(screen.getByText('São Rafael Arcanjo')).toBeInTheDocument()
    expect(screen.getByText('Divina Misericórdia')).toBeInTheDocument()
  })

  it('navigates to the prayer flow when a mystery set card is clicked', async () => {
    renderHomePage()
    await userEvent.click(screen.getByText('Mistérios Gozosos'))
    expect(await screen.findByText('Tela de oração')).toBeInTheDocument()
  })

  it('only shows the resume banner when there is saved progress', async () => {
    renderHomePage()
    expect(
      screen.queryByRole('button', { name: 'Continuar' }),
    ).not.toBeInTheDocument()

    useRosaryProgressStore.setState({
      progress: { category: 'maria', key: 'gozosos', idx: 3 },
    })
    expect(
      await screen.findByRole('button', { name: 'Continuar' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Mistérios Gozosos — passo 4/)).toBeInTheDocument()
  })

  it('shows the prayed names for a day with history when clicked', async () => {
    const todayKey = formatDateKey(new Date())
    useRosaryHistoryStore.setState({
      history: { [todayKey]: ['Mistérios Gozosos'] },
    })
    renderHomePage()

    await userEvent.click(screen.getByTestId('calendar-today'))
    expect(screen.getByText('✦ Mistérios Gozosos')).toBeInTheDocument()
  })
})
