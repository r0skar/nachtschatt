import React from 'react'
import * as Sanity from 'picosanity'
import SanityBlockContent from '@sanity/block-content-to-react'

interface Props {
  blocks: Sanity.Block[]
  className?: string
}

const defaultBlockSerializers = {}

export const BlockContent: React.FC<Props> = ({ blocks, className }) => {
  return SanityBlockContent({ blocks, serializers: defaultBlockSerializers, className })
}
