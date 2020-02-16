import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppNav } from './components/AppNav'
import { AppMain } from './components/AppMain'
import { AppHeader } from './components/AppHeader'

export const App: React.FC = () => {
  const { location } = useHistory()
  const [withNav, setNav] = useState(false)
  const toggleNav = () => setNav(!withNav)

  useEffect(() => {
    setNav(false)
  }, [location])

  return (
    <>
      {withNav && <AppNav />}
      <AppHeader toggleNav={toggleNav} />
      <AppMain />
    </>
  )
}
