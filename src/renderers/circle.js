export const CircleRenderer = ({ shapeRef, ...props }) => {
  return <circle ref={shapeRef} {...props} />;
};
