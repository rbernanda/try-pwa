function BaseContainer({ children, darkMode }) {
  return (
    <div
      className={`w-full h-base-container container mx-auto ${
        darkMode ? 'dark' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default BaseContainer
