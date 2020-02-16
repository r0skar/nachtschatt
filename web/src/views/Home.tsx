import React from 'react'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { useImage } from '../lib/sanity'

const CoverImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const CoverImage = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`

export const Home: React.FC = () => {
  const { content } = useContent()
  const coverImg = useImage(content.config.coverImage).width(1200).url()!

  return (
    <CoverImageContainer>
      <CoverImage src={coverImg} alt={content.config.title} />
    </CoverImageContainer>
  )
}
