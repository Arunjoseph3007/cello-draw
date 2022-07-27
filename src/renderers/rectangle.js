export const RectangleRenderer = ({ x, y, width, height, ...props }) => {
  return (
    <rect
      x={x}
      y={y}
      rx={0}
      ry={0}
      height={height}
      width={width}
      strokeWidth={2}
      {...props}
    />
  );
};
