import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import '@/assets/styles/globals.css'
import { AppConfigProvider } from '@/config/app-context'
import { queryClient } from '@/config/query-client'
import { appRouter } from '@/routes/app-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppConfigProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
      </QueryClientProvider>
    </AppConfigProvider>
  </StrictMode>,
)
