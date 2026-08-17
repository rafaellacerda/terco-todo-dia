import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/layout/app-layout'
import { RouteErrorBoundary } from '@/routes/route-error-boundary'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        errorElement: <RouteErrorBoundary />,
        lazy: async () => {
          const { HomePage } = await import('@/pages/home/home-page')
          return { Component: HomePage }
        },
      },
      {
        path: 'terco/:category/:key',
        errorElement: <RouteErrorBoundary />,
        lazy: async () => {
          const { TercoPage } = await import('@/pages/terco/terco-page')
          return { Component: TercoPage }
        },
      },
    ],
  },
])
