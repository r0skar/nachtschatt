import React from 'react'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { Image } from '../components/UI'

const CoverImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const CoverImage = styled(Image)`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`

export const Home: React.FC = () => {
  const { content } = useContent()

  return (
    <CoverImageContainer>
      <CoverImage
        source={content.config.coverImage}
        options={{ width: 1200 }}
        alt={content.config.title}
        lazy={false}
      />
    </CoverImageContainer>
  )
}
