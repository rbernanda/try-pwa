import SingleCharacterSpan from './SingleCharacterSpan'

function ScoreBoard({ result: { charactersTyped, errors } }) {
  return (
    <div className="text-gray-600 dark:text-gray-400">
      <div> charactersTyped : {charactersTyped}</div>
      <div> errors : {errors}</div>
    </div>
  )
}

function Board({ isPlaying, timer, words, result, input }) {
  return (
    <div className="mt-10 flex bg-gray-200 dark:bg-gray-800 justify-center items-center leading-normal select-none w-full sm:w-9/12 text-center text-3xl h-2/6 dark:border-gray-700 border py-4 px-6 rounded dark:shadow-md">
      <div>
        {isPlaying || timer > 0 ? (
          words.map((char, i) => (
            <SingleCharacterSpan key={i} idx={i} input={input} char={char} />
          ))
        ) : (
          <ScoreBoard result={result} />
        )}
      </div>
    </div>
  )
}

export default Board
