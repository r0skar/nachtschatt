import React, { useMemo } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useContent } from '../store/content'
import { Wrap, Image } from '../components/UI'

const GRID_GAP = '1rem'
const GRID_COL_COUNT = 3

const transition = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const containerVariants = {
  hover: { scale: 0.95 }
}

const imageVariants = {
  hover: { scale: 1.15 }
}

const titleVariants = {
  hover: { y: -10 }
}

const lazyImageVariants = {
  initial: { opacity: 0, y: '100%' },
  enter: { opacity: 1, y: 0 }
}

const Grid = styled.ul`
  display: grid;
  grid-gap: ${GRID_GAP};
  grid-auto-flow: dense;
  grid-auto-rows: minmax(200px, auto);
  grid-template-columns: repeat(auto-fill, minmax(calc((100% / ${GRID_COL_COUNT}) - ${GRID_GAP}), 1fr));
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

const ProjectContainer = styled(motion.div)`
  display: block;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  will-change: transform;
`

const ProjectLink = styled(Link)`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`

const ImageContainer = styled(motion.div)`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  will-change: transform;
`

const ProjectTitle = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.bg};
  font-size: 1.25rem;
  padding: 1rem;
  position: absolute;
  text-align: center;
  z-index: 1;
  will-change: transform;
  text-transform: uppercase;
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
            <ProjectContainer whileHover="hover" whileTap="hover" variants={containerVariants} transition={transition}>
              <ProjectLink to={`/work/${categorySlug}/${project.slug.current}`}>
                <ImageContainer variants={imageVariants} transition={transition}>
                  <Image
                    fillWidth={true}
                    fillHeight={true}
                    source={project.cover}
                    options={{ width: 1600 }}
                    variants={lazyImageVariants}
                  />
                </ImageContainer>
                <ProjectTitle variants={titleVariants} transition={transition}>
                  {project.title}
                </ProjectTitle>
              </ProjectLink>
            </ProjectContainer>
          </GridItem>
        ))}
      </Grid>
    </Wrap>
  )
}
