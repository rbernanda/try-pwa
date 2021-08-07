import * as COLOR from '../configs/color'

const SingleCharacterSpan = ({ idx, char, input }) => {
  return (
    <span
      style={{
        color: `${
          input[idx] === undefined
            ? COLOR.NOT_TYPED_YET
            : char !== input[idx]
            ? COLOR.INCORRECT
            : COLOR.CORRECT
        }`,
      }}
    >
      {char}
    </span>
  )
}

export default SingleCharacterSpan
