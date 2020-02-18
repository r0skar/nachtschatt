import React from 'react'
import * as Sanity from 'picosanity'
import SanityBlockContent from '@sanity/block-content-to-react'

interface Props {
  className?: string
  blocks: Sanity.Block[]
}

const defaultBlockSerializers = {}

export const BlockContent: React.FC<Props> = ({ blocks, className }) => {
  return SanityBlockContent({
    renderContainerOnSingleChild: true,
    serializers: defaultBlockSerializers,
    blocks,
    className
  })
}
