export const detectCountedInput = (key, keyCode) => {
  //backspace or delete button charCode
  if (key === 46 || key === 8) {
    return false
  }
  let isCountedInput = /[a-zA-Z0-9-_. ]/.test(String.fromCharCode(key))
  const specialCharacters = {}
  const dictionary = '`!@#$%^&*()_-+=[]{}|""/?.,><'
  for (let char of dictionary) {
    specialCharacters[char] = true
  }

  if (!specialCharacters[keyCode] && !isCountedInput) {
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
  for (let i = 0; i < 10; i++) {
    const randomIdx = Math.floor(Math.random() * clonedData.length)
    let word = clonedData[randomIdx]
    if (i !== 9) {
      word += ' '
    }
    output += word
    clonedData.splice(randomIdx, 1)
  }
  return output
}
