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
      x={x}
      y={y}
      rx={0}
      ry={0}
      height={height}
      width={width}
      {...props}
    />
  );
};
