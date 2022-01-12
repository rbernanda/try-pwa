import { lazy } from 'react'

const TicTacToe = lazy(() =>
  import(/* webpackChunkName: 'TicTacToe' */ 'modules/tic-tac-toe')
)

export default TicTacToe
