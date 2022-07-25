//contextx
import { controllerAtom } from "@/context/controller";
import { newShapeAtom } from "@/context/newShape";
// Libs
import { useEffect, useRef, useDeferredValue, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
//Renderer
import { ShapeRenderer } from "@/renderers/index";
import { useHotkeys } from "@/hooks/useHotkeys";
import { flushSync } from "react-dom";

let position = {
  width: 700,
  height: 500,
  x: 0,
  y: 0,
};

const Panel = ({ elements, mode }) => {
  // States
  const controller = useRecoilValue(controllerAtom);
  const [newShape, setNewShape] = useState(false);
  const canvasRef = useRef();
  const deferedNewShape = useDeferredValue(newShape);

  // For setting the position
  useEffect(() => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    position = { ...position, x: left, y: top };
  }, []);

  //When the mode is changed reset the new shape
  useEffect(() => setNewShape(null), [mode]);

  // To set the newShape when ESC is pressed
  useHotkeys("Escape", (e) => escapeShape());

  const escapeShape = () => {
    let temp;
    flushSync(() => {
      setNewShape((prev) => {
        temp = prev;
        return null;
      });
    });
    elements.push({ ...temp, status: -1 });
  };

  // To update the position on mouse movement
  const handleMouseMove = (e) => {
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    controller.onMouseMove({ e, position, newShape, setNewShape, elements });
  };

  //Handle mouse clicks
  const handleMouseDown = (e) => {
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    controller.onMouseDown({ e, position, newShape, setNewShape, elements });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="flex-1 w-full h-full dead-center bg-gray-300"
    >
      <div ref={canvasRef} className="canvas bg-white" style={position}>
        <svg {...position}>
          {elements.data.map((elm, i) => (
            <ShapeRenderer key={i} {...elm} />
          ))}
          {newShape && <ShapeRenderer {...newShape} />}
        </svg>
      </div>
    </div>
  );
};

export default Panel;
