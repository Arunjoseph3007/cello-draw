import { getPoints } from "src/utils/getPoints";

export const POLYGON = {
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
        type: "POLYGON",
        status: 1,
      });
      return;
    }

    //For subsequent touches
    setNewShape((prev) => {
      const previousPoints = prev.points.slice(0, -1);

      return {
        ...prev,
        points: [...previousPoints, { x, y }, { x, y }],
      };
    });
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => {
      const previousPoints = prev.points.slice(0, -1);

      return {
        ...prev,
        points: [...previousPoints, { x, y }],
      };
    });
  },
};
