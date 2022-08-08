import { CircleIcon } from "@/icons/Circle";
import { DeleteIcon } from "@/icons/Delete";
import { FreehandIcon } from "@/icons/Freehand";
import { GroupIcon } from "@/icons/Group";
import { LineIcon } from "@/icons/Line";
import { OptionsIcon } from "@/icons/Options";
import { PathIcon } from "@/icons/Path";
import { PolygonIcon } from "@/icons/Polygon";
import { RectangleIcon } from "@/icons/Rectangle";

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
    <div className="h-full w-1/5 shadow-2xl  max-h-[100%] overflow-y-scroll">
      {elements.data.map((elm, i) => (
        <div
          className={`group flex items-center gap-4 p-2 border-b hover:bg-gray-300 ${
            elm.id === selectedID && "bg-gray-200"
          }`}
          key={elm.id}
        >
          <div
            className="dead-center gap-2 flex-1"
            onClick={() => setSelectedID(elm.id)}
          >
            <span className="text-gray-400">{ICONS[elm?.type]}</span>
            <h1 className="cursor-pointer capitalize flex-1">
              {elm?.type?.toLowerCase()}
            </h1>
          </div>
          <div className="dead-center gap-2 hidden cursor-pointer group-hover:flex">
            <input
              type="checkbox"
              onInput={(e) =>
                elements.update(i, { ...elm, hidden: e.target.checked })
              }
              className="accent-gray-800 "
            />
            <span onClick={() => elements.remove(i)}>
              <DeleteIcon />
            </span>
            <span>
              <OptionsIcon />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leftbar;
