import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { Home } from '../views/Home'
import { About } from '../views/About'
import { Project } from '../views/Project'
import { Category } from '../views/Category'
import { NotFound } from '../views/NotFound'

const Container = styled.main`
  padding-top: ${({ theme }) => theme.appHeaderHeight};
  padding-bottom: ${({ theme }) => theme.appHeaderHeight};
  height: 100%;
`

export const AppMain: React.FC = () => (
  <Container>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/:categorySlug" component={Category} />
      <Route exact path="/:categorySlug/:projectSlug" component={Project} />
      <Route component={NotFound} />
    </Switch>
  </Container>
)
