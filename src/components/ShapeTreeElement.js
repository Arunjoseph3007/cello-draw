import { DeleteIcon } from "@/icons/Delete";
import { OptionsIcon } from "@/icons/Options";
import { CircleIcon } from "@/icons/Circle";
import { FreehandIcon } from "@/icons/Freehand";
import { GroupIcon } from "@/icons/Group";
import { LineIcon } from "@/icons/Line";
import { PathIcon } from "@/icons/Path";
import { PolygonIcon } from "@/icons/Polygon";
import { RectangleIcon } from "@/icons/Rectangle";
import { useState } from "react";
import { CollapseIcon } from "@/icons/Collapse";

const ICONS = {
  CIRCLE: <CircleIcon />,
  LINE: <LineIcon />,
  POLYGON: <PolygonIcon />,
  FREEHAND: <FreehandIcon />,
  RECTANGLE: <RectangleIcon />,
  PATH: <PathIcon />,
  GROUP: <GroupIcon />,
};

export default function ShapeTreeElement({
  elm,
  elements,
  selectedID,
  setSelectedID,
  childDepth = 0,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const isGroup = elm?.type === "GROUP";
  return (
    <div>
      <div
        className={`group flex items-center gap-4 p-2 border border-r-0 hover:bg-gray-300 ${
          elm.id === selectedID && "bg-gray-200"
        } `}
        style={{ marginLeft: childDepth * 35 }}
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
              elements.updateById(elm.id, {
                ...elm,
                hidden: e.target.checked,
              })
            }
            className="accent-gray-800 "
          />
          <span onClick={() => elements.removeById(elm.id)}>
            <DeleteIcon />
          </span>
          <span>
            <OptionsIcon />
          </span>
          {isGroup && (
            <span
              className={`transition duration-700 ${isOpen && "rotate-180"}`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <CollapseIcon />
            </span>
          )}
        </div>
      </div>
      <div
        className={`transition-all duration-700 overflow-y-hidden ${
          !isOpen
            ? "max-h-0 py-0 pointer-events-none"
            : "max-h-screen pointer-events-auto"
        }`}
      >
        {isGroup &&
          elm?.childShapes.map((a) => (
            <ShapeTreeElement
              key={a.id}
              elm={a}
              selectedID={selectedID}
              setSelectedID={selectedID}
              elements={elements}
              childDepth={childDepth + 1}
            />
          ))}
      </div>
    </div>
  );
}
