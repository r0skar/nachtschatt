import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useContent } from '../store/content'
import { WorkSlider } from '../components/WorkSlider'
import { Wrap, BlockContent } from '../components/UI'

const articleVariants = {
  initial: { opacity: 0, x: '25%' },
  enter: { opacity: 1, x: 0 }
}

const Grid = styled.article`
  flex: 1;
  height: 100%;
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(4)};
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    'content content'
    'gallery gallery';

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: minmax(min-content, 30ch) minmax(50%, 1fr);
    grid-column-gap: 10vw;
    align-items: flex-start;
    grid-template-areas:
      'content gallery'
      'content gallery';
  }
`

const Gallery = styled.div`
  user-select: none;
  grid-area: gallery;
  height: 100%;
  width: 100%;
  position: relative;
  min-height: ${({ theme }) => `calc(100vh - ${theme.appHeaderHeight} - ${theme.wrapSpacing})`};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    min-height: 0;
  }
`

const Content = styled(BlockContent)`
  grid-area: content;
  max-width: 400px;
`

export const Project: React.FC = () => {
  const { content } = useContent()
  const { projectSlug } = useParams()

  const project = useMemo(() => {
    return content.projects.find(c => c.slug.current === projectSlug)
  }, [projectSlug, content.projects])

  if (!project) {
    return <Wrap>No project available.</Wrap>
  }

  return (
    <Wrap fillHeight pinRight>
      <Grid>
        <Gallery>
          {project.works?.length > 0 ? <WorkSlider works={project.works} /> : <p>No works available.</p>}
        </Gallery>
        <Content blocks={project.description} variants={articleVariants} />
      </Grid>
    </Wrap>
  )
}
