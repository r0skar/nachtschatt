import DocIcon from 'react-icons/lib/md/image'

export default {
  type: 'document',
  name: 'work',
  title: 'Work',
  icon: DocIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required()
    }
  ]
}
