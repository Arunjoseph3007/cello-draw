export const getPath = (points, origin) => {
  let ans = " M ";
  ans += ` ${origin.x} ${origin.y} `;

  //for rest points
  points.forEach((elm) => {
    switch (elm.pathType) {
      case "H":
        ans += ` H ${elm.x} `;
        break;
      case "V":
        ans += ` V ${elm.y}`;
        break;
      case "T":
        ans += ` T ${elm.x} ${elm.y} `;
        break;
      case "L":
        ans += ` L ${elm.x} ${elm.y} `;
        break;
      case "S":
        if (!elm.y2) {
          ans += ` L ${elm.x1} ${elm.y1} `;
        } else {
          ans += ` S ${elm.x2} ${elm.y2} , ${elm.x1} ${elm.y1} `;
        }
      case "Q":
        if (!elm.y2) {
          ans += ` L ${elm.x1} ${elm.y1} `;
        } else {
          ans += ` Q ${elm.x2} ${elm.y2} , ${elm.x1} ${elm.y1} `;
        }
        break;
      case "C":
        if (!elm.y3) break;
        ans += ` C ${elm.x1} ${elm.y1} , ${elm.x2} ${elm.y2} , ${elm.x3} ${elm.y3}`;
        break;
      default:
        break;
    }
  });

  ans += " Z ";
  return ans;
};
