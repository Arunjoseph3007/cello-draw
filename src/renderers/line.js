export const LineRenderer = ({ shapeRef, ...props }) => {
  return (
    <line
      ref={shapeRef}
      x1={props.x1}
      y1={props.y1}
      x2={props.x2}
      y2={props.y2}
      {...props}
    />
  );
};
