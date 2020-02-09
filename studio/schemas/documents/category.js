import DocIcon from 'react-icons/lib/md/filter'

export default {
  type: 'document',
  name: 'category',
  title: 'Category',
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
      rows: 2,
      validation: Rule => Rule.required().max(250)
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [ {
        type: 'reference',
        to: [ { type: 'project' } ]
      } ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'projects.0.works.0.image'
    },
    prepare({ title, media }) {
      return { title, media }
    }
  }
}
