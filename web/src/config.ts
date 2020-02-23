import * as Sanity from 'picosanity'

export const sanityConfig: Sanity.Config = {
  projectId: 'tr8i0v52',
  dataset: 'production',
  useCdn: true
}

export const primaryNav = [
  { name: 'Contact', to: '/contact' },
  {
    name: 'Comission',
    children: [
      { name: 'Reportage', to: '/work/reportage' },
      { name: 'Press', to: '/work/press' },
      { name: 'Other', to: '/work/other' }
    ]
  },
  { name: 'Travel', to: '/work/travel' },
  { name: 'People', to: '/work/people' },
  { name: 'Projects', to: '/work/projects' }
]
