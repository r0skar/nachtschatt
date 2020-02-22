import React from 'react'
import * as Sanity from 'picosanity'
import styled from 'styled-components'
import SanityBlockContent from '@sanity/block-content-to-react'

interface Props {
  className?: string
  blocks: Sanity.Block[]
}

const defaultBlockSerializers = {}

const Article = styled.article`
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

export const BlockContent: React.FC<Props> = ({ blocks, className }) => {
  return (
    <Article className={className}>
      {SanityBlockContent({
        renderContainerOnSingleChild: true,
        serializers: defaultBlockSerializers,
        blocks
      })}
    </Article>
  )
}
