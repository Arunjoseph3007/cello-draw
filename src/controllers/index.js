import { FreehandControls } from "@/renderers/freehand";
import { RectangleControls } from "@/renderers/rectangle";

const DEFAULT = () => <></>;

export const EditControllers = {
  FREEHAND: FreehandControls,
  RECTANGLE: RectangleControls,
  CIRCLE: DEFAULT,
  LINE: DEFAULT,
  POLYGON: DEFAULT,
  PATH: DEFAULT,
  GROUP: DEFAULT,
};
