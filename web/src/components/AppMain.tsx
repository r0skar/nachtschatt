import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '../views/Home'
import { About } from '../views/About'
import { Category } from '../views/Category'
import { Project } from '../views/Project'
import { NotFound } from '../views/NotFound'

export const AppMain: React.FC = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/:categorySlug" component={Category} />
      <Route exact path="/:categorySlug/:projectSlug" component={Project} />
      <Route component={NotFound} />
    </Switch>
  </main>
)
