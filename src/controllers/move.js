export const MOVE = {
  onMouseDown: ({ e, position, setPosition }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    if (!position.engaged) {
      setPosition((prev) => ({
        ...prev,
        engaged: true,
        anchor: { x, y, initial: { x: prev.panX, y: prev.panY } },
      }));
    } else {
      setPosition((prev) => ({ ...prev, engaged: false, anchor: null }));
    }
  },

  onMouseMove: ({ e, position, setPosition }) => {
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    if (!position.engaged) return;

    setPosition((prev) => ({
      ...prev,
      panX: prev.anchor.initial.x + x - prev.anchor.x,
      panY: prev.anchor.initial.y + y - prev.anchor.y,
    }));
  },
};
