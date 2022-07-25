import { getPoints } from "@/utils/getPoints";

export const FreehandRenderer = ({ points, ...props }) => {
  return (
    <polyline
      points={getPoints(points)}
      stroke="#23d997"
      fill="transparent"
      {...props}
    />
  );
};
