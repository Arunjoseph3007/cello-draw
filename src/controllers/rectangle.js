import { v4 } from "uuid";

export const RECTANGLE = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!newShape) {
      setNewShape({
        origin: { x, y },
        x,
        y,
        width: 0,
        height: 0,
        type: "RECTANGLE",
        status: 1,
        id: v4(),
      });
    }

    //For second touch
    else {
      let newX = min(x, newShape.origin.x);
      let newY = min(y, newShape.origin.y);
      let newW = Math.abs(x - newShape.origin.x);
      let newH = Math.abs(y - newShape.origin.y);
      elements.push({
        ...newShape,
        x: newX,
        y: newY,
        width: newW,
        height: newH,
        status: -1,
      });
      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => {
      let newX = min(x, prev.origin.x);
      let newY = min(y, prev.origin.y);
      let newW = Math.abs(x - prev.origin.x);
      let newH = Math.abs(y - prev.origin.y);
      return { ...prev, x: newX, y: newY, width: newW, height: newH };
    });
  },
};

const min = (a, b) => (a < b ? a : b);
const max = (a, b) => (a > b ? a : b);
