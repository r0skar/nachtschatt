import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { Wrap, Image } from '../components/UI'

const GRID_COL_COUNT = 3
const GRID_COL_GAP = '2rem'

const Grid = styled.ul`
  display: grid;
  grid-gap: ${GRID_COL_GAP};
  grid-auto-flow: dense;
  grid-auto-rows: minmax(200px, auto);
  grid-template-columns: repeat(auto-fill, minmax(calc((100% / ${GRID_COL_COUNT}) - ${GRID_COL_GAP}), 1fr));
`

const GridItem = styled.li<{ row: number; col: number }>`
  display: block;
  grid-column-end: span ${GRID_COL_COUNT};
  grid-row-end: span 1;

  @media screen and (min-width: ${props => props.theme.breakpoints.sm}px) {
    grid-column-end: ${({ col }) => `span ${col}`};
    grid-row-end: ${({ row }) => `span ${row}`};
  }
`

const ProjectContainer = styled(Link)`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
`

const ProjectImage = styled(Image)`
  display: block;
`

const ProjectTitle = styled.h2`
  color: ${({ theme }) => theme.colors.bg};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

export const Category: React.FC = () => {
  const { content } = useContent()
  const { categorySlug } = useParams()

  const projects = useMemo(() => {
    return content.categories.find(c => c.slug.current === categorySlug)?.projects
  }, [categorySlug, content.categories])

  if (!projects) {
    return <Wrap>No projects available.</Wrap>
  }

  return (
    <Wrap>
      <Grid>
        {projects.map(({ project, row = 1, col = GRID_COL_COUNT }) => (
          <GridItem key={project.slug.current} row={row} col={col}>
            <ProjectContainer to={`/${categorySlug}/${project.slug.current}`}>
              <ProjectImage source={project.cover} options={{ width: 1600 }} fillWidth={true} fillHeight={true} />
              <ProjectTitle>{project.title}</ProjectTitle>
            </ProjectContainer>
          </GridItem>
        ))}
      </Grid>
    </Wrap>
  )
}
