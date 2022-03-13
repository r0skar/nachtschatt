import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  baseline: 1.5,
  baseTextSize: 'calc(12px + 0.25vmin)',
  wrapSpacing: '5vw',
  appHeaderHeight: '10vh',
  scale: factor => `${0.5 * factor * theme.baseline}rem`,
  colors: {
    bg: '#ffffff',
    fg: '#222222',
    primary: '#CC1619',
    subtle: '#aaaaaa'
  },
  fonts: {
    sans: 'Raleway',
    serif: 'Raleway'
  },
  breakpoints: {
    xs: 540,
    sm: 760,
    md: 1024,
    lg: 1400,
    xl: 1920
  }
}
