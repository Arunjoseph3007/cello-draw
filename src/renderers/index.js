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
  const [engaged, setEngaged] = useState(false);
  const [anchor, setAnchor] = useState(null);

  // Basic safety
  if (!type) return;

  const shapeRef = useRef();

  let portalStyles = shapeRef?.current?.getBoundingClientRect() || DEFAULT_BOX;

  const transform = `
  translate(${0} ${0}) 
  scale(${props.scaleX || 1} ${props.scaleY || 1}) 
  rotate(${props.rotation || 0})  
  skewX(${props.skewX || 0}) 
  skewY(${props.skewY || 0})`;

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
          <div
            className="absolute pointer-events-auto bg-transparent border-[3px] border-dashed border-blue-400"
            style={{
              height: portalStyles.height,
              width: portalStyles.width,
              top: portalStyles.top,
              left: portalStyles.left,
            }}
          >
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
            />
            <div
              className="absolute bg-blue-400 text-white text-xs px-2 -translate-x-1/2 -translate-y-1/2 cursor-n-resize"
              style={{
                top: FULL,
                left: HALF,
                transform: "translate(-50%, -50%) rotateZ(0turn)",
              }}
              draggable
              onDragStart={(e) => {
                e.stopPropagation();

                setAnchor({ x: e.clientX, y: e.clientY });
              }}
              onDragEnd={(e) => {
                e.stopPropagation();

                const scaleY = selectedShape.scaleY || 1;
                const actualHeight = portalStyles.height / scaleY / 2;
                const increase = e.clientY - anchor.y;
                const newHeight = portalStyles.height / 2 + increase;

                setAnchor(null);

                if (newHeight / actualHeight > 0) {
                  setSelectedShape((prev) => ({
                    ...prev,
                    scaleY: newHeight / actualHeight,
                  }));
                }
              }}
            >
              {roundOff(portalStyles.height)}
            </div>
            <div
              className="absolute bg-blue-400  text-white text-xs px-2 cursor-w-resize"
              style={{
                top: HALF,
                left: FULL,
                transform: "translate(-50%, -50%) rotateZ(90deg) ",
              }}
              draggable
              onDragStart={(e) => {
                e.stopPropagation();

                setAnchor({ x: e.clientX, y: e.clientY });
              }}
              onDragEnd={(e) => {
                e.stopPropagation();

                const scaleX = selectedShape.scaleX || 1;
                const actualWidth = portalStyles.width / scaleX / 2;
                const increase = e.clientX - anchor.x;
                const newWidth = portalStyles.width / 2 + increase;

                setAnchor(null);

                if (newWidth / actualWidth > 0) {
                  setSelectedShape((prev) => ({
                    ...prev,
                    scaleX: newWidth / actualWidth,
                  }));
                }
              }}
            >
              {roundOff(portalStyles.width)}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

const roundOff = (num) => Math.floor(num * 100) / 100;
