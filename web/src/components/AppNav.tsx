import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Wrap } from './UI'
import { primaryNav } from '../config'

const Container = styled.nav`
  background-color: ${({ theme }) => theme.colors.bg};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9;
`

const NavList = styled.ul`
  display: grid;
  justify-content: flex-start;
  grid-row-gap: ${({ theme }) => theme.scale(0.5)};
  padding-top: ${({ theme }) => theme.appHeaderHeight};
  padding-bottom: ${({ theme }) => theme.appHeaderHeight};
`

const NavHeader = styled.span<{ primary?: boolean }>`
  display: inline-block;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ primary }) => (primary ? '2rem' : '1.5rem')};
  font-weight: ${({ primary }) => primary && 900};
`

export const AppNav: React.FC = () => (
  <Container>
    <Wrap>
      <NavList>
        {primaryNav.map((li) => (
          <li key={li.name}>
            {li.to ? (
              <Link to={li.to}>
                <NavHeader primary>{li.name}</NavHeader>
              </Link>
            ) : (
              <NavHeader primary>{li.name}</NavHeader>
            )}
          </li>
        ))}
      </NavList>
    </Wrap>
  </Container>
)
