import { v4 } from "uuid";

export const LINE = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [position.x, position.y];

    //For first touch
    if (!newShape) {
      setNewShape({
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        type: "LINE",
        status: 1,
        id: v4(),
      });
    }

    //For second touch
    else {
      elements.push({ ...newShape, x2: x, y2: y, status: -1 });
      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [position.x, position.y];
    setNewShape((prev) => ({ ...prev, x2: x, y2: y }));
  },
};
