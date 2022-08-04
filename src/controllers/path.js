import { v4 } from "uuid";

export const PATH = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

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
        return {
          ...prev,
          points: [...prev.points, { x, y, pathType: prev.pathType }],
          temp: { x, y, pathType: prev.pathType },
        };
      });
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => {
      return {
        ...prev,
        temp: { x, y, pathType: prev.pathType },
      };
    });
  },
};
