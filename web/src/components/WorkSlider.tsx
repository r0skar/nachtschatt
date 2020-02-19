import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Work } from '../store/content'
import { Image } from './UI'

interface Props {
  works: Work[]
}

const NAV_HEIGHT = '2rem'

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

const Slider = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  backface-visibility: hidden;
  will-change: transform;
`

const Slide = styled.div`
  height: 100%;
  width: auto !important;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

const Navigation = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${NAV_HEIGHT};
  display: grid;
  grid-template-columns: repeat(2, ${NAV_HEIGHT});
  justify-content: space-between;
  z-index: 1;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    bottom: ${({ theme }) => `calc(((${theme.appHeaderHeight} + ${NAV_HEIGHT}) / 2) * -1);`};
  }
`

const NavButton = styled.button`
  display: block;
  cursor: pointer;

  &:first-child svg {
    transform: rotate(180deg);
  }
`

export const WorkSlider: React.FC<Props> = ({ works }) => {
  const [dragWidth, setDragWidth] = useState(0)
  const $slider = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      const { scrollWidth = 0, clientWidth = 0 } = $slider.current || {}
      setDragWidth(scrollWidth - clientWidth)
    }, 100)
  }, [])

  return (
    <Container>
      <Wrapper>
        <Slider ref={$slider} drag="x" dragConstraints={{ left: dragWidth * -1, right: 0 }}>
          {works.map(work => (
            <Slide key={work._id}>
              <Image source={work.image} alt={work.title} fillHeight={true} />
            </Slide>
          ))}
        </Slider>
      </Wrapper>
      <Navigation>
        <NavButton>
          <svg viewBox="0 0 15.8 6.8">
            <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
          </svg>
        </NavButton>
        <NavButton>
          <svg viewBox="0 0 15.8 6.8">
            <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
          </svg>
        </NavButton>
      </Navigation>
    </Container>
  )
}
