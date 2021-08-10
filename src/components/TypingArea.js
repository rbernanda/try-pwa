import { useEffect, useRef } from 'react'

function TypingArea({
  input,
  handleOnChange,
  handleOnKeyDown,
  handleReset,
  timer,
  setSpyAnimation,
  spyAnimation,
}) {
  const ref = useRef(null)

  const handleOnReset = () => {
    if (ref.current) {
      ref.current.focus()
    }
    setSpyAnimation(spyAnimation > 0 ? spyAnimation - 1 : spyAnimation + 1)
    handleReset()
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
    setSpyAnimation(spyAnimation > 0 ? spyAnimation - 1 : spyAnimation + 1)
  }, [])
  return (
    <div className="h-4/6 w-full flex justify-center mt-4 sm:mt-0 dark:bg-gray-800 bg-gray-100">
      <div className="flex flex-col sm:flex-row-reverse sm:justify-center w-10/12 sm:w-5/12 gap-4">
        <div className="flex gap-x-2 justify-center">
          <div className="flex rounded select-none justify-center items-center w-16 sm:h-1/6 bg-yellow-600 dark:bg-yellow-100">
            {timer}
          </div>
          <button
            onClick={handleOnReset}
            className="sm:h-1/6 bg-blue-200 p-4 hover:scale-105 transition transform duration-100 ease-out"
          >
            reload
          </button>
        </div>
        <input
          ref={ref}
          value={input}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          type="text"
          className="sm:text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-600  bg-gray-200 dark:text-gray-200 p-4 rounded outline-none sm:h-1/6 sm:flex-grow dark:border-gray-700 border dark:bg-gray-800 dark:shadow-xl"
        />
      </div>
    </div>
  )
}

export default TypingArea
