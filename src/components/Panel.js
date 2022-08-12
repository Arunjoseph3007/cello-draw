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
import { statusAtom } from "@/context/status";

const Panel = ({ elements, mode }) => {
  /// States
  const controller = useRecoilValue(controllerAtom);
  const [newShape, setNewShape] = useRecoilState(newShapeAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const [status, setStatus] = useRecoilState(statusAtom);
  const [position, setPosition] = useState({
    width: 700,
    height: 500,
    x: 0,
    y: 0,
    zoom: 1,
    panX: 0,
    panY: 0,
    engaged: false,
  });

  const canvasRef = useRef();

  const handleResize = () => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    setPosition({ ...position, x: left, y: top });
  };

  const escapeShape = () => {
    setSelectedShape(null);

    if (!newShape) return;

    elements.push({ ...newShape, status: -1 });
    setNewShape(null);
  };

  // For setting the position
  useEffect(() => {
    handleResize();
  }, []);

  // For checking if it is a click or a drag
  useEffect(() => {
    if (status.isDragging) {
      setNewShape(null);
    }
  }, [status]);

  //When the mode is changed reset the new shape
  useEffect(() => setNewShape(null), [mode]);

  // To set the newShape when ESC is pressed
  useHotkeys("Escape", (e) => escapeShape());

  // To match any resizing
  useEventListener("resize", handleResize);

  useEventListener("mousewheel", (e) => {
    if (mode !== "MOVE") return;

    if (e.deltaY > 0 && position.zoom < 10) {
      setPosition((prev) => ({ ...prev, zoom: prev.zoom + 0.05 }));
    } else if (e.deltaY < 0 && position.zoom > 0.1) {
      setPosition((prev) => ({ ...prev, zoom: prev.zoom - 0.05 }));
    }
  });

  // To update the position on mouse movement
  const handleMouseMove = (e) => {
    if (status.isDragging) return;

    if (mode === "MOVE") {
      controller.onMouseMove({ e, position, setPosition });
    } else {
      const adjustedPosition = {
        x: (position.x + position.panX) * position.zoom,
        y: (position.y + position.panY) * position.zoom,
      };
      controller.onMouseMove({
        e,
        position: adjustedPosition,
        newShape,
        setNewShape,
        elements,
      });
    }
  };

  //Handle mouse clicks
  const handleMouseDown = (e) => {
    if (status.isDragging) return;

    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0)
      return;

    if (mode === "MOVE") {
      controller.onMouseDown({ e, position, setPosition });
    } else {
      const adjustedPosition = {
        x: (position.x + position.panX) * position.zoom,
        y: (position.y + position.panY) * position.zoom,
      };
      controller.onMouseDown({
        e,
        position: adjustedPosition,
        newShape,
        setNewShape,
        elements,
      });
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="flex-1 w-full h-full dead-center relative bg-gray-300"
    >
      <div
        ref={canvasRef}
        className={`canvas absolute top-1/2 left-1/2 bg-white ${
          mode === "MOVE"
            ? position.engaged
              ? "cursor-move"
              : "cursor-grabbing"
            : "cursor-crosshair"
        }`}
        style={{
          height: position.height,
          width: position.width,
          transform: `
          translate(
            ${position.panX - position.width / 2}px, 
            ${position.panY - position.height / 2}px
          )
          scaleX(${position.zoom}) 
          scaleY(${position.zoom}) 
          `,
        }}
      >
        <svg
          x={position.x}
          y={position.y}
          height={position.height}
          width={position.width}
        >
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
