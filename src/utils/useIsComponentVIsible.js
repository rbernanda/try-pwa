import { useState } from 'react'

export function useIsComponentVisible(initialVisible = false) {
  const [isVisible, setIsVisible] = useState(initialVisible)

  const showComponent = () => setIsVisible(true)
  const hideComponent = () => setIsVisible(false)

  return { isVisible, showComponent, hideComponent }
}
