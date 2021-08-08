import ToggleTheme from './ToggleTheme'

function Navbar({ setDarkMode, darkMode }) {
  return (
    <nav className="w-full flex justify-center items-center p-2 relative dark:bg-gray-800 bg-gray-100">
      <header className="text-center sm:space-y-2 space-y-1">
        <h1 className="text-2xl sm:text-4xl text-yellow-600">
          JS wordsMastery()
        </h1>
        <h3 className="text-base sm:text-xl dark:text-blue-200 ">
          Build Your Muscle Memory
        </h3>
      </header>
      <ToggleTheme setDarkMode={setDarkMode} darkMode={darkMode} />
    </nav>
  )
}

export default Navbar
