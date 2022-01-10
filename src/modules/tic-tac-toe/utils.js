import { PLAYERS } from './constant'

const scores = {
  X: 10,
  O: -10,
  tie: 0,
}

const areEqual = (a, b, c) => a != '' && a == b && b == c

export const cloneBoard = (board) => board.map((row) => row.map((cell) => cell))
export const delay = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 100))

export const checkWinner = (board) => {
  let winner = null
  let highlightBoard = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]

  let openSpots = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++
      }
    }
  }

  if (areEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0]
    highlightBoard[0][0] = true
    highlightBoard[1][1] = true
    highlightBoard[2][2] = true
  }
  if (areEqual(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0]
    highlightBoard[2][0] = true
    highlightBoard[1][1] = true
    highlightBoard[0][2] = true
  }

  for (let i = 0; i < 3; i++) {
    // horizontal
    if (areEqual(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0]
      highlightBoard[i][0] = true
      highlightBoard[i][1] = true
      highlightBoard[i][2] = true
    }
    // vertical
    if (areEqual(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i]
      highlightBoard[0][i] = true
      highlightBoard[1][i] = true
      highlightBoard[2][i] = true
    }
  }

  if (winner == null && openSpots == 0) {
    return { winner: 'tie', highlightBoard }
  }

  return { winner, highlightBoard }
}

export const bestMove = (board) => {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = PLAYERS.AI
        let score = minimax(board, 0, false)
        board[i][j] = ''
        if (score > bestScore) {
          bestScore = score
          move = { i, j }
        }
      }
    }
  }

  return [move.i, move.j]
}

export const minimax = (board, depth, isMaximizing) => {
  let { winner: result } = checkWinner(board)
  if (result !== null) {
    return scores[result]
  }

  let bestScore = Infinity

  if (isMaximizing) {
    bestScore = -Infinity
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = PLAYERS.AI
          let score = minimax(board, depth + 1, false)
          board[i][j] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = PLAYERS.HUMAN
        let score = minimax(board, depth + 1, true)
        board[i][j] = ''
        bestScore = Math.min(score, bestScore)
      }
    }
  }
  return bestScore
}
