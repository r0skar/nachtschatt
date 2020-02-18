import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useContent } from '../store/content'
import { styledArticle } from '../design/mixins'
import { Wrap, BlockContent } from '../components/UI'

const GRID_NAV_HEIGHT = '2rem'

const Grid = styled.article`
  height: 100%;
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(4)};
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    'gallery gallery'
    'content content';

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: minmax(min-content, 45ch) minmax(50%, 1fr);
    grid-column-gap: 10vw;
    align-items: center;
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

const GalleryWrapper = styled.div`
  background: red;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const GalleryNav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${GRID_NAV_HEIGHT};
  display: grid;
  grid-template-columns: repeat(2, ${GRID_NAV_HEIGHT});
  justify-content: space-between;
  z-index: 1;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    bottom: ${({ theme }) => `calc(((${theme.appHeaderHeight} + ${GRID_NAV_HEIGHT}) / 2) * -1);`};
  }
`

const NavButton = styled.button`
  display: block;
  cursor: pointer;

  &:first-child svg {
    transform: rotate(180deg);
  }
`

const Content = styled(BlockContent)`
  ${styledArticle()}
  grid-area: content;
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
    <Wrap fillHeight>
      <Grid>
        <Gallery>
          {project.works?.length > 0 ? (
            <>
              <GalleryWrapper>GalleryWrapper</GalleryWrapper>
              <GalleryNav>
                <NavButton>
                  <svg viewBox="0 0 15.8 6.8">
                    <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
                  </svg>
                </NavButton>
                <NavButton>
                  <svg viewBox="0 0 15.8 6.8">
                    <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
                  </svg>
                </NavButton>
              </GalleryNav>
            </>
          ) : (
            <p>No works available.</p>
          )}
        </Gallery>
        <Content blocks={project.description} />
      </Grid>
    </Wrap>
  )
}
