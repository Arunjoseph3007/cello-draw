import { Line } from "@/shapes/Line";

export const LINE = {

  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!newShape) {
      setNewShape(new Line(x, y));
    }

    //For second touch
    else {
      elements.push(newShape.land(x, y));
    }
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    if (!newShape) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewShape((prev) => newShape.moveTo(x, y));
  },
};
