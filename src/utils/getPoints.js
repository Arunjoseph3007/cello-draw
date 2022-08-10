export const getPoints = (points = [], smoothing = 1) =>
  points
    .filter((a) => a % smoothing === 0)
    .reduce((current, elm) => `${current} ${elm.x},${elm.y} `, " ");
