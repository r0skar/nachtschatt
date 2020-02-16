import React from 'react'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { Image, BlockContent } from '../lib/sanity'
import { styledArticle } from '../design/mixins'
import { Wrap } from '../components/UI'

const Grid = styled.article`
  height: 100%;
  display: grid;
  grid-column-gap: 10vw;
  grid-row-gap: ${({ theme }) => theme.scale(4)};
  grid-template-rows: max-content 1fr;
  grid-template-columns: 1fr 60vmin;
  grid-template-areas:
    'image image'
    'content content';

  @media screen and (min-width: ${props => props.theme.breakpoints.md}px) {
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

  @media screen and (min-width: ${props => props.theme.breakpoints.md}px) {
    max-width: 50ch;
  }
`

export const About: React.FC = () => {
  const { content } = useContent()

  return (
    <Wrap fillHeight>
      <Grid>
        <CoverImage src={content.config.about.image} options={{ width: 600 }} />
        <Content blocks={content.config.about.text} />
      </Grid>
    </Wrap>
  )
}
