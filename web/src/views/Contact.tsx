import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useProximityFeedback } from 'react-proximity-feedback'
import { useContent } from '../store/content'
import { Wrap } from '../components/UI'
import MonsterIcon01 from '../assets/monster01.svg'
import MonsterIcon02 from '../assets/monster02.svg'

const MONSTER_SIZE = 350

const Monster = styled(motion.div)`
  user-select: none;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  height: ${MONSTER_SIZE}px;
  width: ${MONSTER_SIZE}px;
  z-index: -1;
  backface-visibility: hidden;
  will-change: transform;
`

const Container = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.scale(2)};
`

export const Contact: React.FC = () => {
  const { content } = useContent()
  const monster01Animation = useAnimation()
  const monster02Animation = useAnimation()
  const $container = useRef<HTMLDivElement | null>(null)
  const $monster01 = useRef<HTMLDivElement | null>(null)
  const $monster02 = useRef<HTMLDivElement | null>(null)

  const { ref: $proximityTarget, proximity: proximityToForm } = useProximityFeedback({
    threshold: 400,
    throttleInMs: 0
  })

  useEffect(() => {
    const { width, height } = document.documentElement.getBoundingClientRect()
    const scale = 1 + proximityToForm / 4
    const proximityFactor = proximityToForm * 50
    const x = Math.round(width - MONSTER_SIZE / 2 - proximityFactor)
    const y = Math.round(height - MONSTER_SIZE / 2 - proximityFactor)
    monster01Animation.set({ x, y, scale })
  }, [proximityToForm, monster01Animation])

  useEffect(() => {
    const scale = 1 + proximityToForm / 4
    const proximityFactor = proximityToForm * 50
    const x = Math.round((MONSTER_SIZE / 3) * -1 + proximityFactor)
    const y = Math.round(proximityFactor)
    monster02Animation.set({ x, y, scale })
  }, [proximityToForm, monster02Animation])

  return (
    <Wrap fillHeight>
      <Monster ref={$monster01} animate={monster01Animation}>
        <img src={MonsterIcon01} alt="Moritz" />
      </Monster>
      <Monster ref={$monster02} animate={monster02Animation}>
        <img src={MonsterIcon02} alt="Nachtschatt" />
      </Monster>
      <Container ref={$container}>
        <Wrap breakpoint="xs" ref={$proximityTarget}>
          <Title>Moritz Nachtschatt</Title>
          <ul>
            <li>
              <a href="mailto:mailto@gmail.com">mailto@gmail.com</a>
            </li>
            <li>
              <a href="tel:004323095472">004323095472</a>
            </li>
          </ul>
        </Wrap>
      </Container>
    </Wrap>
  )
}
