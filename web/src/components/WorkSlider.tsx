import React, { useRef } from 'react'
import ISwiper from 'swiper'
import Swiper from 'react-id-swiper'
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

const Slider = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  & .swiper-wrapper {
    backface-visibility: hidden;
    will-change: transform;
  }

  & .swiper-container,
  & .swiper-wrapper {
    height: 100%;
  }
`

const Slide = styled.div`
  height: 100%;
  width: auto !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const swiper = useRef<ISwiper>()

  const swiperOptions = {
    freeMode: true,
    grabCursor: true,
    preloadImages: false,
    slidesPerView: 'auto',
    spaceBetween: 25
  } as const

  const goNext = () => {
    swiper.current!.slideNext()
  }

  const goPrev = () => {
    swiper.current!.slidePrev()
  }

  return (
    <Container>
      <Slider>
        <Swiper {...swiperOptions} getSwiper={sw => (swiper.current = sw as ISwiper)}>
          {works.map(work => (
            <Slide key={work._id}>
              <Image source={work.image} alt={work.title} fillHeight={true} />
            </Slide>
          ))}
        </Swiper>
      </Slider>
      <Navigation>
        <NavButton onClick={goPrev}>
          <svg viewBox="0 0 15.8 6.8">
            <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
          </svg>
        </NavButton>
        <NavButton onClick={goNext}>
          <svg viewBox="0 0 15.8 6.8">
            <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
          </svg>
        </NavButton>
      </Navigation>
    </Container>
  )
}
