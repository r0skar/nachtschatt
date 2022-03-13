import * as Sanity from 'picosanity'

export const sanityConfig: Sanity.Config = {
  projectId: 'tr8i0v52',
  dataset: 'production',
  useCdn: true
}

export const primaryNav = [
  { name: 'Contact', to: '/contact' },
  { name: 'Stories', to: '/work/stories' },
  { name: 'Press / Advertising', to: '/work/press' },
  { name: 'Projects', to: '/work/projects' },
]
