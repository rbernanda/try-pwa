import { useEffect, useState } from 'react'
import { Routes, useLocation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

export function CustomRoutes({ children }) {
  const location = useLocation()

  const [progress, setProgress] = useState(false)
  const [prevLocation, setPrevLocation] = useState()

  useEffect(() => {
    setProgress(true)
    setPrevLocation(location.pathname)
    if (location.pathname === prevLocation) {
      setPrevLocation('')
    }
  }, [location.pathname])

  useEffect(() => setProgress(false), [prevLocation])

  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  )
}
