import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'

import { CustomRoutes } from 'components/CustomRoutes'

import { useScrollToTop } from 'utils/useScrollToTop'
import * as PATHNAMES from 'configs/pathnames'

const Home = lazy(() => import('modules/home'))
const JSwordsMastery = lazy(() =>
  import('modules/js-words-mastery/pages/index')
)
const SnakeGame = lazy(() => import('modules/snake'))

export const AppRoutes = () => {
  useScrollToTop()

  return (
    <Suspense fallback={<div>loading...</div>}>
      <CustomRoutes>
        <Route path="/" element={<Home />} />
        <Route path={PATHNAMES.JS_WORDS_MASTERY} element={<JSwordsMastery />} />
        <Route path={PATHNAMES.SNAKE} element={<SnakeGame />} />
      </CustomRoutes>
    </Suspense>
  )
}
