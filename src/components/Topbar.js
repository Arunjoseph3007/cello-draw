import { CircleIcon } from "@/icons/Circle";
import { CurveIcon } from "@/icons/Curve";
import { LineIcon } from "@/icons/Line";
import { PolygonIcon } from "@/icons/Polygon";
import { FreehandIcon } from "@/icons/Freehand";
import { UndoIcon } from "@/icons/Undo";
import { RedoIcon } from "@/icons/Redo";
import { CloseIcon } from "@/icons/Close";
import { RectangleIcon } from "@/icons/Rectangle";

const Topbar = ({ mode, setMode, elements }) => {
  const buttons = [
    { title: "LINE", icon: <LineIcon /> },
    { title: "CIRCLE", icon: <CircleIcon /> },
    { title: "FREEHAND", icon: <FreehandIcon /> },
    { title: "POLYGON", icon: <PolygonIcon /> },
    { title: "RECTANGLE", icon: <RectangleIcon /> },
  ];

  return (
    <div className="flex justify-between items-center shadow-md px-4 bg-black text-white">
      <div className="flex gap-5">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => setMode(btn.title)}
            className={`p-3 hover:bg-blue-400 transition ${
              mode === btn.title && "text-black bg-blue-400"
            }`}
          >
            {btn.icon}
          </button>
        ))}
      </div>
      <h1>{mode}</h1>
      <div className="flex gap-3">
        <button onClick={elements.clear} className="p-3 hover:bg-blue-400">
          <CloseIcon />
        </button>
        <button onClick={elements.undo} className="p-3 hover:bg-blue-400">
          <UndoIcon />
        </button>
        <button onClick={elements.redo} className="p-3 hover:bg-blue-400">
          <RedoIcon />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
