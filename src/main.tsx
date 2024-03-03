import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "./contexts/ThemeProvider"
import { QueryProvider } from './contexts/QueryProvider'
import { AuthProvider } from './contexts/AuthProvider'
import { TeamsProvider } from './contexts/TeamsProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AuthProvider>
            <TeamsProvider>
              <App />
            </TeamsProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
