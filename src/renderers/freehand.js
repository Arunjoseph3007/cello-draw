import { getPoints } from "@/utils/getPoints";

export const FreehandRenderer = ({ points, ...props }) => {
  return <polyline points={getPoints(points)} {...props} />;
};
