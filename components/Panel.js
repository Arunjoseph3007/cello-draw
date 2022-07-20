import PreviousMap from "postcss/lib/previous-map";
import { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";
const Panel = ({ elements }) => {
  const [engaged, setEngaed] = useState(0);
  const [newLine, setNewLine] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef();

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top });
  }, []);

  const dimensions = {
    width: 600,
    height: 400,
  };

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
      setEngaed(false);
      elements.push({ ...newLine, x2: x, y2: y });
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
        className="canvas bg-white overflow-hidden"
        style={dimensions}
      >
        <svg height={dimensions.height} width={dimensions.width}>
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
