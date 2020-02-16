import LinkIcon from 'react-icons/lib/fa/external-link'

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Normal', value: 'p' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            blockEditor: { icon: LinkIcon },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    }
  ]
}
