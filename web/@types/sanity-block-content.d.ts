declare module '@sanity/block-content-to-react' {
  import React from 'react'
  import { Block } from 'picosanity'

  const BlockContentBuilder: React.FC<{ blocks: Block[]; serializers: {} }>
  export default BlockContentBuilder
}
