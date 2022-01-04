export const moveRight = ([t, l] = []) => [t, l + 1]
export const moveLeft = ([t, l] = []) => [t, l - 1]
export const moveUp = ([t, l] = []) => [t - 1, l]
export const moveDown = ([t, l] = []) => [t + 1, l]

export const makeInitialSnake = () => [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]

export const toKey = ([top, left] = []) => top + '_' + left

export const areOpposite = (dir1, dir2) => {
  if (dir1 === moveLeft && dir2 === moveRight) {
    return true
  }
  if (dir1 === moveRight && dir2 === moveLeft) {
    return true
  }
  if (dir1 === moveUp && dir2 === moveDown) {
    return true
  }
  if (dir1 === moveDown && dir2 === moveUp) {
    return true
  }
  return false
}
