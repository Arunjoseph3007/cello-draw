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

  const TypeRenderer = Renderers[type];
  return <TypeRenderer {...props} />;
};
