//contextx
import { controllerAtom } from "@/context/controller";
import { newShapeAtom } from "@/context/newShape";
// Libs
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
//Renderer
import { ShapeRenderer } from "@/renderers/index";

let position = {
  width: 600,
  height: 400,
  x: 0,
  y: 0,
};

const Panel = ({ elements, mode }) => {
  // States
  const controller = useRecoilValue(controllerAtom);
  const [newShape, setNewShape] = useRecoilState(newShapeAtom);
  const canvasRef = useRef();

  // For setting the position
  useEffect(() => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    position = { ...position, x: left, y: top };
  }, []);

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
          {newShape && <line {...newShape} stroke="black" />}
        </svg>
      </div>
    </div>
  );
};

export default Panel;
