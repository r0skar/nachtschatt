import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { Home } from '../views/Home'
import { Contact } from '../views/Contact'
import { Project } from '../views/Project'
import { Category } from '../views/Category'
import { NotFound } from '../views/NotFound'

const Container = styled.main`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const Spacer = styled.div`
  height: ${({ theme }) => theme.appHeaderHeight};
`

const Main = styled.div`
  flex: 1;
`

export const AppMain: React.FC = () => (
  <Container>
    <Spacer />
    <Main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/work/:categorySlug" component={Category} />
        <Route exact path="/work/:categorySlug/:projectSlug" component={Project} />
        <Route component={NotFound} />
      </Switch>
    </Main>
    <Spacer />
  </Container>
)
