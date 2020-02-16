import React from 'react'
import PicoSanity, * as Sanity from 'picosanity'
import SanityImageUrl from '@sanity/image-url'
import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'
import SanityBlockContent from '@sanity/block-content-to-react'

interface ImageProps {
  src: Sanity.Asset
  alt?: string
  className?: string
  options?: ImageUrlBuilderOptions
}

interface BlockContentProps {
  blocks: Sanity.Block[]
  className?: string
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

export const BlockContent: React.FC<BlockContentProps> = ({ blocks, className }) => {
  return SanityBlockContent({ blocks, serializers: defaultBlockSerializers, className })
}

export const Image: React.FC<ImageProps> = ({ src, alt, options, className }) => {
  const image = SanityImageUrl(sanityConfig).withOptions({ source: src, ...defaultImageOptions, ...options })
  return <img src={image.url()!} alt={alt} className={className} />
}
