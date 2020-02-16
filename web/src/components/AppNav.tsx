import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Category', path: '/category' },
  { name: 'Project', path: '/project' }
]

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NavList = styled.ul`
  padding-top: ${({ theme }) => theme.appHeaderHeight};
  padding-bottom: ${({ theme }) => theme.appHeaderHeight};
`

const NavListItem = styled.li`
  text-align: center;
`

const NavLink = styled(Link)`
  font-weight: 900;
  text-transform: uppercase;
`

export const AppNav: React.FC = () => (
  <Container>
    <NavList>
      {navLinks.map(li => (
        <NavListItem key={li.path}>
          <NavLink to={li.path}>{li.name}</NavLink>
        </NavListItem>
      ))}
    </NavList>
  </Container>
)
