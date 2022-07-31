import { getPoints } from "@/utils/getPoints";

export const PolygonRenderer = ({ shapeRef, points, ...props }) => {
  return <polygon ref={shapeRef} points={getPoints(points)} {...props} />;
};
