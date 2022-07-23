export const getPoints = (points = []) =>
  points.reduce((current, elm) => `${current} ${elm.x},${elm.y} `, " ");
