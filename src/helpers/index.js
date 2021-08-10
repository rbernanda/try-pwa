import { TOTAL_WORDS_TO_RENDER } from '../configs'

export const detectIsCountedInput = (keyCode, key) => {
  //backspace or delete button keyCode
  if (keyCode === 46 || keyCode === 8) {
    return false
  }
  const isAlphaNumeric = /[a-zA-Z0-9-_. ]/.test(String.fromCharCode(keyCode))
  const isSpecialCharacters = '`!@#$%^&*()_-+=[]{}|""/?.,><'

  if (!isSpecialCharacters.includes(key) && !isAlphaNumeric) {
    return false
  }

  return true
}

export const renderNewQuote = (clonedData, setWords) => {
  const wordsToRender = getRandomQuote(clonedData)
    .split('')
    .map((char) => char)

  setWords(wordsToRender)
}

const getRandomQuote = (clonedData) => {
  let output = ''
  for (let i = 0; i < TOTAL_WORDS_TO_RENDER; i++) {
    const randomIdx = Math.floor(Math.random() * clonedData.length)
    let word = clonedData[randomIdx]
    if (i !== TOTAL_WORDS_TO_RENDER - 1) {
      word += ' '
    }
    output += word
    clonedData.splice(randomIdx, 1)
  }
  return output
}
