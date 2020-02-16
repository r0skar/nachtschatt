import React from 'react'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { useImage, useBlocks } from '../lib/sanity'
import { Wrap } from '../components/UI'

const Grid = styled.article`
  display: grid;
  height: 100%;
`

const Image = styled.img`
  display: block;
`

const Content = styled.div`
  display: block;
`

export const About: React.FC = () => {
  const { content } = useContent()
  const image = useImage(content.config.about.image)
    .width(600)
    .url()!

  return (
    <Wrap fillHeight>
      <Grid>
        <Image src={image} />
        <Content>{useBlocks(content.config.about.text)}</Content>
      </Grid>
    </Wrap>
  )
}
