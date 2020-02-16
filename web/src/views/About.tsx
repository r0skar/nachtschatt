import React from 'react'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { Image, BlockContent } from '../lib/sanity'
import { Wrap } from '../components/UI'

const Grid = styled.article`
  display: grid;
  height: 100%;
`

const CoverImage = styled(Image)`
  display: block;
`

const Content = styled(BlockContent)`
  display: block;
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
