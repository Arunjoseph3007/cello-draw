//contextx
import { controllerAtom } from "@/context/controller";
import { newShapeAtom } from "@/context/newShape";
// Libs
import { useEffect, useRef, useDeferredValue } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
//Renderer
import { ShapeRenderer } from "@/renderers/index";
import { useHotkeys } from "@/hooks/useHotkeys";

let position = {
  width: 800,
  height: 600,
  x: 0,
  y: 0,
};

const Panel = ({ elements, mode }) => {
  // States
  const controller = useRecoilValue(controllerAtom);
  const [newShape, setNewShape] = useRecoilState(newShapeAtom);
  const canvasRef = useRef();
  const deferedNewShape = useDeferredValue(newShape);

  // For setting the position
  useEffect(() => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    position = { ...position, x: left, y: top };
  }, []);

  //When the mode is changed reset the new shape
  useEffect(() => setNewShape(null), [mode]);

  const handleMouseMove = (e) => {
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    controller.onMouseMove({ e, position, newShape, setNewShape, elements });
  };

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
          {deferedNewShape && <ShapeRenderer {...deferedNewShape} />}
        </svg>
      </div>
    </div>
  );
};

export default Panel;
