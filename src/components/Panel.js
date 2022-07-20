import { useEffect, useState, useRef } from "react";

let position = {
  width: 600,
  height: 400,
  x: 0,
  y: 0,
};

const Panel = ({ elements }) => {
  // States
  const [engaged, setEngaed] = useState(0);
  const [newLine, setNewLine] = useState(null);
  const canvasRef = useRef();

  // For setting the position
  useEffect(() => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    position = { ...position, x: left, y: top };
  }, []);

  const handleMouseMove = (e) => {
    if (!engaged) return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    setNewLine((prev) => ({ ...prev, x2: x, y2: y }));
  };

  const handleMouseDown = (e) => {
    //Get the positon
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    console.log({ x, y });

    //For first touch
    if (!engaged) {
      setNewLine({ x1: x, y1: y, x2: x, y2: y });
      setEngaed(true);
    }

    //For second touch
    else {
      elements.push({ ...newLine, x2: x, y2: y });
      setEngaed(false);
      setNewLine(null);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="flex-1 debug w-full h-full dead-center bg-gray-300"
    >
      <div
        ref={canvasRef}
        className="canvas bg-white"
        style={position}
      >
        <svg {...position}>
          {elements.data.map((elm, i) => (
            <line key={i} {...elm} stroke="black" />
          ))}
          {newLine && <line {...newLine} stroke="black" />}
        </svg>
      </div>
    </div>
  );
};

export default Panel;
