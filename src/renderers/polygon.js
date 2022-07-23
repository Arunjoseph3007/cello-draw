import { getPoints } from "@/utils/getPoints";

export const PolygonRenderer = ({ points, ...props }) => {
  return (
    <polygon
      points={getPoints(points)}
      stroke="#23d997"
      fill="#00000055"
      {...props}
    />
  );
};
