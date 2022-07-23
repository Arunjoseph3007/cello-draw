import { CircleIcon } from "@/icons/Circle";
import { CurveIcon } from "@/icons/Curve";
import { LineIcon } from "@/icons/Line";
import { PolygonIcon } from "@/icons/Polygon";
import { FreehandIcon } from "@/icons/Freehand";

const Topbar = ({ mode, setMode }) => {
  const buttons = [
    { title: "LINE", icon:  <LineIcon /> },
    { title: "CIRCLE", icon: <CircleIcon /> },
    { title: "FREEHAND", icon: <FreehandIcon /> },
    { title: "POLYGON", icon: <PolygonIcon /> },
  ];

  return (
    <div className="flex justify-between items-center px-4 bg-black text-white">
      <div className="flex gap-5">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => setMode(btn.title)}
            className={`p-3 hover:bg-blue-400 ${
              mode === btn.title && "bg-blue-200"
            }`}
          >
            {btn.icon}
          </button>
        ))}
      </div>
      <h1>{mode}</h1>
      <div className="flex gap-3">
        <button className="p-3 hover:bg-blue-400">
          <h1>Zoom</h1>
        </button>
        <button className="p-3 hover:bg-blue-400">
          <h1>Pan</h1>
        </button>
        <button className="p-3 hover:bg-blue-400">
          <h1>Some</h1>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
