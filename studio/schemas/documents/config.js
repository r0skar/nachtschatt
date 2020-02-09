import DocIcon from 'react-icons/lib/md/settings-applications'

export default {
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  type: 'document',
  name: 'config',
  title: 'Config',
  icon: DocIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title',
      description: 'Title for Google and Social Media bots',
      validation: Rule => Rule.required().max(50)
    },
    {
      name: 'description',
      type: 'text',
      title: 'Site Description',
      rows: 2,
      description: 'Description for Google and Social Media bots',
      validation: Rule => Rule.required().max(250)
    },
    {
      name: 'socialImage',
      type: 'image',
      title: 'Site Image',
      description: 'Image for Google and Social Media bots',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      type: 'reference',
      title: 'Cover Image',
      to: [{ type: 'work' }]
    },
    {
      name: 'about',
      type: 'text',
      title: 'About me',
      rows: 8
    }
  ]
}
