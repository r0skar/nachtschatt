import React, { useState } from 'react'
import * as Sanity from 'picosanity'
import styled from 'styled-components'
import SanityImageUrl from '@sanity/image-url'
import { useInView } from 'react-intersection-observer'
import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'
import { sanityConfig } from '../../config'

interface Props {
  alt?: string
  lazy?: boolean
  className?: string
  fillParent?: boolean
  source: Sanity.Asset
  options?: ImageUrlBuilderOptions
}

const defaultImageOptions: ImageUrlBuilderOptions = {
  auto: 'format',
  fit: 'max'
}

const ImageContainer = styled.figure<{ aspectRatio: number; fillParent?: boolean }>`
  display: block;
  height: ${({ fillParent }) => fillParent && '100%'};
  width: ${({ fillParent }) => fillParent && '100%'};
  padding-bottom: ${({ fillParent, aspectRatio }) => !fillParent && `${aspectRatio}%`};
  position: relative;
  overflow: hidden;
`

const StyledImage = styled.img<{ hasLoaded: boolean }>`
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 1 : 0)};
  will-change: opacity;
  transition: opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`

export const Image: React.FC<Props> = ({ lazy = true, source, alt, options, fillParent, className }) => {
  const [hasLoaded, setLoaded] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0 })

  const imgSrc = SanityImageUrl(sanityConfig)
    .withOptions({ source, ...defaultImageOptions, ...options })
    .url()!

  let [width = 1, height = 1] = imgSrc
    .split('-')[1]
    .split('.')[0]
    .split('x')
    .map(Number)

  // Override only when both values are present. If only one is defined,
  // the aspect ratio wont change.
  if (options?.width && options?.height) {
    width = options.width
    height = options.height
  }

  return (
    <ImageContainer ref={ref} aspectRatio={(height / width) * 100} fillParent={fillParent} className={className}>
      <StyledImage
        alt={alt}
        src={lazy ? (inView ? imgSrc : undefined) : imgSrc}
        onLoad={() => lazy && setLoaded(true)}
        hasLoaded={lazy ? hasLoaded : true}
      />
    </ImageContainer>
  )
}
