import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Status, useContent } from './store/content'
import { AppNav } from './components/AppNav'
import { AppMain } from './components/AppMain'
import { AppHeader } from './components/AppHeader'

export const App: React.FC = () => {
  const { status } = useContent()
  const { location } = useHistory()
  const [withNav, setNav] = useState(false)
  const toggleNav = () => setNav(!withNav)
  const hasSolidBg = useMemo(() => location.pathname !== '/', [location])

  useEffect(() => {
    setNav(false)
  }, [location])

  return (
    <>
      {status === Status.FAILED && <p>Be right back!</p>}
      {status === Status.FETCHED && (
        <>
          {withNav && <AppNav />}
          <AppHeader toggleNav={toggleNav} hasSolidBg={hasSolidBg} />
          <AppMain />
        </>
      )}
    </>
  )
}
