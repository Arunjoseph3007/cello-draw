import { getDistance } from "@/utils/getDistance";

export const FREEHAND = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!newShape) {
      setNewShape({
        points: [
          { x, y },
          { x, y },
        ],
        type: "FREEHAND",
        status: 1,
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

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => ({
      ...prev,
      points: [...prev.points, { x, y }],
    }));
  },
};
