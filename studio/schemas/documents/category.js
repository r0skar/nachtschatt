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
      validation: Rule => Rule.unique(),
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'project.works.0.title',
              row: 'row',
              col: 'col',
              media: 'project.works.0.image'
            },
            prepare({ title, media, row = 1, col = 3 }) {
              return { title: `${title} (${col}/${row})`, media }
            }
          },
          fields: [
            {
              name: 'project',
              type: 'reference',
              title: 'Project',
              validation: Rule => Rule.required(),
              to: [{ type: 'project' }]
            },
            {
              name: 'col',
              type: 'number',
              title: 'Column span',
              validation: Rule => Rule.min(1).max(3)
            },
            {
              name: 'row',
              type: 'number',
              title: 'Row span',
              validation: Rule => Rule.min(1).max(3)
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'projects.0.project.works.0.image'
    },
    prepare({ title, media }) {
      return { title, media }
    }
  }
}
