import React from 'react'
import * as Sanity from 'picosanity'
import SanityImageUrl from '@sanity/image-url'
import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'
import { sanityConfig } from '../../config'

interface Props {
  source: Sanity.Asset
  alt?: string
  className?: string
  options?: ImageUrlBuilderOptions
}

const defaultImageOptions: ImageUrlBuilderOptions = {
  auto: 'format',
  fit: 'max'
}

export const Image: React.FC<Props> = ({ source, alt, options, className }) => {
  const imgSrc = SanityImageUrl(sanityConfig).withOptions({ source, ...defaultImageOptions, ...options }).url()!

  return <img src={imgSrc} alt={alt} className={className} />
}
