import { CircleRenderer } from "./circle";
import { LineRenderer } from "./line";
import { FreehandRenderer } from "./freehand";
import { PolygonRenderer } from "./polygon";
import { RectangleRenderer } from "./rectangle";

const Renderers = {
  CIRCLE: CircleRenderer,
  LINE: LineRenderer,
  FREEHAND: FreehandRenderer,
  POLYGON: PolygonRenderer,
  RECTANGLE: RectangleRenderer,
};

export const ShapeRenderer = ({ type, ...props }) => {
  // Basic safety
  if (!type) return;
  const transform = `translate(${0} ${0}) scale(${props.scale || 1}) rotate(${
    props.rotation || 0
  }) `;

  const TypeRenderer = Renderers[type];
  return (
    <TypeRenderer
      {...props}
      transform={transform}
      className="canvas-element"
      fill={props.fill || "#ff0000"}
      stroke={props.stroke || "#23d997"}
    />
  );
};
