import { v4 } from "uuid";

export const GROUP = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    console.log(e.target.id);
    if (
      !["circle", "path", "polyline", "rect", "line", "polygon"].includes(
        e.target.tagName
      )
    )
      return;

    const newChild = elements.data.find((a) => a.id === e.target.id);

    elements.filter((a) => a.id !== newChild.id);

    //For first touch
    if (!newShape) {
      setNewShape({
        type: "GROUP",
        status: 1,
        id: v4(),
        childShapes: [newChild],
      });
      return;
    }

    //For subsequent touches
    setNewShape((prev) => ({
      ...prev,
      childShapes: [...prev.childShapes, newChild],
    }));
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    return;

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
