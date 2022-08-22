import { v4 } from "uuid";

export const FREEHAND = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [position.x, position.y];

    //For first touch
    if (!newShape) {
      setNewShape({
        points: [
          { x, y },
          { x, y },
        ],
        type: "FREEHAND",
        status: 1,
        strokeWidth: 1,
        smoothing: 1,
        id: v4(),
      });
    }

    //For second touch
    else {
      elements.push({ ...newShape, status: -1 });
      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [position.x, position.y];
    setNewShape((prev) => ({
      ...prev,
      points: [...prev.points, { x, y }],
    }));
  },
};
