import S from '@sanity/desk-tool/structure-builder'

export default () => {
  return S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('work').title('Works'),
      S.listItem()
        .title('Settings')
        .schemaType('config')
        .child(
          S.editor()
            .id('config')
            .schemaType('config')
            .documentId('config')
        )
    ])
}
