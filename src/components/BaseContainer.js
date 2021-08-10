import { useState } from 'react'

import Navbar from './Navbar'

function BaseContainer({ children }) {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <div
      className={`w-full h-base-container container mx-auto ${
        darkMode ? 'dark' : ''
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </div>
  )
}

export default BaseContainer
