//global
import { useEffect, useState } from 'react'
//local
import Navbar from '../components/Navbar'
import BaseContainer from '../components/BaseContainer'
import SingleCharacterSpan from '../components/SingleCharacterSpan'
import data, { TIME_LIMIT } from '../configs'
import { detectCountedInput, renderNewQuote } from '../helpers'

let clonedData = [...data]

function Home() {
  const [words, setWords] = useState([])
  const [input, setInput] = useState('')
  const [nextQuote, setNextQuote] = useState(false)
  const [timer, setTimer] = useState(TIME_LIMIT)
  const [countDownInterval, setCountDownInterval] = useState(null)
  const [result, setResult] = useState({
    charactersTyped: 0,
    errors: 0,
    accuracy: 0,
  })
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => renderNewQuote(clonedData, setWords), [])

  useEffect(() => {
    if (nextQuote && input.length === words.length) {
      setInput('')
      renderNewQuote(clonedData, setWords)
    }
  }, [input, nextQuote])

  useEffect(() => {
    if (isPlaying) {
      setCountDownInterval(
        setInterval(() => {
          setTimer((timer) => timer - 1)
        }, 1000)
      )
    }

    return () => clearInterval(countDownInterval)
  }, [isPlaying])

  useEffect(() => {
    if (timer <= 0 && countDownInterval !== null) {
      clearInterval(countDownInterval)
      setIsPlaying(false)
    }
  }, [timer])

  const handleOnChange = ({ target: { value } }) => {
    if (!isPlaying && timer > 0) {
      setIsPlaying(true)
    }

    setInput(value)
    if (value === words.join('').slice(0, value.length)) {
      setNextQuote(true)
    } else {
      setNextQuote(false)
    }
  }

  const handleOnKeyDown = (e) => {
    const key = e.keyCode || e.charCode
    if (!detectCountedInput(key, e.key) || timer <= 0) {
      return
    }

    const currentIdx = input.length
    const errors =
      e.key !== words[currentIdx] ? result.errors + 1 : result.errors
    setResult({
      ...result,
      errors,
      charactersTyped: result.charactersTyped + 1,
    })
  }

  const handleReset = () => {
    clonedData = [...data]
    renderNewQuote(clonedData, setWords)
    setTimer(TIME_LIMIT)
    setResult({
      charactersTyped: 0,
      accuracy: 0,
      errors: 0,
    })
    setInput('')
  }

  return (
    <BaseContainer>
      <Navbar />
      <main className="flex h-full flex-col items-center justify-center mt-10 gap-4">
        <div className="flex justify-center items-center leading-normal w-9/12 text-center text-3xl h-2/6 bg-red-100 py-4 px-6 rounded shadow-sm">
          <div>
            {isPlaying || timer > 0 ? (
              words.map((char, i) => (
                <SingleCharacterSpan
                  key={i}
                  idx={i}
                  input={input}
                  char={char}
                />
              ))
            ) : (
              <div>
                <div> charactersTyped : {result.charactersTyped}</div>
                <div> errors : {result.errors}</div>
              </div>
            )}
          </div>
        </div>
        <div className="h-4/6 w-full bg-white flex justify-center">
          <div className="flex justify-center w-5/12 gap-x-2">
            <input
              value={input}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              type="text"
              className="bg-red-100 p-4 outline-none h-1/6 flex-grow"
            />
            <div className="flex justify-center items-center w-16 h-1/6 bg-yellow-100">
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
      </main>
    </BaseContainer>
  )
}

export default Home
