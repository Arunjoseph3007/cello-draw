import { v4 } from "uuid";

export const PATH = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [position.x, position.y];

    //For first touch
    if (!newShape) {
      setNewShape({
        origin: { x, y },
        pathType: "L",
        points: [{ x, y, pathType: "L" }],
        type: "PATH",
        status: 1,
        id: v4(),
      });
    }

    //For sunsequent touch
    else {
      setNewShape((prev) => {
        switch (prev.pathType) {
          case "L":
          case "H":
          case "V":
          case "T":
            return {
              ...prev,
              points: [...prev.points, { x, y, pathType: prev.pathType }],
              temp: { x, y, pathType: prev.pathType },
            };

          case "Q":
          case "S":
            if (prev.status === 1) {
              return {
                ...prev,
                temp: { x1: x, y1: y, pathType: prev.pathType },
                status: 2,
              };
            } else {
              return {
                ...prev,
                status: 1,
                points: [...prev.points, { ...prev.temp, x2: x, y2: y }],
                temp: { x1: x, y1: y, pathType: prev.pathType },
              };
            }

          default:
            return prev;
        }
      });
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [position.x, position.y];

    setNewShape((prev) => {
      switch (prev.pathType) {
        case "L":
        case "H":
        case "V":
        case "T":
          return {
            ...prev,
            temp: { x, y, pathType: prev.pathType },
          };

        case "Q":
        case "S":
          if (prev.status === 1) {
            return {
              ...prev,
              temp: { x1: x, y1: y, pathType: prev.pathType },
            };
          } else {
            return {
              ...prev,
              temp: { ...prev.temp, x2: x, y2: y },
            };
          }

        default:
          return prev;
      }
    });
  },
};
