import styled, { DefaultTheme } from 'styled-components'

interface Props {
  fillHeight?: boolean
  breakpoint?: keyof DefaultTheme['breakpoints']
}

export const Wrap = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: ${({ fillHeight }) => fillHeight && '100%'};
  height: ${({ fillHeight }) => fillHeight && '-webkit-fill-available'};
  flex: ${({ fillHeight }) => fillHeight && '1'};
  max-width: ${({ theme, breakpoint = 'xl' }) => `${theme.breakpoints[breakpoint]}px`};
  padding-left: ${({ theme }) => theme.wrapSpacing};
  padding-right: ${({ theme }) => theme.wrapSpacing};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`
