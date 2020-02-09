import DocIcon from 'react-icons/lib/md/photo-album'

export default {
  type: 'document',
  name: 'project',
  title: 'Project',
  icon: DocIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().max(50)
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: Rule => Rule.required(),
      options: { source: 'title' }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 5,
      validation: Rule => Rule.required().max(250)
    },
    {
      name: 'works',
      type: 'array',
      title: 'Works',
      of: [
        {
          type: 'reference',
          to: [{ type: 'work' }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'works.0.image'
    },
    prepare({ title, media }) {
      return { title, media }
    }
  }
}
