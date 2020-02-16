declare module '@sanity/block-content-to-react' {
  import React from 'react'
  import { Block } from 'picosanity'
  import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'

  interface Props {
    blocks: Block[]
    className?: string
    renderContainerOnSingleChild?: boolean
    imageOptions?: ImageUrlBuilderOptions
    serializers: {
      types?: Record<string, unknown>
      marks?: Record<string, unknown>
      list?: Record<string, unknown>
      listItem?: Record<string, unknown>
      hardBreak?: boolean
      container?: Record<string, unknown>
    }
  }

  const BlockContentBuilder: React.FC<Props>
  export default BlockContentBuilder
}
