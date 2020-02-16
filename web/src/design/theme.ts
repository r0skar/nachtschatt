import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  baseline: 1.5,
  baseTextSize: 'calc(12px + 0.35vmin)',
  appHeaderHeight: '15vh',
  scale: factor => `${0.5 * factor * theme.baseline}rem`,
  colors: {
    bg: '#ffffff',
    fg: '#222222',
    primary: '#ff0000',
    subtle: '#eeeeee'
  },
  fonts: {
    sans: 'Raleway',
    serif: 'Raleway'
  },
  breakpoints: {
    xs: 540,
    sm: 760,
    md: 1024,
    lg: 1200,
    xl: 1600
  }
}
