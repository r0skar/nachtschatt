import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { ContentProvider } from './store/content'
import { theme } from './design/theme'
import { GlobalStyle } from './design/globalStyle'
import { AppHeader } from './components/AppHeader'
import { AppMain } from './components/AppMain'
import { AppNav } from './components/AppNav'

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ContentProvider>
      <BrowserRouter>
        <GlobalStyle />
        <AppNav />
        <AppHeader />
        <AppMain />
      </BrowserRouter>
    </ContentProvider>
  </ThemeProvider>
)
