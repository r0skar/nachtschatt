import styled, { DefaultTheme } from 'styled-components'

interface Props {
  fillHeight?: boolean
  breakpoint?: keyof DefaultTheme['breakpoints']
}

export const Wrap = styled.div<Props>`
  height: ${({ fillHeight }) => fillHeight && '100%'};
  max-width: ${({ theme, breakpoint = 'xl' }) => `${theme.breakpoints[breakpoint]}px`};
  padding-left: ${({ theme }) => theme.wrapSpacing};
  padding-right: ${({ theme }) => theme.wrapSpacing};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`
