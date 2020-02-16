import React from 'react'
import PicoSanity, * as Sanity from 'picosanity'
import SanityImageUrl from '@sanity/image-url'
import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'
import SanityBlockContent from '@sanity/block-content-to-react'

interface ImageProps {
  src: Sanity.Asset
  alt?: string
  options?: ImageUrlBuilderOptions
}

export { Sanity }

const defaultBlockSerializers = {}

const defaultImageOptions: ImageUrlBuilderOptions = {
  auto: 'format',
  fit: 'max'
}

export const sanityConfig: Sanity.Config = {
  projectId: 'tr8i0v52',
  dataset: 'production',
  useCdn: true
}

export const client = new PicoSanity(sanityConfig)

export const BlockContent: React.FC<{ blocks: Sanity.Block[] }> = ({ blocks }) => {
  return SanityBlockContent({ blocks, serializers: defaultBlockSerializers })
}

export const Image: React.FC<ImageProps> = ({ src, alt, options }) => {
  const image = SanityImageUrl(sanityConfig).withOptions({ source: src, ...defaultImageOptions, ...options })
  return <img src={image.url()!} alt={alt} />
}
