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

const NONE = 0,
  FULL = "100%",
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
        {...props}
        transform={transform}
        className="canvas-element"
        fill={props.fill || "#ffff00"}
        stroke={props.stroke || "#23d997"}
        strokeWidth={props.strokeWidth || 2}
      />
      {selectedID === props.id && (
        <Portal selector="#portal">
          <div
            onClick={(e) => {
              e.stopPropagation();
              console.log("hey");
            }}
            className="absolute bg-transparent cursor-pointer border-[3px] border-dashed border-blue-400"
            style={{
              height: portalStyles.height,
              width: portalStyles.width,
              top: portalStyles.top,
              left: portalStyles.left,
              bottom: portalStyles.bottom,
              right: portalStyles.right,
            }}
          >
            <div
              className="small-black-box"
              style={{ top: NONE, left: NONE }}
            ></div>
            <div
              className="small-black-box"
              style={{ top: FULL, left: NONE }}
            ></div>
            <div
              className="small-black-box"
              style={{ top: NONE, left: FULL }}
            ></div>
            <div
              className="small-black-box"
              style={{ top: FULL, left: FULL }}
            ></div>
          </div>
        </Portal>
      )}
    </>
  );
};
