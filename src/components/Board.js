import SingleCharacterSpan from './SingleCharacterSpan'

function ScoreBoard({ charactersTyped, errors }) {
  return (
    <div>
      <div> charactersTyped : {charactersTyped}</div>
      <div> errors : {errors}</div>
    </div>
  )
}

function Board({ isPlaying, timer, words, charactersTyped, errors, input }) {
  return (
    <div className="flex justify-center items-center leading-normal select-none w-9/12 text-center text-3xl h-2/6 bg-red-100 py-4 px-6 rounded shadow-sm">
      <div>
        {isPlaying || timer > 0 ? (
          words.map((char, i) => (
            <SingleCharacterSpan key={i} idx={i} input={input} char={char} />
          ))
        ) : (
          <ScoreBoard charactersTyped={charactersTyped} errors={errors} />
        )}
      </div>
    </div>
  )
}

export default Board
