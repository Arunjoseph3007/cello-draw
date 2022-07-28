export const PathRenderer = ({ points, temp, origin, pathType, ...props }) => {
  let allPoints = [...points];
  if (temp) {
    allPoints.push(temp);
  }

  return <path d={getPath(allPoints, origin)} {...props} />;
};

const getPath = (points, origin) => {
  let ans = " M ";
  ans += ` ${origin.x} ${origin.y} `;

  //for rest points
  points.forEach((elm) => {
    switch (elm.pathType) {
      case "L":
        ans += ` L ${elm.x} ${elm.y}`;
        break;
      case "H":
        ans += ` H ${elm.x} `;
        break;
      case "V":
        ans += ` V ${elm.y}`;
        break;
      case "T":
        ans += ` T ${elm.x} ${elm.y}`;
        break;
      default:
        break;
    }
  });

  ans += " Z ";
  return ans;
};
