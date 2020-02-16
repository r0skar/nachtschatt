import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useContent } from '../store/content'
import { Wrap, Image } from '../components/UI'

const Grid = styled.ul`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.scale(2)};
  grid-column-gap: ${({ theme }) => theme.scale(2)};
`

const ProjectContainer = styled(Link)`
  display: inline-block;
  position: relative;
`

const ProjectImage = styled(Image)`
  display: block;
  position: relative;
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

  return (
    <Wrap>
      {!projects ? (
        <p>No projects.</p>
      ) : (
        <Grid>
          {projects.map(p => (
            <li key={p.slug.current}>
              <ProjectContainer to={`/${categorySlug}/${p.slug.current}`}>
                <ProjectImage source={p.cover} options={{ width: 300 }} />
                <ProjectTitle>{p.title}</ProjectTitle>
              </ProjectContainer>
            </li>
          ))}
        </Grid>
      )}
    </Wrap>
  )
}
