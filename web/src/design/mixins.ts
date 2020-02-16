import { css } from 'styled-components'

interface ScrollbarProps {
  direction?: 'x' | 'y'
}

export const styledScrollbar = ({ direction = 'y' }: ScrollbarProps = {}) => css`
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2);
  scrollbar-width: thin;
  overflow-x: ${direction === 'x' ? 'scroll' : 'none'};
  overflow-y: ${direction === 'y' ? 'scroll' : 'none'};
  overscroll-behavior-x: none;
  overscroll-behavior-y: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const styledArticle = () => css`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.scale(4)};
  }

  & h2, h3 {
    margin-bottom: ${({ theme }) => theme.scale(2)};
  }

  & a {
    text-decoration: dotted;
  }
`
