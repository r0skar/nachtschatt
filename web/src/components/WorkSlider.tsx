import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { motion, useAnimation } from 'framer-motion'
import { Work } from '../store/content'
import { Image } from './UI'

interface Props {
  works: Work[]
}

const NAV_HEIGHT = '2rem'
const SLIDES_GAP = '20px'

const navTransition = {
  duration: 2,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const lazyImageVariants = {
  initial: { opacity: 0, x: '-10%' },
  enter: { opacity: 1, x: 0 }
}

const navVariants = {
  initial: { opacity: 0, y: '100%' },
  enter: { opacity: 1, y: 0 }
}

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
  cursor: grab;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  backface-visibility: hidden;
  will-change: transform;

  &:active {
    cursor: grabbing;
  }
`

const Slide = styled.div`
  height: 100%;

  &:not(:last-child) {
    margin-right: ${SLIDES_GAP};
  }
`

const Navigation = styled(motion.nav)`
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
  const controls = useAnimation()
  const [dragWidth, setDragWidth] = useState(0)
  const $slider = useRef<HTMLDivElement | null>(null)
  const transition = { duration: 0.5, type: 'tween' }

  const paginate = (direction: 1 | -1) => {
    const { webkitTransform } = getComputedStyle($slider.current!)
    const { m41: translateX } = new WebKitCSSMatrix(webkitTransform)
    const activeOffset = Math.round(Math.abs(translateX))
    const { clientWidth: sliderWidth } = $slider.current!

    if (direction === 1) {
      const x = Math.min(activeOffset + sliderWidth, dragWidth) * -1
      controls.start({ x }, transition)
    } else if (direction === -1) {
      const x = Math.max(activeOffset - sliderWidth, 0) * -1
      controls.start({ x }, transition)
    }
  }

  useEffect(() => {
    const updateDragWidth = debounce(() => {
      const { scrollWidth = 0, clientWidth = 0 } = $slider.current || {}
      setDragWidth(scrollWidth - clientWidth)
    }, 50)

    updateDragWidth()
    window.addEventListener('resize', updateDragWidth)

    return () => {
      window.removeEventListener('resize', updateDragWidth)
    }
  }, [])

  return (
    <Container>
      <Wrapper>
        <Slider ref={$slider} drag="x" animate={controls} dragConstraints={{ left: dragWidth * -1, right: 0 }}>
          {works.map(work => (
            <Slide key={work._id}>
              <Image source={work.image} alt={work.title} fillHeight={true} variants={lazyImageVariants} />
            </Slide>
          ))}
        </Slider>
      </Wrapper>
      <Navigation initial="initial" animate="enter" variants={navVariants} transition={navTransition}>
        <NavButton onClick={() => paginate(-1)}>
          <svg viewBox="0 0 15.8 6.8">
            <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
          </svg>
        </NavButton>
        <NavButton onClick={() => paginate(1)}>
          <svg viewBox="0 0 15.8 6.8">
            <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
          </svg>
        </NavButton>
      </Navigation>
    </Container>
  )
}
