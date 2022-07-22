import { CircleRenderer } from "./circle";
import { LineRenderer } from "./line";

const Renderers = {
  CIRCLE: CircleRenderer,
  LINE: LineRenderer,
};

export const ShapeRenderer = ({ type, ...props }) => {
  const TypeRenderer = Renderers[type];
  return <TypeRenderer {...props} />;
};
