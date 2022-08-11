import { CircleIcon } from "@/icons/Circle";
import { DeleteIcon } from "@/icons/Delete";
import { FreehandIcon } from "@/icons/Freehand";
import { GroupIcon } from "@/icons/Group";
import { LineIcon } from "@/icons/Line";
import { OptionsIcon } from "@/icons/Options";
import { PathIcon } from "@/icons/Path";
import { PolygonIcon } from "@/icons/Polygon";
import { RectangleIcon } from "@/icons/Rectangle";
import ShapeTreeElement from "./ShapeTreeElement";

const ICONS = {
  CIRCLE: <CircleIcon />,
  LINE: <LineIcon />,
  POLYGON: <PolygonIcon />,
  FREEHAND: <FreehandIcon />,
  RECTANGLE: <RectangleIcon />,
  PATH: <PathIcon />,
  GROUP: <GroupIcon />,
};

const Leftbar = ({ elements, selectedID, setSelectedID }) => {
  return (
    <div className="h-full w-1/5 z-20 shadow-2xl  max-h-[100%] overflow-y-scroll">
      {elements.gatherIntoGroups().map((elm, i) => (
        <ShapeTreeElement
          key={elm.id}
          elm={elm}
          elements={elements}
          selectedID={selectedID}
          setSelectedID={setSelectedID}
        />
      ))}
    </div>
  );
};

export default Leftbar;
