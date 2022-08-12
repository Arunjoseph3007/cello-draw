export const MOVE = {
  onMouseDown: ({ e, position, setPosition }) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];


    if (!position.engaged) {
      setPosition((prev) => ({ ...prev, engaged: true, anchor: { x, y } }));
    } else {
      setPosition((prev) => ({ ...prev, engaged: false, anchor: null }));
    }
  },

  onMouseMove: ({ e, position, setPosition }) => {
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    if (!position.engaged) return;

    setPosition((prev) => ({
      ...prev,
      panX: x - prev.anchor.x,
      panY: y - prev.anchor.y,
    }));
  },
};
