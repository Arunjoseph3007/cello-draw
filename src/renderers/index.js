import { CircleRenderer } from "./circle";
import { LineRenderer } from "./line";
import { FreehandRenderer } from "./freehand";
import { PolygonRenderer } from "./polygon";

const Renderers = {
  CIRCLE: CircleRenderer,
  LINE: LineRenderer,
  FREEHAND: FreehandRenderer,
  POLYGON: PolygonRenderer,
};

export const ShapeRenderer = ({ type, ...props }) => {
  // Basic safety
  if (!type) {
    console.log({ type, ...props });
    return null;
  }

  const TypeRenderer = Renderers[type];
  return <TypeRenderer {...props} />;
};
