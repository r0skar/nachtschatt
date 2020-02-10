import 'styled-components'

type FontFamilies = 'sans' | 'serif'
type Colors = 'fg' | 'bg' | 'primary' | 'subtle'
type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

declare module 'styled-components' {
  export interface DefaultTheme {
    baseline: number
    baseTextSize: string
    appHeaderHeight: string
    scale: (n: number) => string
    colors: Record<Colors, string>
    fonts: Record<FontFamilies, string>
    breakpoints: Record<Breakpoints, number>
  }
}
