import { ShapeRenderer } from ".";

export const GroupRenderer = ({ shapeRef, childShapes, ...props }) => {
  return (
    <g>
      {childShapes.map((a) => (
        <ShapeRenderer key={a.id} {...a} />
      ))}
    </g>
  );
};
