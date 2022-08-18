import ExpandableBox from "./ExpandableBox";
import ExportBox from "./ExportBox";
import { EditControllers } from "../controllers";

const Rightbar = ({
  selectedShape,
  setSelectedShape,
  updateWithSelecctedShape,
}) => {
  const handleChange = (e) => {
    setSelectedShape((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!selectedShape)
    return (
      <div className="h-full w-1/5 z-20 bg-white shadow-2xl dead-center">
        <h1 className="text-xl text-slate-400 ">No Shape selected</h1>
      </div>
    );

  const Editor = EditControllers[selectedShape.type];

  return (
    <div className="h-full w-1/5 z-20 flex flex-col bg-white gap-0 max-h-[100%] shadow-2xl overflow-y-scroll">
      <h1 className="text-2xl text-slate-600 p-2 border-b font-semibold">
        {selectedShape?.type}
      </h1>

      {/*//?  Transforms */}
      <ExpandableBox title={"Transform"}>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          SCALE X
        </h3>
        <input
          className="range"
          name="scaleX"
          type="range"
          min={0}
          max={20}
          value={selectedShape.scaleX || 1}
          onChange={handleChange}
          onBlur={updateWithSelecctedShape}
          step={0.1}
        />
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          SCALE Y
        </h3>
        <input
          className="range"
          name="scaleY"
          type="range"
          min={0}
          max={20}
          value={selectedShape.scaleY || 1}
          onChange={handleChange}
          onBlur={updateWithSelecctedShape}
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
          onBlur={updateWithSelecctedShape}
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
          onBlur={updateWithSelecctedShape}
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
          onBlur={updateWithSelecctedShape}
          onChange={handleChange}
        />
      </ExpandableBox>

      {/*//? Colors */}
      <ExpandableBox title={"Fill"}>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          FILL
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            name="fill"
            value={selectedShape.fill || "#000000"}
            onBlur={updateWithSelecctedShape}
            onChange={handleChange}
          />
          <p>{selectedShape.fill || "#23d997"}</p>
        </div>
      </ExpandableBox>

      {/*//? Stroke */}
      <ExpandableBox title="Stroke">
        <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
          STROKE
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            name="stroke"
            value={selectedShape.stroke || "#000000"}
            onBlur={updateWithSelecctedShape}
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
          onBlur={updateWithSelecctedShape}
          onChange={handleChange}
        />
      </ExpandableBox>

      <Editor
        selectedShape={setSelectedShape}
        handleChange={handleChange}
        updateWithSelecctedShape={updateWithSelecctedShape}
      />

      {/*//? Export Func */}
      <ExportBox />
    </div>
  );
};

export default Rightbar;
