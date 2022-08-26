export const getPoints = (points = [], smoothing = 1) =>
  points
    .reduce((current, elm) => `${current} ${elm.x},${elm.y} `, " ");
