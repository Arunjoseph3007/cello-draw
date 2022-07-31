import { getPoints } from "@/utils/getPoints";

export const FreehandRenderer = ({ points,shapeRef, ...props }) => {
  return <polyline ref={shapeRef} points={getPoints(points)} {...props} />;
};
