import { lazy } from 'react'

const SnakeGame = lazy(() =>
  import(/* webpackChunkName: 'SnakeGame' */ 'modules/snake')
)

export default SnakeGame
