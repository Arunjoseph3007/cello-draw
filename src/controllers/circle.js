export const CIRCLE = {

  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!newShape) {
      setNewShape({ x1: x, y1: y, x2: x, y2: y, type: "LINE", status: 1 });
    }

    //For second touch
    else {
      elements.push({ ...newShape, x2: x, y2: y, status: 2 });
      setNewShape(null);
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => ({ ...prev, x2: x, y2: y }));
  },
};
