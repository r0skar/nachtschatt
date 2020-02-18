import React, { useState, useEffect, useRef } from 'react'
import * as Sanity from 'picosanity'
import styled from 'styled-components'
import SanityImageUrl from '@sanity/image-url'
import { useInView } from 'react-intersection-observer'
import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'
import { sanityConfig } from '../../config'
import { Spinner } from './Spinner'

interface Props {
  source: Sanity.Asset
  alt?: string
  lazy?: boolean
  className?: string
  fillHeight?: boolean
  fillWidth?: boolean
  options?: ImageUrlBuilderOptions
  imageLoaded?: (el: HTMLImageElement) => void
}

const defaultImageOptions: ImageUrlBuilderOptions = {
  auto: 'format',
  fit: 'max'
}

const ImageContainer = styled.figure<{ fillHeight?: boolean; fillWidth?: boolean }>`
  height: ${({ fillHeight }) => (fillHeight ? '100%' : 'auto')};
  width: 100%;
  display: block;
  position: relative;
  overflow: hidden;
`

const Placeholder = styled(Spinner)<{ fillHeight?: boolean; fillWidth?: boolean }>`
  height: ${({ fillHeight }) => (fillHeight ? '100%' : 'auto')};
  width: ${({ fillWidth }) => (fillWidth ? '100%' : 'auto')};
  backface-visibility: hidden;
  display: block;
  pointer-events: none;
  position: relative;
  z-index: -1;
`

const StyledImage = styled.img<{ hasLoaded: boolean }>`
  opacity: ${({ hasLoaded }) => (hasLoaded ? 1 : 0)};
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  backface-visibility: hidden;
  will-change: opacity;
  transition: opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`

export const Image: React.FC<Props> = props => {
  const { lazy = true, imageLoaded, source, alt, options, fillWidth, fillHeight, className } = props
  const [$container, inView] = useInView({ triggerOnce: true, threshold: 0 })
  const $image = useRef<HTMLImageElement>(null)
  const [hasLoaded, setLoaded] = useState(false)

  const imgSrc = SanityImageUrl(sanityConfig)
    .withOptions({ source, ...defaultImageOptions, ...options })
    .url()!

  let [width = 1, height = 1] = imgSrc
    .split('-')[1]
    .split('.')[0]
    .split('x')
    .map(Number)

  if (options?.width && options?.height) {
    width = options.width
    height = options.height
  }

  useEffect(() => {
    if (hasLoaded && imageLoaded) imageLoaded($image.current!)
  }, [hasLoaded, imageLoaded])

  return (
    <ImageContainer ref={$container} className={className} fillHeight={fillHeight} fillWidth={fillWidth}>
      <Placeholder fillHeight={fillHeight} fillWidth={fillWidth} width={width} height={height} />
      <StyledImage
        ref={$image}
        alt={alt}
        hasLoaded={lazy ? hasLoaded : true}
        onLoad={() => lazy && setLoaded(true)}
        src={lazy ? (inView ? imgSrc : undefined) : imgSrc}
      />
    </ImageContainer>
  )
}
