import { CircleIcon } from "@/icons/Circle";
import { CurveIcon } from "@/icons/Curve";
import { LineIcon } from "@/icons/Line";
import { PolygonIcon } from "@/icons/Polygon";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-4 bg-black text-white">
      <div className="flex gap-5">
        <button className="p-3 hover:bg-blue-400">
          <LineIcon />
        </button>
        <button className="p-3 hover:bg-blue-400">
          <CircleIcon />
        </button>
        <button className="p-3 hover:bg-blue-400">
          <PolygonIcon />
        </button>
        <button className="p-3 hover:bg-blue-400">
          <CurveIcon />
        </button>
      </div>
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
