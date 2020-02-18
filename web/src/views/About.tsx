import React from 'react'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { styledArticle } from '../design/mixins'
import { Wrap, Image, BlockContent } from '../components/UI'

const Grid = styled.article`
  height: 100%;
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(4)};
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    'image image'
    'content content';

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: minmax(min-content, 45ch) minmax(50%, 1fr);
    grid-column-gap: 10vw;
    align-items: center;
    grid-template-areas:
      'content image'
      'content image';
  }
`

const CoverImage = styled(Image)`
  grid-area: image;
  width: 100%;
`

const Content = styled(BlockContent)`
  ${styledArticle()}
  grid-area: content;
`

export const About: React.FC = () => {
  const { content } = useContent()

  return (
    <Wrap fillHeight>
      <Grid>
        <CoverImage source={content.config.about.image} options={{ width: 600 }} fillWidth={true} />
        <Content blocks={content.config.about.text} />
      </Grid>
    </Wrap>
  )
}
