import { CircleIcon } from "@/icons/Circle";
import { CurveIcon } from "@/icons/Curve";
import { LineIcon } from "@/icons/Line";
import { PolygonIcon } from "@/icons/Polygon";

const Topbar = ({ mode, setMode }) => {
  return (
    <div className="flex justify-between items-center px-4 bg-black text-white">
      <div className="flex gap-5">
        <button
          onClick={() => setMode("LINE")}
          className={`p-3 hover:bg-blue-400 ${
            mode === "LINE" && "bg-blue-200"
          }`}
        >
          <LineIcon />
        </button>
        <button
          onClick={() => setMode("CIRCLE")}
          className={`p-3 hover:bg-blue-400 ${
            mode === "CIRCLE" && "bg-blue-200"
          }`}
        >
          <CircleIcon />
        </button>
        <button className="p-3 hover:bg-blue-400">
          <PolygonIcon />
        </button>
        <button className="p-3 hover:bg-blue-400">
          <CurveIcon />
        </button>
      </div>
      <h1>mode : {mode}</h1>
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
