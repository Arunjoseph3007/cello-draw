import { CircleIcon } from "@/icons/Circle";
import { FreehandIcon } from "@/icons/Freehand";
import { LineIcon } from "@/icons/Line";
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
};

const Leftbar = ({ elements, selectedID, setSelectedID }) => {
  return (
    <div className="h-full w-1/5 shadow-2xl">
      {elements.data.map((elm) => (
        <div
          onClick={() => setSelectedID(elm.id)}
          className={`flex items-center gap-5 p-2 border-b hover:bg-gray-300 ${
            elm.id === selectedID && "bg-gray-200"
          }`}
          key={elm.id}
        >
          <span className="text-gray-400">{ICONS[elm?.type]}</span>
          <h1 className="cursor-pointer capitalize">
            {elm?.type?.toLowerCase()}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Leftbar;
