import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useProximityFeedback } from 'react-proximity-feedback'
import { useContent } from '../store/content'
import { Wrap, BlockContent, Image } from '../components/UI'
import MonsterIcon01 from '../assets/monster01.svg'
import MonsterIcon02 from '../assets/monster02.svg'

const Monster = styled.div`
  user-select: none;
  pointer-events: none;
  position: fixed;
  height: 50vh;
  width: 50vh;
  z-index: -1;

  &:nth-child(1) {
    bottom: -18vh;
    right: -17vh;
  }

  &:nth-child(2) {
    bottom: -15vh;
    left: -15vh;
    transform: rotate(-100deg);
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`

const MonsterImg = styled(motion.img)`
  backface-visibility: hidden;
  will-change: transform;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(2)};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 20rem 45ch;
    grid-column-gap: 10vw;
  }
`
const Article = styled.article`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(4)};
`

const ContactList = styled.ul`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(0.5)};
  font-weight: 900;
`

export const Contact: React.FC = () => {
  const offset01 = 150
  const offset02 = 100
  const { content } = useContent()
  const isFirstLoad = useRef(true)
  const monster01Animation = useAnimation()
  const monster02Animation = useAnimation()
  const { ref: $monster01, proximity: m01Proximity } = useProximityFeedback({ throttleInMs: 0, threshold: offset01 })
  const { ref: $monster02, proximity: m02Proximity } = useProximityFeedback({ throttleInMs: 0, threshold: offset02 })

  useEffect(() => {
    monster01Animation.set({ y: offset01 })
    monster02Animation.set({ x: offset02 * -1, y: offset02 * -1 })
    const transition = { delay: 0.5, duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
    const anime01 = monster01Animation.start({ y: 0, transition })
    const anime02 = monster02Animation.start({ x: 0, y: 0, transition })
    Promise.all([anime01, anime02]).then(() => (isFirstLoad.current = false))
  }, [monster01Animation, monster02Animation])

  useEffect(() => {
    if (isFirstLoad.current) return
    const transition = { type: 'spring', mass: 0.75, damping: 15, stiffness: 100 }
    monster01Animation.start({ y: m01Proximity * offset01, transition })
    monster02Animation.start({ x: m02Proximity * offset02 * -1, y: m02Proximity * offset02 * -1, transition })
  }, [monster01Animation, m01Proximity, monster02Animation, m02Proximity, isFirstLoad])

  return (
    <Wrap fillHeight>
      <Monster ref={$monster01}>
        <MonsterImg src={MonsterIcon01} alt="Moritz" animate={monster01Animation} />
      </Monster>
      <Monster ref={$monster02}>
        <MonsterImg src={MonsterIcon02} alt="Nachtschatt" animate={monster02Animation} />
      </Monster>
      <Container>
        <Content>
          <Image source={content.config.about.image} options={{ width: 300 }} fillWidth={true} />
          <Article>
            <BlockContent blocks={content.config.about.text} />
            <ContactList>
              <li>
                <a href={`mailto:${content.config.about.email}`}>{content.config.about.email}</a>
              </li>
              <li>
                <a href={`tel:${content.config.about.telephone}`}>{content.config.about.telephone}</a>
              </li>
            </ContactList>
          </Article>
        </Content>
      </Container>
    </Wrap>
  )
}
