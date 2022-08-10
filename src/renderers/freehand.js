import ExpandableBox from "@/components/ExpandableBox";

export const FreehandRenderer = ({ points, shapeRef, ...props }) => {
  return (
    <polyline
      ref={shapeRef}
      points={getPoints(points, props.smoothing)}
      {...props}
    />
  );
  //   return <path ref={shapeRef} d={smoothOutPoints(points)} {...props} />;
};

export const FreehandControls = ({
  selectedShape,
  handleChange,
  updateWithSelecctedShape,
}) => {
  return (
    <ExpandableBox title={"Smoothing"}>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wideest">
        Smoothing
      </h3>
      <input
        className="range"
        name="smoothing"
        type="range"
        min={0}
        max={30}
        step={1}
        value={selectedShape.smoothing}
        onBlur={updateWithSelecctedShape}
        onChange={handleChange}
      />
    </ExpandableBox>
  );
};

const smoothOutPoints = (points = [], smoothing = 20) => {
  return points
    .filter((a, i) => i % smoothing === 0)
    .reduce(
      (cur, elm) => `${cur} T  ${elm.x} ${elm.y} `,
      ` M ${points[0].x} ${points[0].y} `
    );
};

const getPoints = (points = [], smoothing = 1) =>
  points
    .filter((a, i) => i % smoothing === 0)
    .reduce((current, elm) => `${current} ${elm.x},${elm.y} `, " ");
