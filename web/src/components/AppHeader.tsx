import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useContent } from '../store/content'
import { Link, useLocation } from 'react-router-dom'
import { Wrap } from './UI'

interface Props {
  hasSolidBg: boolean
  toggleNav: () => void
}

const subTitleTransition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const subTitleVariants = {
  initial: { opacity: 0, x: -10 },
  enter: { opacity: 1, x: 0 }
}

const Container = styled.header<{ hasSolidBg: boolean }>`
  background-color: ${({ theme, hasSolidBg }) => hasSolidBg && theme.colors.bg};
  height: ${({ theme }) => theme.appHeaderHeight};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
`

const Grid = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr max-content;
`

const MainTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
`

const SubTitle = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.subtle};
  font-size: 1.5rem;
  text-transform: uppercase;
  padding-left: 1ch;

  /* Only hide it visually in order to keep the grid layout as is. */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    visibility: hidden;
    width: 0;
  }
`

const NavButton = styled.button`
  display: block;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
`

export const AppHeader: React.FC<Props> = ({ toggleNav, hasSolidBg }) => {
  const { content } = useContent()
  const { pathname } = useLocation()
  const [, p1, p2] = pathname.split('/')
  const pageTitle = p2 || p1 || ''

  return (
    <Container hasSolidBg={hasSolidBg}>
      <Wrap fillHeight>
        <Grid>
          <MainTitle>
            <Link to="/">{content.config.title}</Link>
          </MainTitle>
          <SubTitle
            key={pageTitle}
            initial="initial"
            animate="enter"
            variants={subTitleVariants}
            transition={subTitleTransition}
          >
            {pageTitle}
          </SubTitle>
          <NavButton onClick={toggleNav}>
            <svg viewBox="0 0 384.97 384.97">
              <path d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z" />
              <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z" />
              <path d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606 c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z" />
            </svg>
          </NavButton>
        </Grid>
      </Wrap>
    </Container>
  )
}
