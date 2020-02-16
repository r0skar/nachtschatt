import PicoSanity, * as Sanity from 'picosanity'
import SanityImageUrl from '@sanity/image-url'
import SanityBlockContent from '@sanity/block-content-to-react'

export { Sanity }

export const sanityConfig: Sanity.Config = {
  projectId: 'tr8i0v52',
  dataset: 'production',
  useCdn: true
}

export const useClient = () => {
  return new PicoSanity(sanityConfig)
}

export const useBlocks = (blocks: Sanity.Block[]) => {
  return SanityBlockContent({ blocks, serializers: {} })
}

export const useImage = (src: Sanity.Asset) => {
  return SanityImageUrl(sanityConfig)
    .image(src)
    .auto('format')
    .fit('max')
}
