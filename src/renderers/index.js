import { CircleRenderer } from "./circle";
import { LineRenderer } from "./line";
import { FreehandRenderer } from "./freehand";
import { PolygonRenderer } from "./polygon";
import { RectangleRenderer } from "./rectangle";
import { PathRenderer } from "./path";
import { GroupRenderer } from "./group";

import Portal from "@/components/Portal";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedIDAtom } from "@/context/selectedID";
import { selectedShapeAtom } from "@/context/selectedShape";
import { elementsAtom } from "@/context/elements";
import { useArray } from "@/hooks/useArray";
import { statusAtom } from "@/context/status";
import { CrosshairIcon } from "@/icons/Crosshair";
import { UndoIcon } from "@/icons/Undo";

const NONE = 0,
  FULL = "100%",
  HALF = "50%",
  DEFAULT_BOX = {
    width: 10,
    height: 10,
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

const Renderers = {
  CIRCLE: CircleRenderer,
  LINE: LineRenderer,
  FREEHAND: FreehandRenderer,
  POLYGON: PolygonRenderer,
  RECTANGLE: RectangleRenderer,
  PATH: PathRenderer,
  GROUP: GroupRenderer,
};

export const ShapeRenderer = ({ type, ...props }) => {
  const [selectedID, setSelectedID] = useRecoilState(selectedIDAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const [status, setStatus] = useRecoilState(statusAtom);
  const elements = useArray();
  const [anchor, setAnchor] = useState(null);

  // Basic safety
  if (!type) return;

  const shapeRef = useRef();

  let portalStyles = shapeRef?.current?.getBoundingClientRect() || DEFAULT_BOX;

  const handleDragStart = (e, dir) => {
    setAnchor({
      x: e.clientX,
      y: e.clientY,
      shape: selectedShape,
      portal: portalStyles,
    });
    setStatus((prev) => ({ ...prev, isDragging: true }));
  };

  const handleDragEnd = (e, dir = "", isDrag = false) => {
    e.stopPropagation();

    const scaleY = anchor.shape.scaleY ?? 1;
    const scaleX = anchor.shape.scaleX ?? 1;
    const transformX = anchor.shape.transformX ?? 0;
    const transformY = anchor.shape.transformY ?? 0;
    const actualHeight = anchor.portal.height / scaleY;
    const actualWidth = anchor.portal.width / scaleX;
    const increaseHeight = e.clientY - anchor.y;
    const increaseWidth = e.clientX - anchor.x;
    const newHeight = anchor.portal.height + increaseHeight;
    const newWidth = anchor.portal.width + increaseWidth;

    let options = {};
    if (dir.includes("x") && newWidth / actualWidth > 0) {
      options.scaleX = newWidth / actualWidth;
      options.transformX = transformX + increaseWidth / 2;
    }
    if (dir.includes("y") && newHeight / actualHeight > 0) {
      options.scaleY = newHeight / actualHeight;
      options.transformY = transformY + increaseHeight / 2;
    }

    setSelectedShape((prev) => ({ ...prev, ...options }));

    if (isDrag) return;

    setAnchor(null);

    elements.updateById(selectedID, { ...selectedShape, ...options });

    setStatus((prev) => ({ ...prev, isDragging: false }));
  };

  const handleReposition = (e, isDrag = false) => {
    const xDiff = e.clientX - anchor.x;
    const yDiff = e.clientY - anchor.y;

    const transformX = anchor.shape.transformX ?? 0;
    const transformY = anchor.shape.transformY ?? 0;

    const rePositionedShape = {
      ...selectedShape,
      transformX: transformX + xDiff,
      transformY: transformY + yDiff,
    };

    setSelectedShape((prev) => ({ ...prev, ...rePositionedShape }));

    if (isDrag) return;

    setAnchor(null);

    elements.updateById(selectedID, rePositionedShape);

    setStatus((prev) => ({ ...prev, isDragging: false }));
  };

  const handleRotation = (e, isDrag = false) => {
    const xDiff = e.clientX - anchor.x;
    const yDiff = e.clientY - anchor.y;

    const rotation = anchor.shape.rotation ?? 0;

    const rotatedShape = {
      ...selectedShape,
      rotation: rotation + (Math.atan(yDiff / xDiff) * 180) / Math.PI,
    };

    setSelectedShape((prev) => ({ ...prev, ...rotatedShape }));

    if (isDrag) return;

    setAnchor(null);

    elements.updateById(selectedID, rotatedShape);

    setStatus((prev) => ({ ...prev, isDragging: false }));
  };

  const transform = `
  translate(${props.transformX ?? 0} ${props.transformY ?? 0}) 
  scale(${props.scaleX ?? 1} ${props.scaleY ?? 1}) 
  rotate(${props.rotation ?? 0})  
  skewX(${props.skewX ?? 0}) 
  skewY(${props.skewY ?? 0})`;

  const TypeRenderer = Renderers[type];

  return (
    <>
      <TypeRenderer
        shapeRef={shapeRef}
        draggable
        {...props}
        transform={transform}
        className="canvas-element"
        fill={props.fill || "transparent"}
        stroke={props.stroke || "#000000"}
        strokeWidth={props.strokeWidth || 2}
      />
      {(selectedID === props.id || props.highlighted) && (
        <Portal selector="#portal">
          {/* //@ Selection box */}
          <div
            className="absolute pointer-events-auto bg-transparent border-[3px] border-dashed border-blue-400"
            style={{
              height: portalStyles.height,
              width: portalStyles.width,
              top: portalStyles.top,
              left: portalStyles.left,
            }}
          >
            {/* //@ Four corner boxes */}
            <div
              className="small-black-box cursor-nw-resize"
              style={{ top: NONE, left: NONE }}
            />
            <div
              className="small-black-box cursor-sw-resize"
              style={{ top: FULL, left: NONE }}
            />
            <div
              className="small-black-box cursor-ne-resize"
              style={{ top: NONE, left: FULL }}
            />
            <div
              className="small-black-box cursor-se-resize"
              style={{ top: FULL, left: FULL }}
              draggable
              onDragStart={handleDragStart}
              onDrag={(e) => handleDragEnd(e, "xy", true)}
              onDragEnd={(e) => handleDragEnd(e, "xy")}
            />

            {/* //@ Position Transform */}
            <div
              draggable
              onDragStart={handleDragStart}
              onDrag={(e) => handleReposition(e, true)}
              onDragEnd={handleReposition}
              className="absolute left-1/2 -translate-x-5 -translate-y-8 cursor-move"
              children={<CrosshairIcon />}
            />

            {/* //@ Rotation Transform */}
            <div
              draggable
              onDragStart={handleDragStart}
              onDrag={(e) => handleRotation(e, true)}
              onDragEnd={handleRotation}
              className="absolute left-1/2 translate-x-5 -translate-y-8 cursor-move"
              children={<UndoIcon />}
            />

            {/* //@ Height resize */}
            <div
              className="absolute bg-blue-400 text-white text-xs px-2 -translate-x-1/2 -translate-y-1/2 cursor-n-resize"
              style={{
                top: FULL,
                left: HALF,
                transform: "translate(-50%, -50%) rotateZ(0deg)",
              }}
              draggable
              onDragStart={handleDragStart}
              onDrag={(e) => handleDragEnd(e, "y", true)}
              onDragEnd={(e) => handleDragEnd(e, "y")}
            >
              {roundOff(portalStyles.height)}
            </div>

            {/* // @ Widt resize */}
            <div
              className="absolute bg-blue-400  text-white text-xs px-2 cursor-w-resize"
              style={{
                top: HALF,
                left: FULL,
                transform: "translate(-50%, -50%) rotateZ(90deg) ",
              }}
              draggable
              onDragStart={handleDragStart}
              onDrag={(e) => handleDragEnd(e, "x", true)}
              onDragEnd={(e) => handleDragEnd(e, "x")}
            >
              {roundOff(portalStyles.width)}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

const roundOff = (num) => Math.floor(num * 1000) / 1000;
