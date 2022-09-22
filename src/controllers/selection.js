import { v4 } from "uuid";

export const SELECT = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [position.x, position.y];

    //For first touch
    if (!newShape) {
      setNewShape({
        origin: { x, y },
        x,
        y,
        width: 0,
        height: 0,
        isTemporaryForSelection: true,
        type: "RECTANGLE",
        corners: 0,
        stroke: "blue",
        fill: "lightblue",
        opacity: 0.3,
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

      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [position.x, position.y];

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
