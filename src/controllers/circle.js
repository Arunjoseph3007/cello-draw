import { getDistance } from "@/utils/getDistance";
import { v4 } from "uuid";

export const CIRCLE = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [position.x, position.y];

    //For first touch
    if (!newShape) {
      setNewShape({ cx: x, cy: y, r: 0, type: "CIRCLE", status: 1, id: v4() });
    }

    //For second touch
    else {
      elements.push({
        ...newShape,
        r: getDistance(newShape.cx, newShape.cy, x, y),
        status: -1,
      });
      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [position.x, position.y];
    setNewShape((prev) => ({
      ...prev,
      r: getDistance(prev.cx, prev.cy, x, y),
    }));
  },
};
