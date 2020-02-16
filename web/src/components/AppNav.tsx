import React from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Category', path: '/category' },
  { name: 'Project', path: '/project' }
]

export const AppNav: React.FC = () => (
  <nav>
    <ul>
      {navLinks.map(li => (
        <li key={li.path}>
          <Link to={li.path}>{li.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
)
