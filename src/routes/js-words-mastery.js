import { lazy } from 'react'

const JSwordsMastery = lazy(() =>
  import(
    /* webpackChunkName: 'JSWordsMastery' */ 'modules/js-words-mastery/pages/index'
  )
)

export default JSwordsMastery
