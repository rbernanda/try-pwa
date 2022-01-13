import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

import { CustomRoutes } from 'components/CustomRoutes'
import { useScrollToTop } from 'utils/useScrollToTop'

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ 'modules/home'))

const files = require.context('.', true, /^(?!.*index).*\/(?!.*test).*\.js$/)

// files.keys() will be look like this ['./js-words-mastery.js', './snake.js', ...rest]
const Components = files.keys().map((filePath) => {
  // parse filePath into route path. Example: /snake
  const path = filePath.substring(1, filePath.length - 3)
  // NOTE: Must be default export, and there is no nested routes
  return { path, Component: files(filePath).default }
})

export const AppRoutes = () => {
  useScrollToTop()

  return (
    <Suspense fallback={<TopBarProgress />}>
      <CustomRoutes>
        <Route path="/" element={<Home />} />
        {Components.map(({ Component, path } = {}) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </CustomRoutes>
    </Suspense>
  )
}
