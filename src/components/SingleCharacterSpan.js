import * as COLOR from '../configs/color'

const SingleCharacterSpan = ({ idx, char, input }) => {
  const characterStyle = {
    color: `${
      input[idx] === undefined
        ? COLOR.NOT_TYPED_YET
        : char !== input[idx]
        ? COLOR.INCORRECT
        : COLOR.CORRECT
    }`,
    textDecoration: `${
      char !== input[idx] && input[idx] !== undefined ? 'underline' : ''
    }`,
  }
  return <span style={characterStyle}>{char}</span>
}

export default SingleCharacterSpan
