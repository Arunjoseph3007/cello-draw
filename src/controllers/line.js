export const LINE = {
  engaged: 0,

  onMouseDown: ({
    e,
    position,
    newShape,
    setNewShape,
    elements,
    engaged,
    setEngaged
  }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!engaged) {
      setNewShape({ x1: x, y1: y, x2: x, y2: y });
      setEngaged(1);
    }

    //For second touch
    else {
      elements.push({ ...newShape, x2: x, y2: y });
      setEngaged(0);
      setNewShape(null);
    }
  },

  onMouseMove: ({
    e,
    position,
    newShape,
    setNewShape,
    elements,
    engaged,
    setEngaged
  }) => {
    if (!engaged) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => ({ ...prev, x2: x, y2: y }));
  },
};
