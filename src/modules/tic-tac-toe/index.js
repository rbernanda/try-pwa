import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'

import { Head } from 'components/Head'
import { Modal } from 'components/Modal'
import { useIsComponentVisible } from 'utils/useIsComponentVIsible'

import { BOARD, PLAYERS, WIDTH, HEIGHT, HIGHLIGHT_BOARD } from './constant'
import { bestMove, checkWinner, cloneBoard, delay } from './utils'
import over from './over.wav'

import './style.css'

export default function TicTacToe() {
  const [board, setBoard] = useState(BOARD)
  const [highlightedBoard, setHighlightedBoard] = useState(HIGHLIGHT_BOARD)
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.HUMAN)
  const [winner, setWinner] = useState(null)

  const [play] = useSound(over)
  const { isVisible, showComponent, hideComponent } =
    useIsComponentVisible(false)

  const handleOnClick = ([i, j] = []) => {
    if (board[i][j] !== '' || winner || currentPlayer === PLAYERS.AI) return

    const newBoard = cloneBoard(board)
    newBoard[i][j] = PLAYERS.HUMAN
    setBoard(newBoard)
    setCurrentPlayer(PLAYERS.AI)
  }

  const resetGame = () => {
    setBoard(BOARD)
    setCurrentPlayer(PLAYERS.HUMAN)
    setWinner(null)
    hideComponent()
    setHighlightedBoard(cloneBoard(HIGHLIGHT_BOARD))
  }

  useEffect(() => {
    const { winner: result, highlightBoard } = checkWinner(board)
    if (result) {
      play()
      setWinner(result)
      setHighlightedBoard(highlightBoard)
      showComponent()
    }

    if (currentPlayer === PLAYERS.AI && result === null) {
      // AI to make its turn
      ;(async function () {
        const newBoard = cloneBoard(board)
        const [i, j] = bestMove(newBoard)
        newBoard[i][j] = PLAYERS.AI
        await delay()
        setBoard(newBoard)
        setCurrentPlayer(PLAYERS.HUMAN)
      })()
    }
  }, [currentPlayer])

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <div className="container mx-auto flex justify-center space-x-4 text-lg my-2 items-center">
        {winner && (
          <button
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={resetGame}
          >
            New Game
          </button>
        )}
        <p className="py-2 font-medium">
          {winner
            ? 'Game Over'
            : currentPlayer === PLAYERS.HUMAN
            ? 'Your Turn'
            : 'AI Turn'}
        </p>
      </div>

      <div
        className="container mx-auto grid grid-cols-3 mt-4"
        style={{ height: `${HEIGHT}px`, width: `${WIDTH}px` }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              onClick={() => handleOnClick([i, j])}
              key={`${i}_${j}`}
              className={`relative flex justify-center 
              items-center border border-black 
              ${
                winner || currentPlayer === PLAYERS.AI || cell
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } ${cell} ${highlightedBoard[i][j] ? 'bg-blue-100' : ''}`}
            />
          ))
        )}
      </div>
      <Modal isOpen={isVisible} title="Game Over" onClose={hideComponent}>
        <div className="mt-4">
          <p className="text-lg text-gray-500">
            {winner === PLAYERS.AI ? 'AI win the game' : 'Tie'}. Play Again?
          </p>
        </div>
        <div className="mt-4 flex gap-x-4">
          <button
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={resetGame}
          >
            Okay!
          </button>
          <button
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={hideComponent}
          >
            No, Thanks!
          </button>
        </div>
      </Modal>
    </>
  )
}
