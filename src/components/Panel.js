//contextx
import { controllerAtom } from "@/context/controller";
import { newShapeAtom } from "@/context/newShape";
import { selectedShapeAtom } from "@/context/selectedShape";
// Libs
import { useEffect, useRef, useDeferredValue, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
//Renderer
import { ShapeRenderer } from "@/renderers/index";
import { useHotkeys } from "@/hooks/useHotkeys";
import StylesPicker from "./StylePicker";
import { useEventListener } from "@/hooks/useEventListener";

const Panel = ({ elements, mode }) => {
  // States
  const controller = useRecoilValue(controllerAtom);
  const [newShape, setNewShape] = useRecoilState(newShapeAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const [position, setPosition] = useState({
    width: 700,
    height: 500,
    x: 0,
    y: 0,
  });
  const canvasRef = useRef();

  const handleResize = () => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    setPosition({ ...position, x: left, y: top });
  };

  const escapeShape = () => {
    if (!newShape) return;

    elements.push({ ...newShape, status: -1 });
    setNewShape(null);
  };

  // For setting the position
  useEffect(() => {
    handleResize();
  }, []);

  //When the mode is changed reset the new shape
  useEffect(() => setNewShape(null), [mode]);

  // To set the newShape when ESC is pressed
  useHotkeys("Escape", (e) => escapeShape());

  // To match any resizing
  useEventListener("resize", handleResize);

  // To update the position on mouse movement
  const handleMouseMove = (e) => {
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    controller.onMouseMove({ e, position, newShape, setNewShape, elements });
  };

  //Handle mouse clicks
  const handleMouseDown = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0)
      return;

    const [x, y] = [e.clientX - position.x, e.clientY - position.y];
    controller.onMouseDown({ e, position, newShape, setNewShape, elements });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="flex-1 w-full h-full dead-center relative bg-gray-300"
    >
      <div
        ref={canvasRef}
        className="canvas bg-white cursor-crosshair"
        style={position}
      >
        <svg {...position}>
          {elements
            .gatherIntoGroups(undefined)
            .filter((a) => !a?.hidden)
            .filter((a) => a.id !== selectedShape?.id)
            .map((elm, i) => (
              <ShapeRenderer key={elm.id} {...elm} />
            ))}
          {newShape && <ShapeRenderer {...newShape} />}
          {selectedShape && (
            <ShapeRenderer
              dataid="cello-draw-selected-shape"
              {...selectedShape}
            />
          )}
        </svg>
      </div>
      <StylesPicker newShape={newShape} mode={mode} setNewShape={setNewShape} />
    </div>
  );
};

export default Panel;
