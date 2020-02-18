import React, { useState, useEffect, useRef } from 'react'
import * as Sanity from 'picosanity'
import styled from 'styled-components'
import SanityImageUrl from '@sanity/image-url'
import { useInView } from 'react-intersection-observer'
import { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'
import { sanityConfig } from '../../config'

interface Props {
  source: Sanity.Asset
  alt?: string
  lazy?: boolean
  className?: string
  fillHeight?: boolean
  fillWidth?: boolean
  options?: ImageUrlBuilderOptions
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

const Placeholder = styled.svg<{ fillHeight?: boolean; fillWidth?: boolean }>`
  height: ${({ fillHeight }) => (fillHeight ? '100%' : 'auto')};
  width: ${({ fillWidth }) => (fillWidth ? '100%' : 'auto')};
  display: block;
  pointer-events: none;
  visibility: hidden;
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
  will-change: opacity;
  transition: opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`

export const Image: React.FC<Props> = props => {
  const { lazy = true, source, alt, options, fillWidth, fillHeight, className } = props
  const [$container, inView] = useInView({ triggerOnce: true, threshold: 0 })
  const $placeholder = useRef<SVGSVGElement>(null)
  const [hasLoaded, setLoaded] = useState(false)

  const imgSrc = SanityImageUrl(sanityConfig)
    .withOptions({ source, ...defaultImageOptions, ...options })
    .url()!

  const [oriWidth = 1, oriHeight = 1] = imgSrc
    .split('-')[1]
    .split('.')[0]
    .split('x')
    .map(Number)

  useEffect(() => {
    const width = options?.width && options?.height ? options.width : oriWidth
    const height = options?.height && options?.height ? options.height : oriHeight
    $placeholder.current!.setAttribute('width', String(width))
    $placeholder.current!.setAttribute('height', String(height))
  }, [oriWidth, oriHeight, options])

  return (
    <ImageContainer ref={$container} className={className} fillHeight={fillHeight} fillWidth={fillWidth}>
      <Placeholder ref={$placeholder} fillHeight={fillHeight} fillWidth={fillWidth} />
      <StyledImage
        alt={alt}
        src={lazy ? (inView ? imgSrc : undefined) : imgSrc}
        onLoad={() => lazy && setLoaded(true)}
        hasLoaded={lazy ? hasLoaded : true}
      />
    </ImageContainer>
  )
}
