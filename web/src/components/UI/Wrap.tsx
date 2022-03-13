import styled, { DefaultTheme } from 'styled-components'

interface Props {
  fillHeight?: boolean
  pinRight?: boolean
  pinLeft?: boolean
  breakpoint?: keyof DefaultTheme['breakpoints']
}

export const Wrap = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ fillHeight }) => fillHeight && '100%'};
  height: ${({ fillHeight }) => fillHeight && '-webkit-fill-available'};
  flex: ${({ fillHeight }) => fillHeight && '1'};
  padding-right: ${({ theme, pinRight }) => !pinRight && theme.wrapSpacing};
  padding-left: ${({ theme, pinLeft }) => !pinLeft && theme.wrapSpacing};
  margin-right: ${({ pinRight }) => !pinRight && 'auto'};
  margin-left: ${({ pinLeft }) => !pinLeft && 'auto'};
  max-width: ${({ theme, pinRight, pinLeft, breakpoint = 'xl' }) =>
    pinRight || pinLeft
      ? `calc(100vw -((100vw - ${theme.breakpoints[breakpoint]}px) / 2))`
      : `${theme.breakpoints[breakpoint]}px`};
`
