import React from 'react'
import * as Sanity from 'picosanity'
import styled from 'styled-components'
import { motion, Variants, Transition } from 'framer-motion'
import SanityBlockContent from '@sanity/block-content-to-react'

interface Props {
  className?: string
  variants?: Variants
  transition?: Transition
  blocks: Sanity.Block[]
}

const defaultBlockSerializers = {}

const defaultTransition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const defaultVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 }
}

const Article = styled(motion.article)`
  & > div {
    & > *:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.scale(4)};
    }

    & h2,
    & h3 {
      margin-bottom: ${({ theme }) => theme.scale(2)};
    }

    & a {
      text-decoration: dotted;
    }
  }
`

export const BlockContent: React.FC<Props> = props => {
  const { blocks, className, variants = defaultVariants, transition = defaultTransition } = props

  return (
    <Article className={className} initial="initial" animate="enter" variants={variants} transition={transition}>
      {SanityBlockContent({
        renderContainerOnSingleChild: true,
        serializers: defaultBlockSerializers,
        blocks
      })}
    </Article>
  )
}
