import { createContext, type ReactNode } from 'react'
import { env } from '@/config/env'

type TAppConfig = {
  env: typeof env
}

export const AppConfigContext = createContext<TAppConfig>({ env })

export function AppConfigProvider({ children }: { children: ReactNode }) {
  return (
    <AppConfigContext.Provider value={{ env }}>
      {children}
    </AppConfigContext.Provider>
  )
}
