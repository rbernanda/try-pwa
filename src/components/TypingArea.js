function TypingArea({
  input,
  handleOnChange,
  handleOnKeyDown,
  handleReset,
  timer,
}) {
  return (
    <div className="h-4/6 w-full bg-white flex justify-center">
      <div className="flex justify-center w-5/12 gap-x-2">
        <input
          value={input}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          type="text"
          className="bg-red-100 p-4 outline-none h-1/6 flex-grow"
        />
        <div className="flex select-none justify-center items-center w-16 h-1/6 bg-yellow-100">
          {timer}
        </div>
        <button
          onClick={handleReset}
          className="h-1/6 bg-blue-200 p-4 hover:scale-105 transition transform duration-100 ease-out"
        >
          reload
        </button>
      </div>
    </div>
  )
}

export default TypingArea
