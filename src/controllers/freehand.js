import { getDistance } from "@/utils/getDistance";

export const FREEHAND = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!newShape) {
      setNewShape({ cx: x, cy: y, r: 0, type: "CIRCLE", status: 1 });
    }

    //For second touch
    else {
      elements.push({
        ...newShape,
        r: getDistance(newShape.cx, newShape.cy, x, y),
        status: 2,
      });
      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => ({
      ...prev,
      r: getDistance(prev.cx, prev.cy, x, y),
    }));
  },
};
