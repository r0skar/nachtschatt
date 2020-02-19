/* eslint-disable import/no-webpack-loader-syntax */
import { createGlobalStyle } from 'styled-components'
import destyle from '!!raw-loader!@r0skar/destyle.css/destyle.css'
import { styledScrollbar } from './mixins'

export const GlobalStyle = createGlobalStyle`
  ${destyle}

  *::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bg};
  }

  html, body, #root {
    height: 100%;
    height: fill-available;
  }

  html {
    ${styledScrollbar()}
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.fg};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.baseTextSize};
    line-height: ${({ theme }) => theme.baseline};
    overflow-y: scroll;
  }

  body {
    font-size: 1rem;
  }

  img, svg, [disabled] {
    user-select: none;
  }
`
