import ExpandableBox from "@/components/ExpandableBox";

export const RectangleRenderer = ({
  shapeRef,
  x,
  y,
  width,
  height,
  ...props
}) => {
  return (
    <rect
      ref={shapeRef}
      rx={props.corners}
      ry={props.corners}
      x={x}
      y={y}
      height={height}
      width={width}
      {...props}
    />
  );
};

export const RectangleControls = ({
  selectedShape,
  handleChange,
  updateWithSelecctedShape,
}) => {
  return (
    <ExpandableBox title={"Corners"}>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
        Corners
      </h3>
      <input
        className="range"
        name="corners"
        type="range"
        min={0}
        max={100}
        step={1}
        value={selectedShape.corners}
        onBlur={updateWithSelecctedShape}
        onChange={handleChange}
      />
    </ExpandableBox>
  );
};
