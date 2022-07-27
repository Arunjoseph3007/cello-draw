import { getPoints } from "@/utils/getPoints";

export const PolygonRenderer = ({ points, ...props }) => {
  return <polygon points={getPoints(points)} {...props} />;
};
