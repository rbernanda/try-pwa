import SingleCharacterSpan from './SingleCharacterSpan'
import Jump from 'react-reveal/Jump'
import Tada from 'react-reveal/Tada'

function ScoreBoard({ result: { charactersTyped, errors } }) {
  return (
    <div className="text-gray-600 dark:text-gray-400">
      <div> charactersTyped : {charactersTyped}</div>
      <div> errors : {errors}</div>
    </div>
  )
}

function Board({ isPlaying, timer, words, result, input, spyAnimation }) {
  return (
    <div className="mt-10 flex bg-gray-200 dark:bg-gray-800 justify-center items-center leading-normal select-none w-full sm:w-9/12 text-center text-3xl h-2/6 dark:border-gray-700 border py-4 px-6 rounded dark:shadow-md">
      <Jump spy={spyAnimation}>
        <div>
          {isPlaying || timer > 0 ? (
            words.map((char, i) => (
              <SingleCharacterSpan key={i} idx={i} input={input} char={char} />
            ))
          ) : (
            <Tada>
              <ScoreBoard result={result} />
            </Tada>
          )}
        </div>
      </Jump>
    </div>
  )
}

export default Board
