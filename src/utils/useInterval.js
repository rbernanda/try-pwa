import { useEffect, useRef } from 'react'

export const useInterval = (callback, miliseconds, shouldClear = false) => {
  const savedCallback = useRef()

  useEffect(() => (savedCallback.current = callback), [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()

    if (miliseconds) {
      const id = setInterval(tick, miliseconds)
      if (shouldClear) {
        clearInterval(id)
      }
      return () => clearInterval(id)
    }
  }, [miliseconds, shouldClear])
}
