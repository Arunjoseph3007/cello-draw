import { CircleRenderer } from "./circle";
import { LineRenderer } from "./line";
import { FreehandRenderer } from "./freehand";
import { PolygonRenderer } from "./polygon";
import { RectangleRenderer } from "./rectangle";
import { PathRenderer } from "./path";
import Portal from "@/components/Portal";
import { useEffect, useRef, useState } from "react";

const NONE = 0,
  FULL = "100%";

const Renderers = {
  CIRCLE: CircleRenderer,
  LINE: LineRenderer,
  FREEHAND: FreehandRenderer,
  POLYGON: PolygonRenderer,
  RECTANGLE: RectangleRenderer,
  PATH: PathRenderer,
};

export const ShapeRenderer = ({ type, ...props }) => {
  // Basic safety
  if (!type) return;

  const shapeRef = useRef();
  const [portalStyles, setPortalStyles] = useState({
    top: 200,
    left: 100,
    height: 100,
    width: 200,
  });

  useEffect(() => {
    const newS = shapeRef.current.getBoundingClientRect();
    setPortalStyles(newS);
  }, [shapeRef]);

  const transform = `
  translate(${0} ${0}) 
  scale(${props.scale || 1}) 
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
      <Portal selector="#portal">
        <div
          className="absolute bg-transparent border-[3px] border-dashed border-blue-400"
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
    </>
  );
};
