import { CircleIcon } from "../../public/Icons/Circle";
import { CurveIcon } from "../../public/Icons/Curve";
import { LineIcon } from "../../public/Icons/Line";
import { PolygonIcon } from "../../public/Icons/Polygon";

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
