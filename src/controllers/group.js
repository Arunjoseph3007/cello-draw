import { v4 } from "uuid";

const ARRAY_OF_SHAPES = [
  "circle",
  "path",
  "polyline",
  "rect",
  "line",
  "polygon",
];

export const GROUP = {
  onMouseDown: ({ e, position, newShape, setNewShape, elements }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    // Ensure that the click is on a svg element
    if (!ARRAY_OF_SHAPES.includes(e.target.tagName)) return;

    // Find that Shape
    const newChild = elements.data.find((a) => a.id === e.target.id);
    if (!newChild) return;

    const id = newShape?.id || v4();

    elements.updateById(newChild.id, { ...newChild, parentId: id });

    //For first touch
    if (!newShape) {
      setNewShape({
        type: "GROUP",
        status: 1,
        id: id,
        childShapesIds: [newChild.id],
      });
      return;
    }

    //For subsequent touches
    setNewShape((prev) => ({
      ...prev,
      childShapesIds: [...prev.childShapesIds, newChild.id],
    }));
  },

  onMouseMove: ({ e, position, newShape, setNewShape, elements }) => {
    return;
  },
};
