import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

import { CustomRoutes } from 'components/CustomRoutes'

import { useScrollToTop } from 'utils/useScrollToTop'
import * as PATHNAMES from 'configs/pathnames'

const Home = lazy(() => import('modules/home'))
const JSwordsMastery = lazy(() =>
  import('modules/js-words-mastery/pages/index')
)
const SnakeGame = lazy(() => import('modules/snake'))
const TicTacToe = lazy(() => import('modules/tic-tac-toe'))

export const AppRoutes = () => {
  useScrollToTop()

  return (
    <Suspense fallback={<TopBarProgress />}>
      <CustomRoutes>
        <Route path="/" element={<Home />} />
        <Route path={PATHNAMES.JS_WORDS_MASTERY} element={<JSwordsMastery />} />
        <Route path={PATHNAMES.SNAKE} element={<SnakeGame />} />
        <Route path={PATHNAMES.TIC_TAC_TOE} element={<TicTacToe />} />
      </CustomRoutes>
    </Suspense>
  )
}
