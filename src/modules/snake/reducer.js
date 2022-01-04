export const initialGameState = {
  currentSnake: null,
  currentSnakeKeys: null,
  currentVacantKeys: null,
  currentFoodKey: null,
  currentDirection: null,
  directionQueue: null,
  pixels: {},
  gameInterval: null,
}

export function reducer(state, { type, payload } = {}) {
  const ACTIONS = {
    SET_PIXELS: () => ({
      ...state,
      pixels: payload,
    }),
    DEFAULT: () => state,
  }

  return (ACTIONS[type] || ACTIONS.DEFAULT)()
}
