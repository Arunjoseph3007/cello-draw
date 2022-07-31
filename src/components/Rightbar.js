const Rightbar = ({ selectedShape, setSelectedShape }) => {
  const handleChange = (e) => {
    setSelectedShape((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          name="scale"
          type="range"
          min={0}
          max={20}
          value={selectedShape.scale || 1}
          onChange={handleChange}
          step={0.1}
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          ROTATION
        </h3>
        <input
          className="range"
          name="rotation"
          type="range"
          min={-180}
          max={180}
          step={1}
          value={selectedShape.rotation || 0}
          onChange={handleChange}
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          SKEW X
        </h3>
        <input
          className="range"
          name="skewX"
          type="range"
          min={-180}
          max={180}
          step={1}
          value={selectedShape.skewX || 0}
          onChange={handleChange}
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          SKEW Y
        </h3>
        <input
          className="range"
          name="skewY"
          type="range"
          min={-180}
          max={180}
          step={1}
          value={selectedShape.skewY || 0}
          onChange={handleChange}
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          FILL
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            name="fill"
            value={selectedShape.fill || "#000000"}
            onChange={handleChange}
          />
          <p>{selectedShape.fill || "#23d997"}</p>
        </div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          STROKE
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            name="stroke"
            value={selectedShape.stroke || "#000000"}
            onChange={handleChange}
          />
          <p>{selectedShape.stroke || "#23d997"}</p>
        </div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          STROKE WIDTH
        </h3>
        <input
          className="range"
          name="strokeWidth"
          type="range"
          min={0}
          max={100}
          step={2}
          value={selectedShape.strokeWidth || 2}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Rightbar;
