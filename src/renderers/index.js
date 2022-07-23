import { CircleRenderer } from "./circle";
import { LineRenderer } from "./line";
import { FreehandRenderer } from "./freehand";
import { PolygonRenderer } from "./polygon";

const Renderers = {
  CIRCLE: CircleRenderer,
  LINE: LineRenderer,
  FREEHAND: FreehandRenderer,
  POLYGON:PolygonRenderer
};

export const ShapeRenderer = ({ type, ...props }) => {
  const TypeRenderer = Renderers[type];
  return <TypeRenderer {...props} />;
};
