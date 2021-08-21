//global
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
//local
import { Board, TypingArea, BaseContainer } from '../components'
import data, { TIME_LIMIT } from '../configs'
import { detectIsCountedInput, renderNewQuote } from '../helpers'
import switchOn from '../configs/sounds/switch-on.mp3'

let clonedData = [...data]

function Home() {
  const [words, setWords] = useState([])
  const [input, setInput] = useState('')
  const [nextQuote, setNextQuote] = useState(false)
  const [timer, setTimer] = useState(TIME_LIMIT)
  const [countDownInterval, setCountDownInterval] = useState(null)
  const [spyAnimation, setSpyAnimation] = useState(0)
  const [result, setResult] = useState({
    charactersTyped: 0,
    errors: 0,
    accuracy: 0,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [play] = useSound(switchOn)

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
      setInput('')
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
    if (!detectIsCountedInput(key, e.key) || timer <= 0) {
      return
    }

    play()

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
    setIsPlaying(false)
    setTimer(TIME_LIMIT)
    setResult({
      charactersTyped: 0,
      accuracy: 0,
      errors: 0,
    })
    if (countDownInterval !== null) {
      clearInterval(countDownInterval)
    }
    setInput('')
  }

  return (
    <BaseContainer>
      <main className="flex h-full flex-col items-center justify-center gap-4 dark:bg-gray-800 bg-gray-100">
        <Board
          spyAnimation={spyAnimation}
          result={result}
          isPlaying={isPlaying}
          timer={timer}
          words={words}
          input={input}
        />
        <TypingArea
          input={input}
          handleOnChange={handleOnChange}
          handleOnKeyDown={handleOnKeyDown}
          handleReset={handleReset}
          timer={timer}
          setSpyAnimation={setSpyAnimation}
          spyAnimation={spyAnimation}
        />
      </main>
    </BaseContainer>
  )
}

export default Home
