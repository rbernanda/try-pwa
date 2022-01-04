// TODO move game state to reducer
import React, { createRef, useEffect, useRef, useState } from 'react'

import { Head } from 'components/Head'
import { Modal } from 'components/Modal'
import { PIXEL, ROWS, COLUMNS } from './constant'
import {
  makeInitialSnake,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  toKey,
  areOpposite,
} from './utils'

export default function SnakeGame() {
  const [initialCanvas, setInitialCanvas] = useState([])
  const [showStopGameModal, setShowStopGameModal] = useState(false)

  const canvas = useRef()
  const pixelRefs = useRef(new Map())
  const currentSnake = useRef()
  const currentSnakeKeys = useRef()
  const currentVacantKeys = useRef()
  const currentFoodKey = useRef()
  const currentDirection = useRef()
  const directionQueue = useRef()
  const gameInterval = useRef()

  const isMounted = useRef()

  function drawCanvas() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        let key = toKey([i, j])
        let pixel = pixelRefs.current.get(key)
        let background = 'white'
        if (key === currentFoodKey.current) {
          background = 'purple'
        } else if (
          currentSnakeKeys.current &&
          currentSnakeKeys.current.has(key)
        ) {
          background = 'black'
        }
        if (pixel && pixel.current) {
          pixel.current.style.background = background
        }
        // console.log(pixel)
      }
    }
  }

  function step() {
    if (!currentSnake.current) return
    let head = currentSnake.current[currentSnake.current.length - 1]
    let nextDirection = currentDirection.current
    while (directionQueue.current.length > 0) {
      let candidateDirection = directionQueue.current.shift()
      if (!areOpposite(candidateDirection, currentDirection.current)) {
        nextDirection = candidateDirection
        break
      }
    }
    currentDirection.current = nextDirection
    let nextHead = currentDirection.current(head)
    if (!checkValidHead(currentSnakeKeys.current, nextHead)) {
      stopGame(false)
      return
    }
    pushHead(nextHead)
    if (toKey(nextHead) == currentFoodKey.current) {
      let nextFoodKey = spawnFood()
      if (nextFoodKey === null) {
        stopGame(true)
        return
      }
      currentFoodKey.current = nextFoodKey
    } else {
      popTail()
    }
    drawCanvas()
  }

  function startGame() {
    directionQueue.current = []
    currentDirection.current = moveRight
    currentSnake.current = makeInitialSnake()
    currentSnakeKeys.current = new Set()
    currentVacantKeys.current = new Set()
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        currentVacantKeys.current.add(toKey([i, j]))
      }
    }
    for (let cell of currentSnake.current) {
      let key = toKey(cell)
      currentVacantKeys.current.delete(key)
      currentSnakeKeys.current.add(key)
    }
    currentFoodKey.current = spawnFood()
    const [snakeKeys, vacantKeys] = partitionCells(currentSnake.current)
    currentSnakeKeys.current = snakeKeys
    currentVacantKeys.current = vacantKeys

    if (canvas.current) {
      canvas.current.style.borderColor = ''
    }
    gameInterval.current = setInterval(step, 100)
    drawCanvas()
  }

  function spawnFood() {
    if (currentVacantKeys.current.size === 0) {
      return null
    }
    let choice = Math.floor(Math.random() * currentVacantKeys.current.size)
    let i = 0
    for (let key of currentVacantKeys.current) {
      if (i === choice) {
        return key
      }
      i++
    }
    throw Error('should never get here')
  }

  function partitionCells(snake) {
    let snakeKeys = new Set()
    let vacantKeys = new Set()
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        vacantKeys.add(toKey([i, j]))
      }
    }
    for (let cell of snake) {
      let key = toKey(cell)
      vacantKeys.delete(key)
      snakeKeys.add(key)
    }
    return [snakeKeys, vacantKeys]
  }

  function checkValidHead(keys, cell = []) {
    let [top, left] = cell
    if (top < 0 || left < 0) {
      return false
    }
    if (top >= ROWS || left >= COLUMNS) {
      return false
    }
    if (keys.has(toKey(cell))) {
      return false
    }
    return true
  }

  function pushHead(nextHead) {
    currentSnake.current.push(nextHead)
    let key = toKey(nextHead)
    currentVacantKeys.current.delete(key)
    currentSnakeKeys.current.add(key)
  }

  function popTail() {
    let tail = currentSnake.current.shift()
    let key = toKey(tail)
    currentVacantKeys.current.add(key)
    currentSnakeKeys.current.delete(key)
  }

  function stopGame(success) {
    if (canvas.current) {
      canvas.current.style.borderColor = success ? 'green' : 'red'
    }
    clearInterval(gameInterval.current)
    setShowStopGameModal(true)
  }

  useEffect(() => {
    const components = []
    const collectedRefs = new Map()

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        const top = i * PIXEL + 'px'
        const left = j * PIXEL + 'px'
        let key = toKey([i, j])
        components.push({ top, left, background: 'white', key })
        collectedRefs.set(key, createRef())
      }
    }

    pixelRefs.current = collectedRefs
    setInitialCanvas(components)
  }, [])

  useEffect(() => {
    if (initialCanvas.length) {
      drawCanvas()
    }
  }, [initialCanvas.length])

  useEffect(() => {
    startGame()
    isMounted.current = true
  }, [])

  console.log(gameInterval)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.shiftKey ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        !directionQueue.current
      ) {
        return
      }
      e.preventDefault()
      switch (e.key) {
        case 'ArrowLeft':
        case 'A':
        case 'a':
          directionQueue.current.push(moveLeft)
          break
        case 'ArrowRight':
        case 'D':
        case 'd':
          directionQueue.current.push(moveRight)
          break
        case 'ArrowUp':
        case 'W':
        case 'w':
          directionQueue.current.push(moveUp)
          break
        case 'ArrowDown':
        case 'S':
        case 's':
          directionQueue.current.push(moveDown)
          break
        case 'R':
        case 'r':
          stopGame(false)
          setShowStopGameModal(false)
          startGame()
          break
        case ' ':
          step()
          break
      }
    }

    if (isMounted) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMounted])

  return (
    <>
      <Head>
        <title>Snake Game</title>
      </Head>
      <Modal
        title="Game Over"
        description="press r to play again"
        isOpen={showStopGameModal}
        setIsOpen={setShowStopGameModal}
      >
        <div className="mt-4">
          <p className="text-lg text-gray-500">Play Again?</p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={() => {
              stopGame(false)
              setShowStopGameModal(false)
              startGame()
            }}
          >
            Got it, Okay!
          </button>
        </div>
      </Modal>
      <div
        ref={canvas}
        style={{ width: '1000px', height: '500px', boxSizing: 'content-box' }}
        className="container mx-auto mt-8 border-4 border-solid border-black rounded relative"
      >
        {initialCanvas.map(({ top, left, background, key }, index) => (
          <div
            key={index}
            ref={pixelRefs.current.get(key)}
            style={{
              border: '1px solid #aaa',
              height: `${PIXEL}px`,
              left,
              position: 'absolute',
              top,
              width: `${PIXEL}px`,
              background,
            }}
          />
        ))}
      </div>
    </>
  )
}
