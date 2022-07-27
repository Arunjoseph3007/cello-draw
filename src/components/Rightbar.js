const Rightbar = ({ selectedShape, setSelectedShape }) => {
  if (!selectedShape)
    return (
      <div className="h-full w-1/5 dead-center">
        <h1 className="text-xl text-slate-400 ">No Shape selected</h1>
      </div>
    );

  return (
    <div className="h-full w-1/5 flex flex-col gap-2">
      <h1 className="text-2xl text-slate-600 p-2 border-b font-semibold">
        {selectedShape?.type}
      </h1>
      <div className="flex flex-col px-2 gap-3">
        <h1>Transforms</h1>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          SCALE
        </h3>
        <input
          className="range"
          title="Scale"
          type="range"
          min={0}
          max={20}
          value={selectedShape.scale || 1}
          onChange={(e) =>
            setSelectedShape({ ...selectedShape, scale: e.target.value })
          }
          step={0.1}
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          ROTATION
        </h3>
        <input
          className="range"
          title="Rotation"
          type="range"
          min={-180}
          max={180}
          step={1}
          value={selectedShape.rotation}
          onChange={(e) =>
            setSelectedShape({ ...selectedShape, rotation: e.target.value })
          }
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          FILL
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={selectedShape.fill || "#000000"}
            onChange={(e) =>
              setSelectedShape({ ...selectedShape, fill: e.target.value })
            }
          />
          <p>{selectedShape.fill || "#23d997"}</p>
        </div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          STROKE
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={selectedShape.stroke || "#000000"}
            onChange={(e) =>
              setSelectedShape({ ...selectedShape, stroke: e.target.value })
            }
          />
          <p>{selectedShape.stroke || "#23d997"}</p>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
