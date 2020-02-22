import React, { useEffect, useRef } from 'react'
import * as Sanity from 'picosanity'
import styled from 'styled-components'
import { motion, Variants, Transition } from 'framer-motion'
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
  variants?: Variants
  transition?: Transition
  options?: ImageUrlBuilderOptions
  imageLoaded?: (el: HTMLImageElement) => void
}

const defaultOptions: ImageUrlBuilderOptions = {
  auto: 'format',
  fit: 'max'
}

const defaultTransition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const defaultVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 }
}

const Container = styled.figure<{ fillHeight?: boolean; fillWidth?: boolean }>`
  height: ${({ fillHeight }) => (fillHeight ? '100%' : 'auto')};
  width: ${({ fillWidth }) => (fillWidth ? '100%' : 'auto')};
  display: block;
  position: relative;
  overflow: hidden;
`

const Placeholder = styled.svg`
  height: inherit;
  width: inherit;
  display: block;
  user-select: none;
  pointer-events: none;
  position: relative;
  z-index: -1;
`

const DefaultImage = styled.img`
  object-fit: cover;
  height: inherit;
  width: inherit;
`

const LazyImage = styled(motion.img)`
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  backface-visibility: hidden;
  will-change: transform, opacity;
`

export const Image: React.FC<Props> = props => {
  const $image = useRef<HTMLImageElement>(null)
  const $placeholder = useRef<SVGSVGElement>(null)
  const [$container, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const {
    source,
    alt,
    options,
    fillWidth,
    fillHeight,
    className,
    imageLoaded: callback,
    lazy = true,
    transition = defaultTransition,
    variants = defaultVariants
  } = props

  const imgSrc = SanityImageUrl(sanityConfig)
    .withOptions({ source, ...defaultOptions, ...options })
    .url()!

  // Extract original image dimensions from URL.
  let [width = 1, height = 1] = imgSrc
    .split('-')[1]
    .split('.')[0]
    .split('x')
    .map(Number)

  // Only when BOTH options are provided, we override the image's dimensions.
  if (options?.width && options?.height) {
    width = options.width
    height = options.height
  }

  useEffect(() => {
    if (!lazy) return
    const { width, height } = $placeholder.current!.getBoundingClientRect()
    $image.current!.parentElement!.style.width = `${width}px`
    $image.current!.parentElement!.style.height = `${height}px`
  }, [lazy])

  return (
    <Container ref={$container} className={className} fillHeight={fillHeight} fillWidth={fillWidth}>
      {lazy ? (
        <>
          <Placeholder viewBox="0 0 100 100" ref={$placeholder} className={className} width={width} height={height} />
          <LazyImage
            ref={$image}
            alt={alt}
            src={inView ? imgSrc : undefined}
            initial="initial"
            animate={inView ? 'enter' : undefined}
            variants={variants}
            transition={transition}
            onAnimationComplete={() => callback && callback($image.current!)}
          />
        </>
      ) : (
        <DefaultImage ref={$image} src={imgSrc} alt={alt} onLoad={() => callback && callback($image.current!)} />
      )}
    </Container>
  )
}
